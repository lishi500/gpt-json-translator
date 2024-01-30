# JSON Translator using ChatGPT

## Overview

JSON Translator is an innovative tool designed to utilize ChatGPT for translating extensive JSON text files efficiently. This project is ideal for developers and content creators who require quick and accurate localization of their JSON-based data into multiple languages.

#### en.json
```json
{
    "website": {
      "name": "Mock Language Explorer",
      "url": "www.mocklanguageexplorer.com",
      "pages": [
        {
          "pageTitle": "About Us",
          "content": "Language Explorer is dedicated to making language learning accessible to everyone. Our team, composed of language experts and technology enthusiasts, believes in the power of communication and understanding. With over a decade of experience, we provide resources, tools, and courses to help individuals and organizations break language barriers."
        },
        {
          "pageTitle": "Our Services",
          "subPages": [
            {
              "subPageTitle": "Translation Tools",
              "description": "Explore our state-of-the-art translation tools designed to provide accurate and swift translations across multiple languages. From document translations to real-time conversational assistance, our tools utilize advanced algorithms and machine learning to ensure quality and efficiency."
            },
            {
              "subPageTitle": "Language Courses",
              "description": "Our language courses range from beginner to advanced levels, offering comprehensive learning modules in over 30 languages. Each course is tailored to promote immersive learning experiences, facilitated by native speakers and enriched with cultural insights."
            }
          ]
        }
      ]
    }
  }

```

#### zh.json
```json
{
  "website": {
    "name": "模拟语言探索者",
    "url": "www.mocklanguageexplorer.com",
    "pages": [
      {
        "pageTitle": "关于我们",
        "content": "语言探索者致力于使语言学习对每个人都更加可及。我们的团队由语言专家和技术爱好者组成，坚信沟通和理解的力量。凭借超过十年的经验，我们提供资源、工具和课程，帮助个人和组织打破语言障碍。"
      },
      {
        "pageTitle": "我们的服务",
        "subPages": [
          {
            "subPageTitle": "翻译工具",
            "description": "探索我们的最先进的翻译工具，旨在提供跨多种语言的准确和快速翻译。从文件翻译到实时对话协助，我们的工具利用先进的算法和机器学习，确保质量和效率。"
          },
          {
            "subPageTitle": "语言课程",
            "description": "我们的语言课程涵盖初学者到高级水平，在30多种语言中提供全面的学习模块。每门课程都旨在促进沉浸式学习体验，由母语人士主持，并丰富文化见解。"
          }
        ]
      }
    ]
  }
}

```

## Installation

To start using `gpt-json-translator`, you need to install the package from npm. You can do this using either npm or yarn. Here are the steps for each method:

### Using npm

Run the following command to install the package:

```bash
npm install gpt-json-translator
```

### Using Yarn

If you prefer using Yarn, run this command instead:
```bash
yarn add gpt-json-translator
```

## Features

- **High-Speed Translation**: Capable of translating substantial JSON files into various languages concurrently, typically within one minute.
- **Overcome Token Limitations**: Effectively handles translations that exceed the maximum token limit, ensuring comprehensive content translation without tokenization issues.
- **Automated Segmentation and Reassembly**: Automatically divides large JSON files for translation and seamlessly reassembles them after the process, ensuring integrity and consistency.
- **Reliable Translation Verification**: Includes an automatic verification step after translation. If any discrepancies are found, it retriggers the translation to guarantee accuracy.
- **User-Friendly Commands**:
  - To translate all supported languages: `npx translateAll`
  - To translate into a specific language (e.g., French): `npx translateLocale fr`


## Usage

After installation, you can import and use `gpt-json-translator` in your JavaScript project. Here's a simple example to get you started:

### Command Line 

#### To translate all supported languages: 

```bash
npx translateAll
```

#### To translate into a specific language (e.g., French): 
```bash
npx translateLocale fr
```

### To use inside project
```js
import { translateOne, translateAll } from 'gpt-json-translator/index.js';

//translating a single locale
translateOne('fr');

//translating all supported locales
translateAll();

```


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

## Contribution

We welcome contributions to enhance JSON Translator. Feel free to fork the repository and submit pull requests.

## License

This project is released under the [MIT License](LICENSE).

---

Leverage the capabilities of ChatGPT with JSON Translator to streamline and refine your JSON localization processes.
