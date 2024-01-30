import { getTranslateResponse } from "./gptAPIService.js";
import { isWithinTokenLimit } from "gpt-tokenizer";
import {
  flattenObject,
  unflattenObject,
  isJsonString,
  objKeyCompare,
} from "./utils.js";
import config from "./config.js";

const MAX_TRANS_LIMIT = 1000;

async function _translate(batch, toLocale, collection, retry = 0) {
  const response = await getTranslateResponse(
    JSON.stringify(batch),
    toLocale,
    true
  );
  if (isJsonString(response)) {
    const responseJson = JSON.parse(response);
    if (!objKeyCompare(batch, responseJson)) {
      console.log("compare obj failed, retry: ");
      return await _translate(batch, collection, toLocale, retry + 1);
    }
    Object.assign(collection, responseJson);
  } else if (retry < config.openai.max_retry) {
    console.error(`batch request retry[${retry}]`);
    return await _translate(batch, collection, toLocale, retry + 1);
  } else {
    throw new Error("Reach max retry!");
  }
}

async function _translateSingle(key, value, toLocale, collection) {
  const response = await getTranslateResponse(value, toLocale, false);
  collection[key] = response;
}

// translate in sequence
async function translateSeq(obj, toLocale) {
  const flatten = flattenObject(obj);
  const keys = Object.keys(flatten);
  const maxToken = config.openai.max_tokens || MAX_TRANS_LIMIT;
  // resultCollection is translated object，all new translated text will be append to it
  let resultCollection = {};

  let batch = {};
  let batchCount = 0;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = flatten[key];
    const valueTokens = isWithinTokenLimit(value, 10000);
    if (valueTokens > 100) {
      await _translateSingle(key, value, toLocale, resultCollection);
      continue;
    }

    batch[key] = value;
    // if just over the limit, we translate it
    if (
      !isWithinTokenLimit(
        JSON.stringify(batch),
        maxToken
      )
    ) {
      await _translate(batch, toLocale, resultCollection);
      batch = {};
    }
  }

  if (batch && Object.keys(batch).length > 0) {
    console.log("batch ", batch);
    await _translate(batch, toLocale, resultCollection);
  }

  console.log("resultCollection", resultCollection);
  let final = unflattenObject(resultCollection);
  console.log("final", final);

  return final;
}

// translate in parallel
export async function translateParallel(obj, toLocale) {
  const flatten = flattenObject(obj);
  const keys = Object.keys(flatten);
  // resultCollection is translated object，all new translated text will be append to it
  let resultCollection = {};
  const promises = [];
  let batch = {};
  let batchCount = 0;
  const maxToken = config.openai.max_tokens || MAX_TRANS_LIMIT;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = flatten[key];

    const valueTokens = isWithinTokenLimit(value, 10000);
    if (valueTokens > maxToken) {
      console.log("single line translation token size: ", valueTokens);

      promises.push(_translateSingle(key, value, toLocale, resultCollection));
      continue;
    }

    batch[key] = value;

    // if just over the limit, we translate it
    if (
      !isWithinTokenLimit(
        JSON.stringify(batch),
        maxToken
      )
    ) {
      console.log("batch: ", toLocale, batchCount++);
      promises.push(_translate(batch, toLocale, resultCollection));
      batch = {};
    }
  } // end for loop

  if (batch && Object.keys(batch).length > 0) {
    console.log("final batch: ", batchCount);

    promises.push(_translate(batch, toLocale, resultCollection));
  }

  try {
    await Promise.all(promises);
    console.log("All batch translation completed。");
  } catch (error) {
    console.log("One ore more batch failed。", error);
  }

  let final = unflattenObject(resultCollection);
  return final;
}
