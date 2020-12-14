// Require OpenAPI config file
let openapi = require('./openapi.json');

let fs = require('fs');
// Configuration 
let jsConfigPath = 'app/Namsor2/public/javascript/services/api/';
let jsonConfigPath = 'scripts/';
let prefixLenght = '#/components/schemas/'.length;
let urlPrefix = '/api2/json/'

// Script options
let testMode = false; // the JS file for usage by scripts
let debugFile = true; // the JSON file for easy reading

// Architecture of generated index
let config = {
  base: openapi.servers[0].url,
  errorResponses: [
    "401",
    "403"
  ],
  routes: {
    // Gender
    genderBatch: {
      title: 'Gender Batch',
      required: ['firstName', 'lastName'],
    },
    genderGeoBatch: {
      title: 'Gender Geo Batch',
      required: ['firstName', 'lastName', 'countryIso2'],
    },
    // Gender Full Name
    genderFullBatch: {
      title: 'Gender Full Batch',
      required: ['name'],
    },
    genderFullGeoBatch: {
      title: 'Gender Full Geo Batch',
      required: ['name', 'countryIso2'],
    },
    // Parsed Gender
    parsedGenderBatch: {
      title: 'Parsed Gender Batch',
      required: ['firstName', 'lastName'],
    },
    parsedGenderGeoBatch: {
      title: 'Parsed Gender Geo Batch',
      required: ['firstName', 'lastName', 'countryIso2'],
    },
    // Ethnicity
    originBatch: {
      title: 'Origin Batch',
      required: ['firstName', 'lastName'],
      cost: 10
    },
    countryBatch: {
      title: 'Country Batch',
      required: ['name'],
      cost: 10
    },
    diasporaBatch: {
      title: 'Diaspora Batch',
      required: ['firstName', 'lastName', 'countryIso2'],
      cost: 20
    },
    usRaceEthnicityBatch: {
      title: 'US Race & Ethnicity Batch',
      required: ['firstName', 'lastName'],
      cost: 10
    },
    usZipRaceEthnicityBatch: {
      title: 'US Zip Race & Ethnicity Batch',
      required: ['firstName', 'lastName', 'countryIso2', 'zipCode'],
      cost: 10
    },
    // Parse (optionnal)
    parseNameBatch: {
      title: 'Parse Name Batch',
      required: ['name'],
    },
    parseNameGeoBatch: {
      title: 'Parse Name Geo Batch',
      required: ['name', 'countryIso2'],
    },
  }
};

let buildIndex = (route) => {
  let paths = openapi.paths[`${urlPrefix}${route}`].post; // length = 98
  let schemas = openapi.components.schemas; // length = 77
  // If no price set default
  if (!config.routes[route].cost) config.routes[route].cost = 1;

  // Get description
  config.routes[route].summary = paths.summary;

  // Get full path to schemas
  let requestSchemaPath = paths.requestBody.content['application/json'].schema.$ref;
  let responseSchemaPath = paths.responses['200'].content['application/json'].schema.$ref;

  // Get name of the schemas
  let requestSchemaName = requestSchemaPath.slice(prefixLenght, requestSchemaPath.length);
  let responseSchemaName = responseSchemaPath.slice(prefixLenght, responseSchemaPath.length);

  // Warn user of unhandled req / res data structure
  let unhandledStructure = [];
  if (
    Object.keys(schemas[requestSchemaName].properties).length !== 1 ||
    Object.keys(schemas[requestSchemaName].properties) !== 'personalNames'
  ) {
    unhandledStructure.push(`\u001b[31mERROR ! - Unhandled request data structure \u001b[m\n${requestSchemaName}`)
  };
  if (
    Object.keys(schemas[responseSchemaName].properties).length !== 1 ||
    Object.keys(schemas[responseSchemaName].properties) !== 'personalNames'
  ) {
    unhandledStructure.push(`\u001b[31mERROR ! - Unhandled response data structure \u001b[m\n${responseSchemaName}`)
  };
  // Get full path to sub schemas
  let requestSubSchemaPath = schemas[requestSchemaName].properties.personalNames.items.$ref;
  let responseSubSchemaPath = schemas[responseSchemaName].properties.personalNames.items.$ref;

  // Get name of the sub schemas
  let requestSubSchemaName = requestSubSchemaPath.slice(prefixLenght, requestSubSchemaPath.length);
  let responseSubSchemaName = responseSubSchemaPath.slice(prefixLenght, responseSubSchemaPath.length);

  // Get data schemas
  let objectFields = [];
  let requestSchema = JSON.parse(JSON.stringify(schemas[requestSubSchemaName].properties));
  let responseSchema = JSON.parse(JSON.stringify(schemas[responseSubSchemaName].properties));
  Object.keys(requestSchema).forEach(key => {
    if (requestSchema[key].xml) delete requestSchema[key].xml;
  });
  Object.keys(responseSchema).forEach(key => {
    if (responseSchema[key].xml) delete responseSchema[key].xml;
    if (responseSchema[key].$ref) objectFields.push(key);
  });

  // Exceptions handling
  objectFields.forEach(field => {
    let fieldSubSchemaPath = responseSchema[field].$ref;
    let fieldSubSchemaName = fieldSubSchemaPath.slice(prefixLenght, fieldSubSchemaPath.length);
    responseSchema[field] = schemas[fieldSubSchemaName].properties;
  });

  // Check Required
  let requiredNotFound = [];
  config.routes[route].required.forEach(requiredField => {
    if (!requestSchema[requiredField]) requiredNotFound.push(requiredField);
  });
  if (requiredNotFound.length) {
    console.log(`\u001b[31mERROR ! - Required in ${route} unfound:\u001b[m\n${requiredNotFound}`);
  };

  // Complete main data schemes
  config.routes[route].request = { personalNames: requestSchema };
  config.routes[route].response = { "200": { personalNames: responseSchema } };

  // Get error responses
  config.errorResponses.forEach(errCode => {
    if (paths.responses[errCode]) {
      config.routes[route].response[errCode] = paths.responses[errCode];
    };
  });
};

if (testMode === true) {
  // Sample for testing
  let sample = 'genderBatch'
  buildIndex(sample);
  console.log('\u001b[34m - - - CONFIG GENERATED (test mode) - - -\u001b[0m\n', config);
}
else {
  // Main index building function
  Object.keys(config.routes).forEach(route => { buildIndex(route); });
  // Write file
  let formated = JSON.stringify(config);
  fs.writeFileSync(`${jsConfigPath}api_config.js`, `const api_config = ${formated}`);
  if (debugFile === true) fs.writeFileSync(`${jsonConfigPath}api_config.json`, formated);
  console.log('\u001b[35m - - - CONFIG GENERATED - - - \u001b[0m');
}
