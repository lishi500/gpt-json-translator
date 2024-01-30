# JSON Translator using ChatGPT

## Overview

JSON Translator is an innovative tool designed to utilize ChatGPT for translating extensive JSON text files efficiently. This project is ideal for developers and content creators who require quick and accurate localization of their JSON-based data into multiple languages.

## Features

- **High-Speed Translation**: Capable of translating substantial JSON files into various languages concurrently, typically within one minute.
- **Overcome Token Limitations**: Effectively handles translations that exceed the maximum token limit, ensuring comprehensive content translation without tokenization issues.
- **Automated Segmentation and Reassembly**: Automatically divides large JSON files for translation and seamlessly reassembles them after the process, ensuring integrity and consistency.
- **Reliable Translation Verification**: Includes an automatic verification step after translation. If any discrepancies are found, it retriggers the translation to guarantee accuracy.
- **User-Friendly Commands**:
  - To translate all supported languages: `npx translateAll`
  - To translate into a specific language (e.g., French): `npx translateLocale fr`

## Dry Run Mode

For those cautious about overwriting existing files, the tool offers a `dryRun` mode. This mode enables users to preview the translation results without altering the original files.

- To execute in dryRun mode for all languages: `npx translateAll --dryRun`
- To execute in dryRun mode for a specific language: `npx translateLocale zh --dryRun`

## Configuration

Set up a `config.yaml` file in your project's root directory with the necessary parameters for the translation process.

### Example `config.yaml`:

```yaml
sourceLocale: 'en'
supportedLocales: ['en', 'fr', 'zh']
filePath: 'locales'

openai: 
  api_key: ${OPENAI_API_KEY}    # put your openai api key here or in your .env file
  model: 'gpt-3.5-turbo-1106'   # you can put the modal you wants to run
  max_tokens: 1000              # max prompt_tokens for source locale language. 
  max_retry: 3

# max_tokens: total_tokens = prompt_tokens + completion_tokens. when you send 1000 token en to translate to fr. it could return 2000 token as fr. so the total_tokens will be 3000.
```

## Getting Started

1. Clone the repository to your local environment.
2. Ensure Node.js is installed on your system.
3. Configure the `config.yaml` file according to your translation needs.
4. add openai API key to your .env file 
4. Install dependencies with `npm install`.
5. Use the translation commands as required.

## Contribution

We welcome contributions to enhance JSON Translator. Feel free to fork the repository and submit pull requests.

## License

This project is released under the [MIT License](LICENSE).

---

Leverage the capabilities of ChatGPT with JSON Translator to streamline and refine your JSON localization processes.
