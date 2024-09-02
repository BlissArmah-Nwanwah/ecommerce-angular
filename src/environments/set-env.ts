const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    // Configure Angular `environment.ts` file path
    const targetPathProd = './src/environments/environment.ts';
    const targetPathDev = './src/environments/environment.development.ts';
    // Load node modules
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
      console.log('I am on development');
      console.log(envConfigFileProd);
    });
    writeFile(targetPathProd, envConfigFileProd, () => {
      console.log('I am on production');
      console.log(envConfigFileProd);
    });
  };

  setEnv();