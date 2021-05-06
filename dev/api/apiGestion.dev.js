let apiGestion = {}

apiGestion.get = function (options) {
  // console.log('Request GET');
  // let opt = {
  //   key: '996048c58adca6c217609e6c46288dc1',
  //   url: 'gender',
  //   args: [
  //     'Daniel',
  //     'Radpit'
  //   ],
  // };
  opt = options;
  return new Promise((resolve, reject) => {
    try {
      let xhr = new XMLHttpRequest();
      // URL
      let query = opt.url;
      opt.args.forEach(arg => query = `${query}/${arg}`)
      // Initiate
      xhr.open('GET', 'https://v2.namsor.com/NamSorAPIv2/api2/json/' + query, true);
      // Headers
      if (opt.key) xhr.setRequestHeader('X-API-KEY', opt.key);
      xhr.setRequestHeader('accept', 'application/json');
      // Send
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.responseText);
        }
      };
      // Response
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    }
    catch (e) {
      reject(e);
    };
  });
};

apiGestion.post = function (options) {
  // console.log('Request POST');
  // let opt = {
  //   key: '996048c58adca6c217609e6c46288dc1',
  //   url: 'genderBatch',
  //   body: {
  //     "personalNames": [
  //       {
  //         "id": "id-00-001",
  //         "firstName": "Donkey",
  //         "lastName": "Radpit"
  //       }
  //     ]
  //   }
  // };
  opt = options;
  return new Promise((resolve, reject) => {
    try {
      let xhr = new XMLHttpRequest();
      // Initiate
      xhr.open('POST', 'https://v2.namsor.com/NamSorAPIv2/api2/json/' + opt.url, true);
      // Headers
      if (opt.key) xhr.setRequestHeader('X-API-KEY', opt.key);
      xhr.setRequestHeader('accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      // Send
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('POST Resolved');
          resolve(xhr.response);
        } else {
          // console.log('POST Rejected');
          reject(xhr.responseText);
        }
      };
      // Response
      xhr.onerror = () => reject(xhr.statusText);
      let body = JSON.stringify(opt.body);
      xhr.send(body);
    }
    catch (e) {
      // console.log('POST Rejected');
      reject(e);
    };
  });
};

let testArray = [
  {
    route: 'genderBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight'
    }]
  },
  {
    route: 'genderGeoBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight',
      "countryIso2": 'US'
    }]
  },
  {
    route: 'genderFullBatch',
    csv: [{
      "id": 'id-1',
      "name": 'Sir Stanford Junior Delight'
    }]
  },
  {
    route: 'genderFullGeoBatch',
    csv: [{
      "id": 'id-1',
      "name": 'Sir Stanford Junior Delight',
      "countryIso2": 'US'
    }]
  },
  {
    route: 'parsedGenderBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight',
      "prefixOrTitle": 'Sir',
      "suffix": 'Mr',
      "middleName": 'Junior'
    }]
  },
  {
    route: 'parsedGenderGeoBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight',
      "prefixOrTitle": 'Sir',
      "suffix": 'Mr',
      "middleName": 'Junior',
      "countryIso2": 'US'
    }]
  },
  {
    route: 'originBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight'
    }]
  },
  {
    route: 'countryBatch',
    csv: [{
      "id": 'id-1',
      "name": 'Sir Stanford Junior Delight'
    }]
  },
  {
    route: 'diasporaBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight',
      "countryIso2": 'US'
    }]
  },
  {
    route: 'usRaceEthnicityBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight',
      "countryIso2": 'US'
    }]
  },
  {
    route: 'usZipRaceEthnicityBatch',
    csv: [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight',
      "countryIso2": 'US',
      "zipCode": '9000'
    }]
  },
  {
    route: 'parseNameBatch',
    csv: [{
      "id": 'id-1',
      "name": 'Sir Stanford Junior Delight'
    }]
  },
  {
    route: 'parseNameGeoBatch',
    csv: [{
      "id": 'id-1',
      "name": 'Sir Stanford Junior Delight',
      "countryIso2": 'US'
    }]
  }
]

console.log('testArray: ', testArray.length);
console.log('api_config.routes: ', Object.keys(api_config.routes).length);

