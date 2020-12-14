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

apiGestion.batch = function (fileId, csv) {
  // console.log('Request BATCH');
  return new Promise(async (resolve, reject) => {
    try {
      const { forms } = formsGestion;
      let apiKey = "0cd268c1527ff3132191326cde6c06bc";
      // let apiKey = await getApiKey();

      let options = {
        fileId: fileId,
        key: apiKey,
        idAuto: forms[fileId].inputsValue.cols.id === 'auto' ? true : false,
        url: forms[fileId].requestName,
        ex: forms[fileId].inputsValue.colsEx
      };
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
      responseArch.meta.forEach(meta => {
        responseArch.fields[meta] = Object.keys(requestForm[meta]);
      });
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

      // Reformat arrays and object
      if (responseArch.meta.length === 1) {
        let fieldObject = responseForm[responseArch.meta];
        console.log('fieldObject: ', fieldObject);
        Object.keys(fieldObject).forEach(currentField => {

          if (fieldObject[currentField].type === 'array') {
            responseArray.map(dataUnit => dataUnit[currentField] = dataUnit[currentField].join('/'));
          }
          else if (
            1 < Object.keys(fieldObject[currentField]).length &&
            fieldObject[currentField].type !== 'array' &&
            fieldObject[currentField].type !== 'string' &&
            fieldObject[currentField].type !== 'number'
          ) {
            delete fieldObject[currentField].id;
            let fieldKeys = Object.keys(fieldObject[currentField]);
            responseArray.forEach(dataUnit => {
              fieldKeys.forEach(subField => dataUnit[subField] = dataUnit[currentField][subField]);
              delete dataUnit[currentField];
            });
          };
        });
      };

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
