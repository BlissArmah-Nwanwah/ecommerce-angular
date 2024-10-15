/* eslint-disable @typescript-eslint/no-require-imports */
const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPathProd = './src/environments/environment.ts';
  const targetPathDev = './src/environments/environment.development.ts';
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  const envConfigFileProd = `export const environment = {
    production: true,
    AUTH_API_BASEURL: '${process.env['AUTH_API_BASEURL']}',
    APN: '${process.env['APN']}',
    apiUrl: '${process.env['apiUrl']}',
  };`;
  const envConfigFileDev = `export const environment = {
    production: false,
    AUTH_API_BASEURL: '${process.env['AUTH_API_BASEURL']}',
    APN:'${process.env['APN']}',
    apiUrl: '${process.env['apiUrl']}',
  };`;
  writeFile(targetPathDev, envConfigFileDev, () => {
    return envConfigFileProd;
  });
  writeFile(targetPathProd, envConfigFileProd, () => {
    return envConfigFileProd;
  });
};

setEnv();