apiGestion.batch = function (fileId, csv) {
  // console.log('Request BATCH');
  return new Promise(async (resolve, reject) => {
    try {
      const { forms } = formsGestion;
      let apiKey = await getApiKey();

      let options = fileId;
      // let options = {
      //   fileId: fileId,
      //   key: apiKey,
      //   idAuto: forms[fileId].inputsValue.cols.id === 'auto' ? true : false,
      //   url: forms[fileId].requestName,
      //   ex: forms[fileId].inputsValue.colsEx
      // };
      if (options.idAuto === true) delete options.ex.id;

      // Id generator
      let idGen = (batchId, eleId) => `id-${batchId}-${eleId}`;

      // Compute nb of requests
      let batchSize = 100;
      let nbRequests = Math.ceil(csv.length / batchSize);
      // Check data example
      Object.keys(options.ex).forEach(key => {
        if (
          options.ex[key] &&
          options.ex[key] !== csv[0][key]
        ) {
          console.log('BATCH Rejected');
          reject('Format error, unable to parse the document.');
        };
      });

      // Build request array
      let requestForm = api_config.routes[options.url].request;
      let requestArch = {
        meta: Object.keys(requestForm),
        fields: {}
      };
      requestArch.meta.forEach(meta => {
        requestArch.fields[meta] = Object.keys(requestForm[meta]);
        if (options.idAuto === true) {
          requestArch.fields[meta].forEach((field, i) => {
            if (field === 'id') requestArch.fields[meta].splice(i, 1);
          });
        };
      });
      let requestArray = [];
      for (let i = 0; i < nbRequests; i++) {
        // Cut out the document into batchSize piece segments
        let startBatch = i * batchSize;
        let endBatch = i === nbRequests ? csv.length : startBatch + batchSize;
        let batchBodyRaw = csv.slice(startBatch, endBatch);
        let batchBody = {};
        // Parse each meta field
        requestArch.meta.forEach(metaField => {
          batchBody[metaField] = [];
          // Parse each data array / line
          batchBodyRaw.forEach((obj, j) => {
            let dataUnit = {};
            requestArch.fields[metaField].forEach(field => dataUnit[field] = obj[field]);
            if (options.idAuto === true) dataUnit.id = idGen(i, j);
            batchBody[metaField].push(dataUnit);
          });
        });
        requestArray.push({
          key: options.key,
          url: options.url,
          body: batchBody
        });
      };

      // Await for all results
      let responseArrayRaw = await Promise.all(requestArray.map(reqConfig => apiGestion.post(reqConfig)));

      // let responseArrayRaw = fakeReturn_2;
      if (nbRequests === 1) {
        responseArrayRaw = JSON.parse(responseArrayRaw);
      }
      else {
        responseArrayRaw = responseArrayRaw.map(stringified => JSON.parse(stringified))
      };

      // Rebuild document and format for unparse
      let responseForm = api_config.routes[options.url].response['200'];
      let responseArch = {
        meta: Object.keys(responseForm),
        fields: {}
      };
      let responseArray = [];
      responseArch.meta.forEach(metaField => {
        if (
          responseArch.meta.length === 1 &&
          metaField === 'personalNames'
        ) {
          if (nbRequests === 1) {
            responseArray = responseArrayRaw[metaField];
          }
          else {
            responseArray = responseArrayRaw.map(parsed => parsed[metaField]);
            responseArray = responseArray.flat();
          };
        };
      });
      if (options.idAuto === true) responseArray.map(dataUnit => delete dataUnit.id);

      // Manage results
      // window.localStorage.setItem(`apiResult_${options.fileId}`, JSON.stringify(responseArray));
      // console.log('BATCH Resolved');
      // console.log('response Array', responseArray)
      resolve(responseArray);
    }
    catch (e) {
      // console.log('BATCH Rejected');
      reject(`${e}.`)
    };
  });
};

