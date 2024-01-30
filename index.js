import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import config from "./src/config.js";
import {translateOne } from './translateLocale.js';
import {translateAll } from './translateAll.js';

const argv = yargs(hideBin(process.argv)).argv;

if (argv.dryRun) {
  config.dryRun = true;
}

if (argv.translateOne) {
  const args = process.argv.slice(2);
  const language = args[1];
  console.log(`translateOne --`, language);
  translateOne(language);
}

if (argv.translateAll) {
  console.log(`translateAll --`);
  translateAll();
}

