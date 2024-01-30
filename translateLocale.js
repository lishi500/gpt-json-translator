#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import config from "./src/config.js";
import moment from "moment";
import fs from "fs/promises";
import { translateParallel } from "./src/translation.js";

export async function translateOne(locale) {
  if (!locale) {
    console.log("locale is not provided");
    return;
  }
  console.log(`translate from ${config.sourceLocale} to ${locale}`);
  const dateTime = moment().format("YYYYMMDD_HHmmss");

  const fileContents = await fs.readFile(
    `./${config.filePath}/${config.sourceLocale}.json`,
    "utf8"
  );
  const source = JSON.parse(fileContents);
  const final = await translateParallel(source, locale);
  const saveLocation = `./${config.filePath}/${locale}${
    config.dryRun ? "_" + dateTime : ""
  }.json`;


  fs.writeFile(saveLocation, JSON.stringify(final), (err) => {
    console.log(err);
  });

  console.log(`translate from ${config.sourceLocale} to ${locale} Completed: ${saveLocation}` );
}

const argv = yargs(hideBin(process.argv)).argv;


if (argv.dryRun) {
  config.dryRun = true;
}

const language = argv._[0];

console.log(`translateLocale --`, language);
translateOne(language);
