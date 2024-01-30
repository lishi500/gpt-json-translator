import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import dotenv from 'dotenv';


function replaceEnvVars(value) {
    if (typeof value === 'string') {
      return value.replace(/\$\{([^}]+)\}/g, (match, name) => process.env[name] || '');
    }
    return value;
  }
  
  function processConfigObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        processConfigObject(obj[key]); 
      } else {
        obj[key] = replaceEnvVars(obj[key]); 
      }
    }
  }
  
  function loadConfigFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const config = yaml.load(fileContents);
  
        processConfigObject(config); 
  
        return config;
      }
    } catch (error) {
      console.error(`Error reading the YAML file at ${filePath}:`, error);
    }
    return {};
  }

function getConfig() {
  dotenv.config();    

  const userConfigPath = path.join(process.cwd(), 'config.yaml');
  const libConfigPath = path.join(path.dirname(import.meta.url).substring(7), 'config.yaml');

  const userConfig = loadConfigFile(userConfigPath);
  const libConfig = loadConfigFile(libConfigPath);

  return { ...libConfig, ...userConfig };
}

const finalConfig = getConfig();

export default finalConfig;
