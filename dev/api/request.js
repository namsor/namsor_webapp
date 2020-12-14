apiRequest = {};
//////////////////
// GET request //
////////////////
apiRequest.get = (options) => {
  console.log('Request GET');
  let opt = {
    key: '996048c58adca6c217609e6c46288dc1',
    url: 'gender',
    args: [
      'Daniel',
      'Radpit'
    ],
  };
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

///////////////////
// POST request //
/////////////////
apiRequest.post = (options) => {
  console.log('Request POST');
  let opt = {
    key: '996048c58adca6c217609e6c46288dc1',
    url: 'genderBatch',
    body: {
      "personalNames": [
        {
          "id": "id-00-001",
          "firstName": "Donkey",
          "lastName": "Radpit"
        }
      ]
    }
  };
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
          console.log('POST Rejected');
          reject(xhr.responseText);
        }
      };
      // Response
      xhr.onerror = () => reject(xhr.statusText);
      let body = JSON.stringify(opt.body);
      xhr.send(body);
    }
    catch (e) {
      console.log('POST Rejected');
      reject(e);
    };
  });
};

// let debugFunc = async () => {
//   let getResponse = await apiRequest.get();
//   console.log('GET response: ', getResponse);
//   let postResponse = await apiRequest.post();
//   console.log('POST response: ', postResponse);
// };
// debugFunc();

///////////////////
// POST batch //
/////////////////
let csvSample = [
  { firstName: 'Francois1er', lastName: "Deloin", age: "99" },
  { firstName: 'Marc', lastName: "Levy", age: "10" },
  { firstName: 'Giselle', lastName: "Boudrik", age: "20" },
  { firstName: 'Kim', lastName: "Nguyen", age: "30" },
  { firstName: 'Sam', lastName: "Levy", age: "10" },
  { firstName: 'Nat', lastName: "Boudrik", age: "20" },
  { firstName: 'Elofi', lastName: "Nguyen", age: "30" },
  { firstName: 'Hanolan', lastName: "Boipa", age: "40" },
  { firstName: 'Rigiv', lastName: '', age: '' },
  { firstName: '', lastName: '', age: '' },
];
let configSample = {
  fileId: 'qsjdbqbdhbqzy',
  key: '048c58adca6c217609e6c46288dc1',
  // key: '996048c58adca6c217609e6c46288dc1',
  idAuto: true,
  url: 'genderBatch',
  ex: {
    firstName: 'Francois1er',
    lastName: 'Deloin'
  }
};
console.log('creditGestion: ', creditGestion);
let fakeCredGest = {
  availableCredits: 5,
  requiredCredits: {
    qsjdbqbdhbqzy: csvSample.length
  }
}
let fakeReturn = [
  "{\"personalNames\":[{\"id\":\"id-0-0\",\"firstName\":\"Francois 1er\",\"lastName\":\"Deloin\",\"likelyGender\":\"male\",\"genderScale\":-0.9957972297623128,\"score\":30.659497170163487,\"probabilityCalibrated\":0.9978986148811564},{\"id\":\"id-0-1\",\"firstName\":\"Marc\",\"lastName\":\"Levy\",\"likelyGender\":\"male\",\"genderScale\":-0.9888455601662252,\"score\":27.51904701752601,\"probabilityCalibrated\":0.9944227800831126},{\"id\":\"id-0-2\",\"firstName\":\"Giselle\",\"lastName\":\"Boudrik\",\"likelyGender\":\"female\",\"genderScale\":0.9849057931975964,\"score\":25.873150600725825,\"probabilityCalibrated\":0.9924528965987982},{\"id\":\"id-0-3\",\"firstName\":\"Kim\",\"lastName\":\"Nguyen\",\"likelyGender\":\"female\",\"genderScale\":0.20444073233574733,\"score\":5.838910654001653,\"probabilityCalibrated\":0.6022203661678737},{\"id\":\"id-0-4\",\"firstName\":\"Sam\",\"lastName\":null,\"likelyGender\":\"male\",\"genderScale\":-0.38104000309140584,\"score\":8.600080005081624,\"probabilityCalibrated\":0.6905200015457029},{\"id\":\"id-0-5\",\"firstName\":\"Nat\",\"lastName\":\"Levy\",\"likelyGender\":\"male\",\"genderScale\":-0.33307776298768976,\"score\":7.028476818985886,\"probabilityCalibrated\":0.6665388814938449},{\"id\":\"id-0-6\",\"firstName\":\"Elofi\",\"lastName\":\"Boudrik\",\"likelyGender\":\"male\",\"genderScale\":-0.11012604123440539,\"score\":4.032702493798025,\"probabilityCalibrated\":0.5550630206172027},{\"id\":\"id-0-7\",\"firstName\":\"Hanolan\",\"lastName\":\"Nguyen\",\"likelyGender\":\"male\",\"genderScale\":-0.008432921157768725,\"score\":1.9101002882663785,\"probabilityCalibrated\":0.5042164605788844},{\"id\":\"id-0-8\",\"firstName\":\"Rigiv\",\"lastName\":\"Boipa\",\"likelyGender\":\"male\",\"genderScale\":-0.16489992411149657,\"score\":4.901576530323028,\"probabilityCalibrated\":0.5824499620557483},{\"id\":\"id-0-9\",\"firstName\":\"\",\"lastName\":null,\"likelyGender\":\"male\",\"genderScale\":-0.003079621499414431,\"score\":0.14166003739190192,\"probabilityCalibrated\":0.5015398107497072}]}"
];

