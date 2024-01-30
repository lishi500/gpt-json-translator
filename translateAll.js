#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import config from "./src/config.js";
import { _translateOne } from "./translateLocale.js";

export async function _translateAll() {
  for (const locale of config.supportedLocales) {
    if (locale !== config.sourceLocale) _translateOne(locale);
  }
}

const argv = yargs(hideBin(process.argv)).argv;

if (argv.dryRun) {
  config.dryRun = true;
}
_translateAll();