let testResultArray = []
// for (let j = 0; j < testArray.length; j++) {
//   let wrapperFunc = async (i) => {
//     let testResult = await apiGestion.batch({
//       fileId: new Date,
//       key: '0cd268c1527ff3132191326cde6c06bc',
//       idAuto: true,
//       url: testArray[i].route,
//       ex: testArray[i].csv[0]
//     }, testArray[i].csv)
//     console.log('testResult: ', testResult);
//     testResultArray.push({ [testArray[i].route]: testResult })
//   }
//   wrapperFunc(j)
// }
// console.log('---> testResultArray: ', testResultArray);
let pretty = [{
  "genderBatch": [{
    firstName: "Stanford",
    genderScale: -0.974822745178954,
    lastName: "Delight",
    likelyGender: "male",
    probabilityCalibrated: 0.987411372589477,
    score: 22.368342016050264
  }]
}, {
  "genderGeoBatch": [{
    "firstName": "Stanford",
    "lastName": "Delight",
    "likelyGender": "male",
    "genderScale": -0.9755795210413223,
    "score": 22.68070323387285,
    "probabilityCalibrated": 0.9877897605206611
  }]
}, {
  "genderFullBatch": [{
    "name": "Sir Stanford Junior Delight",
    "likelyGender": "male",
    "genderScale": -0.990741722229731,
    "score": 32.08971856337061,
    "probabilityCalibrated": 0.9953708611148655
  }]
}, {
  "genderFullGeoBatch": [{
    "name": "Sir Stanford Junior Delight",
    "likelyGender": "male",
    "genderScale": -0.9901454550273647,
    "score": 31.604786591560647,
    "probabilityCalibrated": 0.9950727275136824
  }]
}, {
  "parsedGenderBatch": [{
    "firstName": "Stanford",
    "lastName": "Delight",
    "likelyGender": "male",
    "genderScale": -0.974822745178954,
    "score": 22.368342016050264,
    "probabilityCalibrated": 0.987411372589477
  }]
}, {
  "parsedGenderGeoBatch": [{
    "firstName": "Stanford",
    "lastName": "Delight",
    "likelyGender": "male",
    "genderScale": -0.9755795210413223,
    "score": 22.68070323387285,
    "probabilityCalibrated": 0.9877897605206611
  }]
}, {
  "originBatch": [{
    "firstName": "Stanford",
    "lastName": "Delight",
    "countryOrigin": "IE",
    "countryOriginAlt": "GB",
    "countriesOriginTop": [
      "IE",
      "GB",
      "ZA",
      "GH",
      "ZW",
      "BE",
      "FR",
      "DE",
      "NG",
      "LR"
    ],
    "score": 0.7859442507080789,
    "regionOrigin": "Europe",
    "topRegionOrigin": "Europe",
    "subRegionOrigin": "Northern Europe",
    "probabilityCalibrated": 0.4460113546092249,
    "probabilityAltCalibrated": 0.3849804275632668
  }]
}, {
  "countryBatch": [{
    "name": "Sir Stanford Junior Delight",
    "score": 6.216921237758438,
    "country": "HT",
    "countryAlt": "TT",
    "region": "Latin America and the Caribbean",
    "topRegion": "Americas",
    "subRegion": "Caribbean",
    "countriesTop": [
      "HT",
      "TT",
      "CI",
      "GB",
      "IE",
      "AU",
      "BJ",
      "NZ",
      "BR",
      "MZ"
    ],
    "probabilityCalibrated": 0.3034511950489288,
    "probabilityAltCalibrated": 0.4875516328752777
  }]
}, {
  "diasporaBatch": [{
    "firstName": "Stanford",
    "lastName": "Delight",
    "score": -0.46025299212626275,
    "ethnicityAlt": "Irish",
    "ethnicity": "AfricanAmerican",
    "lifted": false,
    "countryIso2": "US",
    "ethnicitiesTop": ["AfricanAmerican",
      "Irish",
      "HispanoLatino",
      "NativeHawaiian",
      "British",
      "Ghanaian",
      "TrinidadTobago",
      "Flemish",
      "Haitian",
      "French"]
  }]
}, {
  "usRaceEthnicityBatch": [{
    "firstName": "Stanford",
    "lastName": "Delight",
    "raceEthnicityAlt": "W_NL",
    "raceEthnicity": "B_NL",
    "score": 4.629566613610088,
    "raceEthnicitiesTop": ["B_NL",
      "W_NL",
      "A",
      "HL"],
    "probabilityCalibrated": 0.5765376625668709,
    "probabilityAltCalibrated": 0.8743447754153119
  }]
}, {
  "usZipRaceEthnicityBatch": [{
    "firstName": "Stanford",
    "lastName": "Delight",
    "raceEthnicityAlt": "W_NL",
    "raceEthnicity": "B_NL",
    "score": 4.6300877954177,
    "raceEthnicitiesTop": ["B_NL",
      "W_NL",
      "A",
      "HL"],
    "probabilityCalibrated": 0.5765595946180294,
    "probabilityAltCalibrated": 0.8743465505936735
  }]
}, {
  "parseNameBatch": [{
    "name": "Sir Stanford Junior Delight",
    "nameParserType": "FNxLN1",
    "nameParserTypeAlt": null,
    "firstLastName": {
      "id": null,
      "firstName": "Sir Stanford Junior",
      "lastName": "Delight"
    },
    "score": 23.832163913917135
  }]
}, {
  "parseNameGeoBatch": [{
    "name": "Sir Stanford Junior Delight",
    "nameParserType": "FNxLN1",
    "nameParserTypeAlt": null,
    "firstLastName": {
      "id": null,
      "firstName": "Sir Stanford Junior",
      "lastName": "Delight"
    },
    "score": 18.80098644050776
  }]
}
]

//////////////////////////////////////////////////////////////////////////
// format test 
//////////////////////////////////////////////////////////////////////////
let wrapperFunc = async () => {
  let testResult = await apiGestion.batch(
    {
      fileId: new Date,
      key: '0cd268c1527ff3132191326cde6c06bc',
      idAuto: false,
      url: 'usZipRaceEthnicityBatch',
      ex: {
        "id": 'id-1',
        "firstName": 'Stanford',
        "lastName": 'Delight',
        "countryIso2": 'US',
        "zipCode": '9000'
      }
    },
    [{
      "id": 'id-1',
      "firstName": 'Stanford',
      "lastName": 'Delight',
      "countryIso2": 'US',
      "zipCode": '9000'
    }]
  )
  console.log('testResult: ', testResult);
  let testResult_2 = await apiGestion.batch(
    {
      fileId: new Date,
      key: '0cd268c1527ff3132191326cde6c06bc',
      idAuto: false,
      url: 'parseNameBatch',
      ex: {
        "id": 'id-1',
        "name": 'Sir Stanford Junior Delight'
      }
    },
    [{
      "id": 'id-1',
      "name": 'Sir Stanford Junior Delight'
    }]
  )
  console.log('testResult_2: ', testResult_2);
}
wrapperFunc()