let fakeReturn_2 = [
  "{\"personalNames\":[{\"id\":\"id-0-0\",\"firstName\":\"Francois1er\",\"lastName\":\"Deloin\",\"likelyGender\":\"male\",\"genderScale\":-0.09883211736571518,\"score\":3.848604916138543,\"probabilityCalibrated\":0.5494160586828576},{\"id\":\"id-0-1\",\"firstName\":\"Marc\",\"lastName\":\"Levy\",\"likelyGender\":\"male\",\"genderScale\":-0.9888455601662252,\"score\":27.51904701752601,\"probabilityCalibrated\":0.9944227800831126},{\"id\":\"id-0-2\",\"firstName\":\"Giselle\",\"lastName\":\"Boudrik\",\"likelyGender\":\"female\",\"genderScale\":0.9849057931975964,\"score\":25.873150600725825,\"probabilityCalibrated\":0.9924528965987982},{\"id\":\"id-0-3\",\"firstName\":\"Kim\",\"lastName\":\"Nguyen\",\"likelyGender\":\"female\",\"genderScale\":0.20444073233574733,\"score\":5.838910654001653,\"probabilityCalibrated\":0.6022203661678737},{\"id\":\"id-0-4\",\"firstName\":\"Sam\",\"lastName\":\"Levy\",\"likelyGender\":\"male\",\"genderScale\":-0.3367965471370036,\"score\":7.091917665365552,\"probabilityCalibrated\":0.6683982735685018},{\"id\":\"id-0-5\",\"firstName\":\"Nat\",\"lastName\":\"Boudrik\",\"likelyGender\":\"male\",\"genderScale\":-0.13728344843393803,\"score\":4.545203686776528,\"probabilityCalibrated\":0.568641724216969},{\"id\":\"id-0-6\",\"firstName\":\"Elofi\",\"lastName\":\"Nguyen\",\"likelyGender\":\"male\",\"genderScale\":-0.0076461051076990305,\"score\":1.665999535483519,\"probabilityCalibrated\":0.5038230525538495},{\"id\":\"id-0-7\",\"firstName\":\"Hanolan\",\"lastName\":\"Boipa\",\"likelyGender\":\"male\",\"genderScale\":-0.008771796418922673,\"score\":2.0303432782669217,\"probabilityCalibrated\":0.5043858982094613},{\"id\":\"id-0-8\",\"firstName\":\"Rigiv\",\"lastName\":\"\",\"likelyGender\":\"male\",\"genderScale\":-0.20177752460861598,\"score\":5.739814149441294,\"probabilityCalibrated\":0.600888762304308},{\"id\":\"id-0-9\",\"firstName\":\"\",\"lastName\":\"\",\"likelyGender\":\"male\",\"genderScale\":-0.003079621499414431,\"score\":0.14166003739190192,\"probabilityCalibrated\":0.5015398107497072}]}",
  "{\"personalNames\":[{\"id\":\"id-1-0\",\"firstName\":\"Kim\",\"lastName\":\"Nguyen\",\"likelyGender\":\"female\",\"genderScale\":0.20444073233574733,\"score\":5.838910654001653,\"probabilityCalibrated\":0.6022203661678737},{\"id\":\"id-1-1\",\"firstName\":\"Sam\",\"lastName\":\"Levy\",\"likelyGender\":\"male\",\"genderScale\":-0.3367965471370036,\"score\":7.091917665365552,\"probabilityCalibrated\":0.6683982735685018},{\"id\":\"id-1-2\",\"firstName\":\"Nat\",\"lastName\":\"Boudrik\",\"likelyGender\":\"male\",\"genderScale\":-0.13728344843393803,\"score\":4.545203686776528,\"probabilityCalibrated\":0.568641724216969},{\"id\":\"id-1-3\",\"firstName\":\"Elofi\",\"lastName\":\"Nguyen\",\"likelyGender\":\"male\",\"genderScale\":-0.0076461051076990305,\"score\":1.665999535483519,\"probabilityCalibrated\":0.5038230525538495},{\"id\":\"id-1-4\",\"firstName\":\"Hanolan\",\"lastName\":\"Boipa\",\"likelyGender\":\"male\",\"genderScale\":-0.008771796418922673,\"score\":2.0303432782669217,\"probabilityCalibrated\":0.5043858982094613},{\"id\":\"id-1-5\",\"firstName\":\"Rigiv\",\"lastName\":\"\",\"likelyGender\":\"male\",\"genderScale\":-0.20177752460861598,\"score\":5.739814149441294,\"probabilityCalibrated\":0.600888762304308},{\"id\":\"id-1-6\",\"firstName\":\"\",\"lastName\":\"\",\"likelyGender\":\"male\",\"genderScale\":-0.003079621499414431,\"score\":0.14166003739190192,\"probabilityCalibrated\":0.5015398107497072}]}",
  "{\"personalNames\":[{\"id\":\"id-2-0\",\"firstName\":\"Elofi\",\"lastName\":\"Nguyen\",\"likelyGender\":\"male\",\"genderScale\":-0.0076461051076990305,\"score\":1.665999535483519,\"probabilityCalibrated\":0.5038230525538495},{\"id\":\"id-2-1\",\"firstName\":\"Hanolan\",\"lastName\":\"Boipa\",\"likelyGender\":\"male\",\"genderScale\":-0.008771796418922673,\"score\":2.0303432782669217,\"probabilityCalibrated\":0.5043858982094613},{\"id\":\"id-2-2\",\"firstName\":\"Rigiv\",\"lastName\":\"\",\"likelyGender\":\"male\",\"genderScale\":-0.20177752460861598,\"score\":5.739814149441294,\"probabilityCalibrated\":0.600888762304308},{\"id\":\"id-2-3\",\"firstName\":\"\",\"lastName\":\"\",\"likelyGender\":\"male\",\"genderScale\":-0.003079621499414431,\"score\":0.14166003739190192,\"probabilityCalibrated\":0.5015398107497072}]}",
  "{\"personalNames\":[{\"id\":\"id-3-0\",\"firstName\":\"\",\"lastName\":\"\",\"likelyGender\":\"male\",\"genderScale\":-0.003079621499414431,\"score\":0.14166003739190192,\"probabilityCalibrated\":0.5015398107497072}]}"
]

let { forms } = formGestion
console.log('Forms: ', forms);

apiRequest.batch = async (csv, config) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Id generator
      let idGen = (batchId, eleId) => `id-${batchId}-${eleId}`;

      // Check credit
      let cost = api_config.routes[config.url].cost;
      if (fakeCredGest.availableCredits < (cost * csv.length)) {
        let maxOperations = Math.floor(fakeCredGest.availableCredits / cost);
        if (maxOperations === 0) {
          reject('Credits are insufficient, please recharge and try again.');
        }
        else {
          csv = csv.slice(0, maxOperations)
        };
      };

      // Compute nb of requests
      let batchSize = 100;
      let nbRequests = Math.ceil(csv.length / batchSize);
      console.log('nbRequests: ', nbRequests);

      // Check data example
      Object.keys(config.ex).forEach(key => {
        if (config.ex[key] !== csv[0][key]) reject('Format error, unable to parse the document.');
      });

      // Build request array
      let requestForm = api_config.routes[config.url].request;
      let requestArch = {
        meta: Object.keys(requestForm),
        fields: {}
      };
      requestArch.meta.forEach(meta => {
        requestArch.fields[meta] = Object.keys(requestForm[meta]);
        if (config.idAuto === true) {
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
            if (config.idAuto === true) dataUnit.id = idGen(i, j);
            // console.log('dataUnit: ', dataUnit);
            // Parse each field for each data array / line
            batchBody[metaField].push(dataUnit);
          });
        });
        requestArray.push({
          key: config.key,
          url: config.url,
          body: batchBody
        });
      };
      console.log('requestArray: ', requestArray);

      // Await for all results
      let responseArrayRaw = await Promise.all(requestArray.map(reqConfig => apiRequest.post(reqConfig)));
      console.log('responseArrayRaw: ', responseArrayRaw);

      // let responseArrayRaw = fakeReturn_2;
      if (nbRequests === 1) {
        responseArrayRaw = JSON.parse(responseArrayRaw);
      }
      else {
        responseArrayRaw = responseArrayRaw.map(stringified => JSON.parse(stringified))
      };

      // Rebuild document and format for unparse
      let responseForm = api_config.routes[config.url].response['200'];
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
      if (config.idAuto !== true) responseArray.map(dataUnit => delete dataUnit.id);

      // Manage results
      window.localStorage.setItem(`apiResult_${config.fileId}`, JSON.stringify(responseArray));
      resolve(responseArray);
    }
    catch (e) {
      reject(`${e}.`)
    };
  });
};
let testFunc = async () => {
  try {
    let toast = await apiRequest.batch(csvSample, configSample);
    console.log('toast: ', toast);
  }
  catch (err) {
    console.log('err: ', err);
  }
}
testFunc()

// module.exports = apiRequest;