const exStructure = {
	"base": "https://v2.namsor.com/NamSorAPIv2","errorResponses": ["401", "403"],	"routes": {		"genderBatch": {"title": "Gender Batch","required": ["firstName", "lastName"],"cost": 1,"summary": "Infer the likely gender of up to 100 names, detecting automatically the cultural context.","request": {	"personalNames": {"id": {"type":"string"},"firstName":{"type":"string" },"lastName":{ "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"likelyGender": {"type": "string","description": "Most likely gender","enum": ["male", "female", "unknown"]},"genderScale": {"type": "number","description": "Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format": "double"},"score": { "type": "number", "format": "double" },"probabilityCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"genderGeoBatch": {"title": "Gender Geo Batch","required": ["firstName", "lastName", "countryIso2"],"cost": 1,"summary": "Infer the likely gender of up to 100 names, each given a local context (ISO2 country code).","request": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"countryIso2": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"likelyGender": {"type": "string","description": "Most likely gender","enum": ["male", "female", "unknown"]},"genderScale": {"type": "number","description": "Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format": "double"},"score": { "type": "number", "format": "double" },"probabilityCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"genderFullBatch": {"title": "Gender Full Batch","required": ["name"],"cost": 1,"summary": "Infer the likely gender of up to 100 full names, detecting automatically the cultural context.","request": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" },"likelyGender": {"type": "string","description": "Most likely gender","enum": ["male", "female", "unknown"]},"genderScale": {"type": "number","description": "Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format": "double"},"score": { "type": "number", "format": "double" },"probabilityCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"genderFullGeoBatch": {"title": "Gender Full Geo Batch","required": ["name", "countryIso2"],"cost": 1,"summary": "Infer the likely gender of up to 100 full names, with a given cultural context (country ISO2 code).","request": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" },"countryIso2": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" },"likelyGender": {"type": "string","description": "Most likely gender","enum": ["male", "female", "unknown"]},"genderScale": {"type": "number","description": "Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format": "double"},"score": { "type": "number", "format": "double" },"probabilityCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"parsedGenderBatch": {"title": "Parsed Gender Batch","required": ["firstName", "lastName"],"cost": 1,"summary": "Infer the likely gender of up to 100 fully parsed names, detecting automatically the cultural context.","request": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"prefixOrTitle": { "type": "string" },"suffix": { "type": "string" },"middleName": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"likelyGender": {"type": "string","description": "Most likely gender","enum": ["male", "female", "unknown"]},"genderScale": {"type": "number","description": "Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format": "double"},"score": { "type": "number", "format": "double" },				"probabilityCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"parsedGenderGeoBatch": {"title": "Parsed Gender Geo Batch","required": ["firstName", "lastName", "countryIso2"],"cost": 1,"summary": "Infer the likely gender of up to 100 fully parsed names, detecting automatically the cultural context.","request": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"prefixOrTitle": { "type": "string" },"suffix": { "type": "string" },"middleName": { "type": "string" },"countryIso2": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"likelyGender": {"type": "string","description": "Most likely gender","enum": ["male", "female", "unknown"]},"genderScale": {"type": "number","description": "Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format": "double"},"score": { "type": "number", "format": "double" },"probabilityCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"originBatch": {"title": "Origin Batch","required": ["firstName", "lastName"],"cost": 10,"summary": "[USES 10 UNITS PER NAME] Infer the likely country of origin of up to 100 names, detecting automatically the cultural context.","request": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"countryOrigin": {"type": "string","description": "Most likely country of Origin"},"countryOriginAlt": {"type": "string","description": "Second best alternative : country of Origin"},"countriesOriginTop": {"type": "array","description": "List countries of Origin (top 10)","items": {"type": "string","description": "List countries of Origin (top 10)"}},"score": {"type": "number","description": "Compatibility to NamSor_v1 Origin score value","format": "double"},"regionOrigin": {"type": "string","description": "Most likely region of Origin (based on countryOrigin ISO2 code)"},"topRegionOrigin": {"type": "string","description": "Most likely region of Origin (based on countryOrigin ISO2 code)"},"subRegionOrigin": {"type": "string","description": "Most likely region of Origin (based on countryOrigin ISO2 code)"},"probabilityCalibrated": { "type": "number", "format": "double" },"probabilityAltCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"countryBatch": {"title": "Country Batch","required": ["name"],"cost": 10,"summary": "[USES 10 UNITS PER NAME] Infer the likely country of residence of up to 100 personal full names, or surnames. Assumes names as they are in the country of residence OR the country of origin.","request": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" },"score": { "type": "number", "format": "double" },"country": { "type": "string" },"countryAlt": { "type": "string" },"region": { "type": "string" },"topRegion": { "type": "string" },"subRegion": { "type": "string" },"countriesTop": {"type": "array","description": "List countries (top 10)","items": {"type": "string","description": "List countries (top 10)"}},"probabilityCalibrated": { "type": "number", "format": "double" },"probabilityAltCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"diasporaBatch": {"title": "Diaspora Batch","required": ["firstName", "lastName", "countryIso2"],"cost": 20,"summary": "[USES 20 UNITS PER NAME] Infer the likely ethnicity/diaspora of up to 100 personal names, given a country of residence ISO2 code (ex. US, CA, AU, NZ etc.)","request": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"countryIso2": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"score": {"type": "number","description": "Compatibility to NamSor_v1 Origin score value","format": "double"},"ethnicityAlt": { "type": "string" },"ethnicity": { "type": "string" },"lifted": { "type": "boolean" },"countryIso2": { "type": "string" },"ethnicitiesTop": {"type": "array","description": "List ethnicities (top 10)","items": {"type": "string","description": "List ethnicities (top 10)"}}}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"usRaceEthnicityBatch": {"title": "US Race & Ethnicity Batch","required": ["firstName", "lastName"],"cost": 10,"summary": "[USES 10 UNITS PER NAME] Infer up-to 100 US resident's likely race/ethnicity according to US Census taxonomy.","request": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"countryIso2": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"raceEthnicityAlt": {"type": "string","description": "Second most likely US 'race'/ethnicity","enum": ["W_NL", "HL", "A", "B_NL"]},"raceEthnicity": {"type": "string","description": "Most likely US 'race'/ethnicity","enum": ["W_NL", "HL", "A", "B_NL"]},"score": {"type": "number","description": "Compatibility to NamSor_v1 Origin score value","format": "double"},"raceEthnicitiesTop": {"type": "array","description": "List 'race'/ethnicities","items": {"type": "string","description": "List 'race'/ethnicities"}},"probabilityCalibrated": { "type": "number", "format": "double" },"probabilityAltCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"usZipRaceEthnicityBatch": {"title": "US Zip Race & Ethnicity Batch","required": ["firstName", "lastName", "countryIso2", "zipCode"],"cost": 10,"summary": "[USES 10 UNITS PER NAME] Infer up-to 100 US resident's likely race/ethnicity according to US Census taxonomy, with (optional) ZIP code.","request": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"countryIso2": { "type": "string" },"zipCode": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" },"raceEthnicityAlt": {"type": "string","description": "Second most likely US 'race'/ethnicity","enum": ["W_NL", "HL", "A", "B_NL"]},"raceEthnicity": {"type": "string","description": "Most likely US 'race'/ethnicity","enum": ["W_NL", "HL", "A", "B_NL"]},"score": {"type": "number","description": "Compatibility to NamSor_v1 Origin score value","format": "double"},"raceEthnicitiesTop": {"type": "array","description": "List 'race'/ethnicities","items": {"type": "string","description": "List 'race'/ethnicities"}},"probabilityCalibrated": { "type": "number", "format": "double" },"probabilityAltCalibrated": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"parseNameBatch": {"title": "Parse Name Batch","required": ["name"],"cost": 1,"summary": "Infer the likely first/last name structure of a name, ex. John Smith or SMITH, John or SMITH; John.","request": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" },"nameParserType": { "type": "string" },"nameParserTypeAlt": { "type": "string" },"firstLastName": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" }},"score": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}},"parseNameGeoBatch": {"title": "Parse Name Geo Batch","required": ["name", "countryIso2"],"cost": 1,"summary": "Infer the likely first/last name structure of a name, ex. John Smith or SMITH, John or SMITH; John. Giving a local context improves precision. ","request": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" },"countryIso2": { "type": "string" }}},"response": {"200": {"personalNames": {"id": { "type": "string" },"name": { "type": "string" },"nameParserType": { "type": "string" },"nameParserTypeAlt": { "type": "string" },"firstLastName": {"id": { "type": "string" },"firstName": { "type": "string" },"lastName": { "type": "string" }},"score": { "type": "number", "format": "double" }}},"401": { "description": "Missing or incorrect API Key" },"403": { "description": "API Limit Reached or API Key Disabled" }}}}
}

const bas64Imgs={
  "text/csv": "data:image/png;base64,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",
  "text/plain": "data:image/png;base64,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"
};

//MANIPULATION DU DOM
const domGestion = 
(function(){
    //Gestion du DOM
    const byId = id => document.getElementById(id);
    const byClass = className => document.getElementsByClassName(className);
    const byName = name => document.getElementsByTagName(name);
    const bySelector = (selector, all) => {
        if(all) return document.querySelectorAll(selector);
        else return document.querySelector(selector);
    };
    const toggleClass = (el, className) => el?.classList?.toggle(className);
    const addClass = (el, className) => el?.classList?.add(className);
    const removeClass = (el, className) => el?.classList?.remove(className);
    const addEvent = (el, action, callback) => el?.addEventListener(action, callback, false);
    const removeEvent = (el, action, callback) => el?.removeEventListener(action, callback);
//Gestion des modal
    const body = bySelector('body')
    const hideModal = el => {
        removeClass(body, 'overflow-hidden');
        addClass(el, 'hide');
    };
    const showModal = el => {
        addClass(body, 'overflow-hidden');
        removeClass(el, 'hide');
    };
    return {byId, byClass, byName, bySelector, toggleClass, addClass, removeClass, addEvent, 
            removeEvent, hideModal, showModal}
})();
// FONCTIONS UTILITAIRES
const strRandom = 
(()=>{
    const options = {
        includeUpperCase: true,
        includeNumbers: true,
        length: 8,
        startsWithLowerCase: true
    };
    return generate = (o) => {
        o = o || options;
        let a = 10,
            b = 'abcdefghijklmnopqrstuvwxyz',
            c = '',
            d = 0,
            e = ''+b;
        if (o) {
        if (o.startsWithLowerCase) {
            c = b[Math.floor(Math.random() * b.length)];
            d = 1;
        }
        if (o.length) {
            a = o.length;
        }
        if (o.includeUpperCase) {
            e += b.toUpperCase();
        }
        if (o.includeNumbers) {
            e += '1234567890';
        }
        }
        for (; d < a; d++) {
        c += e[Math.floor(Math.random() * e.length)];
        }
        return c;
    }
})()
// GESTION CREDITS  = STORE (Object avec getter et setter)
const creditsGestion = {
  requiredCredits: {},
  avaibleCredits: 0,
  //Mutateur permettant de mettre à jour la propriété requiredCredits
  set updateRequiredCredits({id, value, operation}){
      if(['update', 'add'].includes(operation)) this.requiredCredits[id] = value;
      if(operation === 'delete') delete this.requiredCredits[id];
  },
  set useCredits(id){
      this.avaibleCredits -= this.requiredCredits[id];
      delete this.requiredCredits[id];
  },
  //Accesseur permettant de récupérer les crédits nécéssaires et disponible
  get haveEnough(){
      const formatRequiredCredits = Object.values(this.requiredCredits);
      const required = formatRequiredCredits[0] ? formatRequiredCredits?.reduce((t, n) => t + n) : 0;
      const filesNotUsed = [];
      let fileSlice, remainingCredits = this.avaibleCredits; 
      Object.entries(this.requiredCredits).forEach(([id, value]) => {
          if(remainingCredits > 0 && remainingCredits - value < 0 && (remainingCredits / formsGestion.forms[id].data.cost) >= 1 ) fileSlice = {id, remainingCredits};
          else if(remainingCredits < 0 || (remainingCredits / formsGestion.forms[id].data.cost) < 1) filesNotUsed.push(id);  
          remainingCredits -= value;
      });
      return({
          required, 
          avaible: this.avaibleCredits, 
          haveEnough: required <= this.avaibleCredits,
          filesNotUsed, 
          fileSlice
      });
  },
};
//SERVICES
const servicesGestion = {
  //Méthode servant à récupérer le nombre de crédits
  userIsLogin: () => new Promise (async(resolve, reject) => {
    getInfoOpt = await getInfo();
    getApiKeyInfo = await getApiKey();

    if (getInfoOpt !== undefined){
      let result ;
      apiGestion.get({
        key: getApiKeyInfo,
        url: "apiUsage",
        args : []
      })
      .then(res => {
        result = JSON.parse(res).subscription.planQuota - JSON.parse(res).billingPeriod.usage;
        resolve(result);
      })
      .catch(() => reject('Could not process your file, please try with another separator or file.'))
    } else {
      resolve(false);
    }
  }),
    requestStructure: () => new Promise ((resolve, reject) => {
        resolve(exStructure.routes);
    }),
    papaParsing: id => new Promise (async (resolve, reject) => {
        console.log("Fonction: papaParsing");
        const {files} = dropzoneGestion;
        const separator = formsGestion.forms[id].separator === "auto" ? "" : formsGestion.forms[id].separator;
        try{
          Papa.parse(files[id], {
            delimiter: separator, // auto-detect
            newline: "", // auto-detect
            quoteChar: '"', // The character used to quote fields 
            download: true,
            header: false,
            skipEmptyLines: true,
            dynamicTyping: true, // will convert numbers to Number instead of String
            comments: true,
            complete: async function(results){
              let parsing = {
                  totalLignes: results.data.length,
                  options: [
                    results.data[0],
                    results.data[1]
                  ],
                  delimiter: results.meta.delimiter
                }
              resolve(parsing);
            },
          })
        }catch{
          reject('File not found');
        }
    }),
    papaParsingFinal: (id, preview) => new Promise ((resolve, reject) => {
      const {files} = dropzoneGestion;
      const {forms} = formsGestion;
      const separator = formsGestion.forms[id].separator === "auto" ? "" : formsGestion.forms[id].separator;
      console.log(forms[id]);
      console.log(files[id]);


      let cols = forms[id].inputsValue.cols;
      try{
        Papa.parse(files[id], {
          delimiter: separator,
          newline: "", // auto-detect
          quoteChar: '"', // The character used to quote fields 
          download: true,
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true, // will convert numbers to Number instead of String
          comments: true,
          preview: preview,
          beforeFirstChunk: function(chunk){
            var rows = chunk.split( /\r\n|\r|\n/ );
            var headings = rows[0].split( ';' );
            
            if (forms[id].checkboxHeader === "withHeader") {
              headings.map((heading, i) => {headings[i] = i;});
                Object.keys(cols).map((key) => {
                  if (cols[key] !== "auto") headings[cols[key]] = key
                });
                rows[0] = headings.join(forms[id].parsingData.delimiter);
            } else if (forms[id].checkboxHeader === "withoutHeader"){
                headings.map((heading, i) => {headings[i] = i;});
                Object.keys(cols).map((key) => {
                  if (cols[key] !== "auto") headings[cols[key]] = key
                });    
                rows.splice(0, 0, headings.join(forms[id].parsingData.delimiter));

            }
            return rows.join('\n')
          },
          complete: async function(results){
            resolve(results.data)
          },
        })
      }catch{
        reject('File not found.');
      }
  }),

  papaUnparse: (id, json) => new Promise ((resolve, reject) =>{
    const {forms} = formsGestion;

    // let json = { }
    let result = Papa.unparse(json, {
      header: true,
      delimiter: forms[id].parsingData.delimiter,
      newline: "\r\n",
    })
   if (result) {resolve(result)}
   else if (!result) {reject('Could not process the result of the process.')}
  }),
};


//FLASH
const flashsGestion =
(function(){
const body = document.querySelector("body");
/* ========= Liste des instances de flashs ===========*/
    const flashs = {};
 // ================= Valeurs communes à tous les Flashs (instances de Flash) ================//
    const indicator = {
        icons: {error: "error-cross", success: "approved-checked", warning: "exclamation", classic: "approved-checked-green"},
        flashWidth: 290,
        flashId: 0,
        flashPosition : 0,
        flashActive : 0,

        get returnFlashId(){
            this.flashId ++;
            const maxContent = Math.floor(window.innerWidth / 272);
            this.flashPosition = this.flashActive ? this.flashPosition + 1 > maxContent ? 1 : this.flashPosition + 1 : 1;
            this.flashActive ++;
            return {id: this.flashId, position: this.flashPosition - 1, width: this.flashWidth}
        }
    };
// ============================= Flash => CONSTRUCTEUR DES FLASHS ========================//
    function Flash(message, type){
        this.type = type;
        this.icon = indicator.icons[type];
        this.message = message;
        this.value = indicator.returnFlashId;
    };

    Flash.prototype.infoMessage = function(){
        return(
            `<div id="info-${this.value.id}" class="flash ${this.type}">
                <div>
                    <img src="assets/csv/media/img/${this.icon}.png" />
                </div>
                <p>${this.message}</p>
            </div>`
        );
    };

    Flash.prototype.insert = function(id){
        body.insertAdjacentHTML("beforeend", this.infoMessage());
        const target = document.getElementById(`info-${this.value.id}`);
        target.style.right= `${this.value.position * this.value.width}px`;
        setTimeout(() => target.classList.add('visible'), 50);
        setTimeout(() => target.classList.remove('visible'), 5500);
        setTimeout(() => {
            target.remove();
            indicator.flashActive--;
            delete flashs[id];
        }, 6000);
    };
// ============================= FONCTION PUBLIQUE ========================//

    //Création des instances de Flash
    const callFlash = (message, type) => {
        const id = indicator.flashId;
        flashs[id] = new Flash(message, type);
        flashs[id].insert(id);
    };
    return {callFlash};
})();

//DROPZONE
const dropzoneGestion = 
(function(){

const {byId, addClass, removeClass} = domGestion;

const dropzoneInput = byId('dropzone-input');
const maxFilesize = 0.8;
const maxFiles = 5;
const dropzone = byId('dropzone');

//Liste des fichiers à traiter
const files = {}; 
// ======================== Configuration de la dropzone =======================//
const dropzoneComponent = new Dropzone(dropzone, {
    url: "/target",
    paramName: "file", // nom utilisé durant le transfert de fichier
    maxFilesize: maxFilesize, // MB
    maxFiles: maxFiles,
    addRemoveLinks: true,
    acceptedFiles: ".csv, .txt",
    autoProcessQueue: false,
    init: function() {
        //------------------------- Lors d'un ajout d'un fichier ------------------//
        this.on("addedfile", function(file) {
            if(!["application/vnd.ms-excel", "text/plain", "text/csv"].includes(file.type)){//Vérifier le type de fichier
                this.removeFile(file);
                flashsGestion.callFlash("Only csv and txt files are accepted.", "warning");
            } 
            else if(file.size > (maxFilesize * 1000000)){//Vérifier le poids du fichier
                this.removeFile(file);
                flashsGestion.callFlash(`The maximum size cannot exceed ${maxFilesize} MB.`, "warning");
            } 
            else{//Ajout d'un fichier
                file.previewTemplate.children[0].innerHTML = `<img data-dz-thumbnail="" alt="preview img" src=${bas64Imgs[file.type === "application/vnd.ms-excel" ? "text/csv" : file.type]} />`
                addClass(dropzoneInput, "hide");
                removeClass(byId('validate-drop'), 'hide');
                let id = strRandom();
                const fileRegister = () => {
                    if(!files[id]) {
                        file.id = id;
                        files[id] = file;
                    }
                    else {
                        id = strRandom();
                        fileRegister()
                    }
                };
                fileRegister();
            }
        });
        //------------------------- Lors de la suppression d'un fichier ------------------//
        this.on("removedfile", function(file) {
            delete files[file.id];
            if(creditsGestion.requiredCredits[file.id]){
                creditsGestion.updateRequiredCredits = {id: [file.id], operation: "delete"};
            }
        });
        //------------------------- Lorsque le nombre de fichier maximum est atteint ------------------//
        this.on("maxfilesexceeded", function(file) {
            this.removeFile(file);
            flashsGestion.callFlash(`The maximum number of simultaneously downloadable files is ${maxFiles}.`, "warning");
            delete files[file.id];
        });
    },
    //------------------------- Début d'un drag ------------------//
    dragenter: e => addClass(dropzone, 'focus'),
    //------------------------- Fin d'un drag ------------------//
    dragleave: e => removeClass(dropzone, 'focus'),
    //------------------------- Suppression de tout les fichiers ------------------//
    reset: () => {
        removeClass(dropzoneInput, "hide");
        addClass(byId('validate-drop'), 'hide');
    } 
});
return {dropzoneComponent, files};
})();

// INPUTS SELECT
const selectsGestion = 
(() => {
const {byId, addEvent, removeClass, addClass, removeEvent} = domGestion; //import du modules dom Gestion
// ======================== Constructeur des écoutes du Select-input personnalisé =======================//
function Select(el, id){
    //------------------------- Propriétés (state) ------------------//
    this.inputField = el.querySelector('.chosen-value');
    this.id = id;
    this.dropdown = el.querySelector('.value-list');
    this.dropdownArray = [...el.querySelectorAll('li')];
    this.valueArray = this.dropdownArray.map(item => item.textContent);
};
//------------------------- Callbacks ------------------//
Select.prototype.inputListener = function() {
    this.dropdown.classList.add('open');
    let inputValue = this.inputField.value.toLowerCase();
    if (inputValue.length > 0) {
        for (let j = 0; j < this.valueArray.length; j++) {if (window.CP.shouldStopExecution(0)) break;
        if (!(inputValue.substring(0, inputValue.length) === this.valueArray[j].substring(0, inputValue.length).toLowerCase())) {
            addClass(this.dropdownArray[j], 'closed');
        } else {
            removeClass(this.dropdownArray[j], 'closed');
        }
        }window.CP.exitedLoop(0);
    } else {
        for (let i = 0; i < this.dropdownArray.length; i++) {if (window.CP.shouldStopExecution(1)) break;
            removeClass(this.dropdownArray[i], 'closed');
        }window.CP.exitedLoop(1);
    }
};
Select.prototype.itemClick = function(item) {
    this.inputField.value = item.textContent;
    this.dropdownArray.forEach(dropdown => {
        addClass(dropdown, 'closed');
    });
};
Select.prototype.inputFocus = function() {
    this.inputField.placeholder = 'Type to filter';
    this.dropdown.classList.add('open');
    this.dropdownArray.forEach(dropdown => {
        removeClass(dropdown, 'closed');
    });
};
Select.prototype.inputBlur = function() {
    this.inputField.placeholder = 'Select state';
    removeClass(this.dropdown, 'open');
};
Select.prototype.documentClick = function(evt) {
    const isDropdown = this.dropdown.contains(evt.target);
    const isInput = this.inputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        removeClass(this.dropdown, 'open');
    }
};
//------------------------- Listeners ------------------//
Select.prototype.activeSelectListener = function(callback){
    addEvent(this.inputField, 'input', this.inputListener.bind(this));
    this.dropdownArray.forEach(item => {
        addEvent(item, 'click', () => {
            this.itemClick(item);
            callback(item.textContent, this.id);
        });
    });
    addEvent(this.inputField, 'focus', this.inputFocus.bind(this));
    addEvent(this.inputField, 'blur', this.inputBlur.bind(this));
    addEvent(document, 'click', this.documentClick.bind(this));
};
Select.prototype.removeSelectListener = function(){
    removeEvent(document, 'click', this.documentClick.bind(this));
};
//Liste des instances de Select;
let selects = {};

// FonctionsPubliques
//Création des instances de Select;
const activateSelect = (id, callback) => {
        if(!selects[id]){
            const select = byId(`select-input-${id}`);
            selects[id] = new Select(select, id);
            selects[id].activeSelectListener(callback);
        };
};
//Suppression des instances de Select;
const disableSelect = id => {
    if(id){
        selects[id].removeSelectListener(); 
        delete selects[id];
    }else{
        Object.values(selects).map( select => select.removeSelectListener());
        selects = {};
    };
};
return {activateSelect, disableSelect}
})();

//FORMS
const formsGestion =
(function(){
//import des modules
const {byId, bySelector, addClass, removeClass} = domGestion; 
const {requestStructure} = servicesGestion;
const {callFlash} = flashsGestion;
    // ================= Valeurs communes à tous les Forms (instances de Form) ================//
    const loader = "<img class='loader' src='assets/csv/media/img/loader.svg' alt='loader'/>";
    const separators = ["auto", ",", ";", ".", ":"]
    const parsingError = "<p class='parsing-error'>Unable to process requested file, please try again with another separator or file.</p>";
    const DomStaticElement = {
        notAllProcessingMessage : byId('not-all-processing-message'),
        parsingErrorMessage : byId('parsing-error-message'),
        notEnoughCreditsDiv : byId('not-enough-credits-div'),
        enoughCreditsDiv : byId('enough-credits-div'),
        formArea : byId('form-area'),
        totalRequiredCredits : bySelector('.total-required-credits', 'all'),
        avaibleCredits : bySelector('.avaible-credits', 'all'),
        neededCredits : bySelector('.needed-credits', 'all'),
    };

    let structure = {}; //Objet à remplir avec les données (structure des données) des routes => la clé est le nom de la route
    let selectInput= "";
    (() => {
        requestStructure()
            .then(res => {
                structure = res;
                const names = Object.keys(res);
                selectInput = 
                `<input class="chosen-value" type="text" value="" placeholder="Choose a type of treatment &#8681;">
                    <ul class="value-list">
                        ${names.map(name => `<li>${name}</li>`).join("")}
                    </ul>`
            })
            .catch(error => callFlash(`We have a connection problem, please try again later.`, "error"))
    })()
function Form(file){
    this.requestName = "";
    this.id = file.id;
    this.fileName = file.name;
    this.fileSize = `${file.size / 1000} MB`;
    this.componentsDom = {};
    this.data;
    this.parsingData;
    this.separator = "auto";
    this.checkboxHeader = "withoutHeader";
    this.readyToSubmit;
    this.inputsValue = {cols:{}, colsEx:{}};
};
// ============================= FORM ========================//
//------------- Création du dom -------------//
Form.prototype.createForm = function(){
    return (
    `<div class="form" id="form-${this.id}">
        <div class="flex first-line">
            <h3>${this.fileName} <span class="secondary">${this.fileSize}</span></h3>
            <img class='delete' src='assets/csv/media/img/trash-bin.png' alt='delete' />
        </div>
        <div class="select-input" id="select-input-${this.id}">
            ${selectInput}
        </div>
        <p class="description-title">Description :</p>
        <p class="cost">Choose a type of treatment to obtain a cost.</p>
        <p class="summary">Choose a type of treatment to get more information.</p>
        <p class="inputs-area-title">Data formatting :<p>
        <div class="separator-div">
            <label for="separator-input">Choose a separator (optional):</label>
            <select class="separator-input select" name="separator-input" disabled>
                ${separators.map(separator => `<option value="${separator}">${separator}</option>`)}
            </select>
        </div>
        <div class="inputs-area"></div>
    </div>`);
};
//------------- Insertion dans le Dom -------------//
Form.prototype.insertForm = function(){
    DomStaticElement.formArea.insertAdjacentHTML('beforeend', this.createForm());
    const form = byId(`form-${this.id}`);
    this.componentsDom = {
        form,
        cost: form.querySelector('.cost'),
        summary: form.querySelector('.summary'),
        inputsArea: form.querySelector('.inputs-area'),
        separatorInput: form.querySelector('.separator-input'),
    };
    actionsGestion.requestInputListener(this.id);
    actionsGestion.deleteButtonListener(form, this);
};
//---------------- Suppression du composant ---------------//
Form.prototype.deleteForm  = function(){
    const form = forms[this.id]
    this.componentsDom.form.remove();
    delete forms[this.id];
    form.updateSubmitSection();
};
//------------- Modification du composant -------------//
Form.prototype.updateForm = function(name){
    const {cost, summary, inputsArea, separatorInput} = this.componentsDom;
    if(this.requestName !== name){
        this.data = structure[name];
        this.requestName = name;
        cost.innerHTML = `Use ${this.data.cost} credit(s) per line`;
        summary.innerHTML = this.data.summary;
        inputsArea.innerHTML = loader;
    };
    if(separatorInput.disabled){
        separatorInput.disabled = false;
        actionsGestion.separatorInputListener(separatorInput, this.id);
    };
};
//------------------------- Création du DOM ------------------//
Form.prototype.createInputsArea = function() {
    const requiredCredits = creditsGestion.requiredCredits[this.id];
    const options = this.parsingData.options;
    return `
    <p class="inputs-area-title">Data distribution :</p>
    <div>
        <input type="checkbox" id="checkbox-header-${this.id}" name="checkbox-header">
        <label class="checkbox-header" for="checkbox-header-${this.id}">the document contains a header</label>
    </div>
    <div class="select-area">
    ${Object.keys(this.data.request.personalNames).map( field => {
        const isRequired = this.data.required.includes(field);
        return (
        `<div class="input">
            <label for="${field}">Select the ${isRequired ? field+"*" : field + " (optional)"}:</label>
            <select 
                name="${field}" class="select withoutHeader" 
                ${this.checkboxHeader === "withoutHeader" && isRequired ? "required" : ""}
            >
                ${field === "id" ? 
                "<option value='auto'>auto</option>" : 
                "<option hidden disabled selected value >Select an option</option>"}
                ${options[0].map((option, index) => `<option value="${index}">${option}</option>`)}
            </select>
            <select 
                name="${field}" class="select withHeader hide" 
                ${this.checkboxHeader === "withHeader" && isRequired ? "required" : ""}
            >
                ${field === "id" ? 
                "<option value='auto'>auto</option>" : 
                "<option hidden disabled selected value >Select an option</option>"}
                ${options[1].map((option, index) => `<option value="${index}">${option}</option>`)}
            </select>
            <p>You cannot choose the same value for two columns.</p>
        </div>`
        )}
        ).join("")}
    </div>
    <p class="cost-indicator ${requiredCredits <= creditsGestion.avaibleCredits ? "enough" : "not-enough"}">
        <span class="required-credits">${requiredCredits} credits are required for this request</span> 
        / 
        <span class="avaible-credits">${creditsGestion.avaibleCredits} avaible credits</span>
    </p>
    `;
};
//-------------------- Mise à jour du sous composant ------------------//
Form.prototype.updateInputsArea = function(){
    const {form, inputsArea} = this.componentsDom;
    if(this.parsingData){
        this.readyToSubmit = true;
        inputsArea.innerHTML = this.createInputsArea();
        this.componentsDom = {
            ...this.componentsDom, 
            inputs: form.querySelectorAll('.input'),
            costIndicator: form.querySelector('.cost-indicator'),
        };
        actionsGestion.headerInputListener(this.id); 
    }else {
        this.readyToSubmit = false;
        inputsArea.innerHTML = parsingError;
    };

    this.updateSubmitSection();
};
//---------------------- Mise à jour des options des inputs (selects colonnes) ------------------//
Form.prototype.updateInputsOptions = function(withHeader){
    const {inputsArea} = this.componentsDom;
    this.checkboxHeader = withHeader ? "withHeader" : "withoutHeader";
    const updateSelects = el => {
        if(el.classList.contains(this.checkboxHeader)){
            el.required = this.data.required.includes(el.name);
            removeClass(el, 'hide');
        }else{
            el.required = false;
            addClass(el, 'hide');
        };
    };
    inputsArea.querySelectorAll('.select').forEach(updateSelects);
};
//-------------------- Mise à jour du sous composant Cost Indicator ------------------//
Form.prototype.updateCostIndicator  = function(type){
    const {costIndicator} = this.componentsDom;
    const requiredCredits = creditsGestion.requiredCredits[this.id];
    if(type === "required"){
        costIndicator.querySelector('.required-credits').textContent = `${requiredCredits} credits are required for this request`;
    }else{
        costIndicator.querySelector('.avaible-credits').textContent = `${creditsGestion.avaibleCredits} avaible credits`;
    }
    costIndicator.classList = `cost-indicator ${requiredCredits <= creditsGestion.avaibleCredits ? "enough" : "not-enough"}`;
};
//------------------------- Préparation du submit ------------------//
Form.prototype.updateSubmitSection = function(){
    const formsAreReady = Object.values(forms).every(form => form.readyToSubmit !== undefined);
    const formsAreError = Object.values(forms).some(form => !form.readyToSubmit);

    const {notAllProcessingMessage, parsingErrorMessage, notEnoughCreditsDiv, 
        enoughCreditsDiv, totalRequiredCredits, avaibleCredits, neededCredits} = DomStaticElement;

    if(formsAreReady){
        if(formsAreError){
            addClass(notAllProcessingMessage, "hide");
            removeClass(parsingErrorMessage, "hide");
            addClass(notEnoughCreditsDiv, 'hide');
            addClass(enoughCreditsDiv, 'hide');

        }else{
            const creditsInfo = creditsGestion.haveEnough;
            
            totalRequiredCredits.forEach(el => el.textContent = creditsInfo.required);
            avaibleCredits.forEach(el => el.textContent = creditsInfo.avaible);
            neededCredits.forEach(el => el.textContent = ((creditsInfo.avaible - creditsInfo.required) * -1));
            
            if(creditsInfo.haveEnough){
                addClass(notAllProcessingMessage, "hide");
                addClass(parsingErrorMessage, "hide");
                addClass(notEnoughCreditsDiv, 'hide');
                removeClass(enoughCreditsDiv, 'hide');
            }else{
                addClass(notAllProcessingMessage, "hide");
                addClass(parsingErrorMessage, "hide");
                removeClass(notEnoughCreditsDiv, 'hide');
                addClass(enoughCreditsDiv, 'hide');
            };
        };
    }else{
        removeClass(notAllProcessingMessage, "hide");
        addClass(parsingErrorMessage, "hide");
        addClass(notEnoughCreditsDiv, 'hide');
        addClass(enoughCreditsDiv, 'hide');
    }
};
//------------------------- Submit du form ------------------//
Form.prototype.submitForm = function(){
    const {inputsArea} = this.componentsDom;
    const inputs = inputsArea.querySelectorAll(`.select.${this.checkboxHeader}`);
    const selectedValue = [];
    let error;
    inputs.forEach(input => {
        const textContent = input.name !== "id" ? input.options[parseInt(input.value) + 1].outerText : isNaN(input.value) ? input.value : input.options[parseInt(input.value) + 1].outerText;
        if(selectedValue.includes(input.value)){
            addClass(input.closest('.input'), "error");
            error = this.id;
        }else{
            removeClass(input, "error");
            selectedValue.push(input.value);
            this.inputsValue.cols[input.name] = input.value;
            this.inputsValue.colsEx[input.name] = textContent;
            error = false;
        };
    });
    return error;
};
/* ========= Liste des instances de Forms ===========*/
    let forms = {};
/* ========= Création des instances forms ===========*/
    const createForm = () => {
        const {files} = dropzoneGestion;
        const filesNumber = Object.keys(files).length;
        const formsNumber = Object.keys(forms).length;

        Object.values(forms)?.forEach(form => {
            if(!files[form.id]){
                form.deleteForm();
            };
        });

        Object.values(files).forEach( (file, index) => {
            if(!forms[file.id]){
                forms[file.id] = new Form(file);
                forms[file.id].insertForm();
                if(formsNumber && index + 1 === filesNumber) {
                    forms[file.id].updateSubmitSection();
                }
            };
        });
    };
/* ========= Extraction des données des forms ===========*/
    const submitForm = () => {
        const formsAddError = Object.values(forms).map(form => form.submitForm());
        if(formsAddError.some(error => error)) return formsAddError;
        else return false;
    };
return {createForm, submitForm, forms}
})()

// TABLES
const tablesGestion = 
(function(){
const {byId, bySelector, addClass, removeClass} = domGestion; 
// ==================== Valeurs commnunes
const DomElement = {
  dataArraySection: bySelector('.data-array-section'),
  tabPanelsContener: byId('tab-panels'),
  arrowPrev: byId('arrow-prev'),
  arrowNext: byId('arrow-next')
}
let formsNumber, tabPanelsPosition;
/* ================================================================================================
                                    CONSTRUCTEUR DES TABLEAUX
==================================================================================================*/
function Table(id){
  this.id = id;
  this.infoArray = {};
  this.componentsDom = {};
};
// --------------------- Création du parent de Table -------------------//
  Table.prototype.createTableSection = function(){
    return (
      `<div class="table hide" id="table-section-${this.id}">
        <div class="title-table">
          <div class="flex">
            <h3> 
              ${dropzoneGestion.files[this.id].name} 
              <span class="secondary">${formsGestion.forms[this.id].fileSize}</span>
            </h3>
            <span class="download-button" id="upload-button-${this.id}"><img src="assets/csv/media/img/time-capsule.gif" alt="wait" /></span>
            </div>
          <p>Type of treatment: ${formsGestion.forms[this.id].requestName}</p>
        </div>
        <div class="overflow">
          <table id="table-${this.id}"></table>
        </div>
      </div>`
    )
  };
// --------------------- Création du TablePanel  -------------------//
  Table.prototype.createTablePanel = function(){
    return (
      `<div class="loading table-panel" id="table-panel-${this.id}">
        <div class="click-target" data-id="${this.id}">
          <p>${dropzoneGestion.files[this.id].name}</p>
          <img class="error-img" src="assets/csv/media/img/exclamation.png" alt="download" />
          <img class="loading-img" src="assets/csv/media/img/time-capsule-grey.gif" alt="loading" />
          <img class="notEnough-img" src="assets/csv/media/img/coins.png" alt="credits missing" />
        </div>
      </div>`
    );
  };
// --------------------- Insertion du parent de panel et du panelTable  -------------------//
  Table.prototype.insertTableElements = function(){
    DomElement.dataArraySection.insertAdjacentHTML('beforeend', this.createTableSection());
    DomElement.tabPanelsContener.insertAdjacentHTML('beforeend', this.createTablePanel());

    const tabPanel = byId(`table-panel-${this.id}`);
    this.componentsDom = {
      tableSection: byId(`table-section-${this.id}`),
      uploadButton: byId(`upload-button-${this.id}`),
      table: byId(`table-${this.id}`),
      tablePanel: tabPanel,
    };

    actionsGestion.tablePanelListener(tabPanel.querySelector('.click-target'));
  };
// --------------------- Création et insertion du tableau -------------------//
  Table.prototype.insertTable = function(infoArray, sliceNumber){
    const {table, tablePanel, tableSection} = this.componentsDom;
    const addId = formsGestion.forms[this.id].inputsValue.cols.id !== "auto";
    const newTable = 
    `<thead>
        <tr>
          ${Object.keys(infoArray[0]).map((key) => {
            if(key === "id" && addId || key !== "id")
            return `<th>${key}</th>`
          }).join("")}
        </tr>
      </thead>
      <tbody>
        ${infoArray.map((row) =>
          `<tr>
              ${Object.entries(row).map(([key, value]) => {
                if(key === "id" && addId || key !== "id")
                return `<td>${value}</td>`
              }).join("")}
          </tr>`
        ).join("")}
      </tbody>`

      table.insertAdjacentHTML('afterbegin', newTable);
      removeClass(tablePanel, "loading");

      if(sliceNumber){
        const sliceMessage = `
        <div class="sliceMessage">
          <p>You do not have enough credits to fully process this file. ${sliceNumber} lines 
          out of ${formsGestion.forms[this.id].parsingData.totalLignes} in total were processed. To see more, please purchase credits.</p>
          <a id="buy" class="button-green" href="pricing.html" target="_blank" rel="noopener">buy credits</a>
        </div>
        `;
        tableSection.insertAdjacentHTML('beforeend', sliceMessage);
      };

      if(!tablesReady){
        removeClass(tableSection, "hide");
        addClass(tablePanel, "actif");
        tablesReady++;
      };
  };
// --------------------- Mise à jour en cas d'erreur -------------------//
  Table.prototype.updateError = function(error){
    const {uploadButton, table, tablePanel, tableSection} = this.componentsDom;
    uploadButton.innerHTML = `<img src="assets/csv/media/img/${error ? "exclamation.png" : "coins.png"}" alt="error with your file" />`;
    table.innerHTML = error ?
    "<p>We have a problem with your file. The credits for processing this file have not been debited. Check the format or information entered and try again.</p>"
    : `<div class="flex buy-credits">
          <p>You do not have enough credits to process this file, please acquire credits and start over.</p>
          <a id="buy" class="button-green" href="pricing.html" target="_blank" rel="noopener">buy credits</a>
        </div>`;
    removeClass(tablePanel, 'loading');
    addClass(tablePanel, error ? 'error' : 'notEnough');
    if(!tablesReady){
      removeClass(tableSection, "hide");
      addClass(tablePanel, "actif");
      tablesReady++;
    };
  };
// --------------------- Mise à jour du bouton download -------------------//
  Table.prototype.updateDownloadLink = function(json){
    const fileFormat = dropzoneGestion.files[this.id].type === "text/plain" ? "text/plain" : "text/csv";
    let csvContent = `data:${fileFormat};charset=utf-8,${json}`;
    csvContent = encodeURI(csvContent);
    let download = json ?
      `<a class="download-link" href=${csvContent} download="${dropzoneGestion.files[this.id].name}"><img src="assets/csv/media/img/download.svg" alt="download" /></a>` :
      '<img src="assets/csv/media/img/exclamation.png" alt="download" />'
    this.componentsDom.uploadButton.innerHTML = download;
  };
/* ========= Liste des instances de Tables ===========*/
  const tables = {};
  let tablesReady;
/* ========= Determiner si arrows des tablesPanel sont visibles ===========*/ 
  const showHideArrows = () => {
    let maxTabPanels = Math.floor((screen.width - 304) / 160);
    maxTabPanels = maxTabPanels < 1 ? 1 : maxTabPanels;
    let flag = !(maxTabPanels < formsNumber);
    if(maxTabPanels < formsNumber && !flag){
      removeClass(DomElement.arrowPrev, 'hide');
      removeClass(DomElement.arrowNext, 'hide');
      flag = true;
    }else if(flag){
      DomElement.tabPanelsContener.style.transform = "translateX(0)";
      addClass(DomElement.arrowPrev, 'hide');
      addClass(DomElement.arrowNext, 'hide');
      flag = false;
    };
  };
/* ========= Décaler tablPanels avec arrow ===========*/ 
const moveTabPanels = function() {
  const direction = this.direction === "next" ?  1 : - 1;
  let maxTabPanels = Math.floor((screen.width - 304) / 160);
  maxTabPanels = maxTabPanels < 1 ? 1 : maxTabPanels;
  const maxNext = formsNumber - maxTabPanels;
  tabPanelsPosition = (tabPanelsPosition + direction) > maxNext ? maxNext : (tabPanelsPosition + direction) < 0 ? 0 : tabPanelsPosition + direction;
  if(tabPanelsPosition === 0) addClass(DomElement.arrowPrev, 'invisible');
  else removeClass(DomElement.arrowPrev, 'invisible');
  if(tabPanelsPosition === maxNext) addClass(DomElement.arrowNext, 'invisible');
  else removeClass(DomElement.arrowNext, 'invisible');
  DomElement.tabPanelsContener.style.transform = `translateX(${-tabPanelsPosition * 162}px)`;
}
/* ========= Création des instances Tables ===========*/
  const createTablesElements = () => {
    formsNumber = Object.keys(formsGestion.forms).length;
    tabPanelsPosition = 0;
    showHideArrows();
    tablesReady = 0;
    Object.keys(formsGestion.forms).forEach(id => {
      tables[id] = new Table(id);
      tables[id].insertTableElements();
    });
  };
/* ========= Affichage d'une autres instances de Tables ===========*/
  const newActiveTable = event => {
    const target = event.currentTarget.dataset.id;
    Object.values(tables).forEach(table => {
      if(table.id === target) {
        removeClass(table.componentsDom.tableSection, "hide");
        addClass(table.componentsDom.tablePanel, "actif");
      }else{
        addClass(table.componentsDom.tableSection, "hide");
        removeClass(table.componentsDom.tablePanel, "actif");
      };
    });
  };
return {showHideArrows, moveTabPanels, createTablesElements, newActiveTable, tables}
})();

const api_config = {"base":"https://v2.namsor.com/NamSorAPIv2","errorResponses":["401","403"],"routes":{"genderBatch":{"title":"Gender Batch","required":["firstName","lastName"],"cost":1,"summary":"Infer the likely gender of up to 100 names, detecting automatically the cultural context.","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"likelyGender":{"type":"string","description":"Most likely gender","enum":["male","female","unknown"]},"genderScale":{"type":"number","description":"Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format":"double"},"score":{"type":"number","format":"double"},"probabilityCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"genderGeoBatch":{"title":"Gender Geo Batch","required":["firstName","lastName","countryIso2"],"cost":1,"summary":"Infer the likely gender of up to 100 names, each given a local context (ISO2 country code).","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"countryIso2":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"likelyGender":{"type":"string","description":"Most likely gender","enum":["male","female","unknown"]},"genderScale":{"type":"number","description":"Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format":"double"},"score":{"type":"number","format":"double"},"probabilityCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"genderFullBatch":{"title":"Gender Full Batch","required":["name"],"cost":1,"summary":"Infer the likely gender of up to 100 full names, detecting automatically the cultural context.","request":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"},"likelyGender":{"type":"string","description":"Most likely gender","enum":["male","female","unknown"]},"genderScale":{"type":"number","description":"Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format":"double"},"score":{"type":"number","format":"double"},"probabilityCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"genderFullGeoBatch":{"title":"Gender Full Geo Batch","required":["name","countryIso2"],"cost":1,"summary":"Infer the likely gender of up to 100 full names, with a given cultural context (country ISO2 code).","request":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"},"countryIso2":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"},"likelyGender":{"type":"string","description":"Most likely gender","enum":["male","female","unknown"]},"genderScale":{"type":"number","description":"Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format":"double"},"score":{"type":"number","format":"double"},"probabilityCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"parsedGenderBatch":{"title":"Parsed Gender Batch","required":["firstName","lastName"],"cost":1,"summary":"Infer the likely gender of up to 100 fully parsed names, detecting automatically the cultural context.","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"prefixOrTitle":{"type":"string"},"suffix":{"type":"string"},"middleName":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"likelyGender":{"type":"string","description":"Most likely gender","enum":["male","female","unknown"]},"genderScale":{"type":"number","description":"Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format":"double"},"score":{"type":"number","format":"double"},"probabilityCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"parsedGenderGeoBatch":{"title":"Parsed Gender Geo Batch","required":["firstName","lastName","countryIso2"],"cost":1,"summary":"Infer the likely gender of up to 100 fully parsed names, detecting automatically the cultural context.","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"prefixOrTitle":{"type":"string"},"suffix":{"type":"string"},"middleName":{"type":"string"},"countryIso2":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"likelyGender":{"type":"string","description":"Most likely gender","enum":["male","female","unknown"]},"genderScale":{"type":"number","description":"Compatibility to NamSor_v1 Gender Scale M[-1..U..+1]F value","format":"double"},"score":{"type":"number","format":"double"},"probabilityCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"originBatch":{"title":"Origin Batch","required":["firstName","lastName"],"cost":10,"summary":"[USES 10 UNITS PER NAME] Infer the likely country of origin of up to 100 names, detecting automatically the cultural context.","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"countryOrigin":{"type":"string","description":"Most likely country of Origin"},"countryOriginAlt":{"type":"string","description":"Second best alternative : country of Origin"},"countriesOriginTop":{"type":"array","description":"List countries of Origin (top 10)","items":{"type":"string","description":"List countries of Origin (top 10)"}},"score":{"type":"number","description":"Compatibility to NamSor_v1 Origin score value","format":"double"},"regionOrigin":{"type":"string","description":"Most likely region of Origin (based on countryOrigin ISO2 code)"},"topRegionOrigin":{"type":"string","description":"Most likely region of Origin (based on countryOrigin ISO2 code)"},"subRegionOrigin":{"type":"string","description":"Most likely region of Origin (based on countryOrigin ISO2 code)"},"probabilityCalibrated":{"type":"number","format":"double"},"probabilityAltCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"countryBatch":{"title":"Country Batch","required":["name"],"cost":10,"summary":"[USES 10 UNITS PER NAME] Infer the likely country of residence of up to 100 personal full names, or surnames. Assumes names as they are in the country of residence OR the country of origin.","request":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"},"score":{"type":"number","format":"double"},"country":{"type":"string"},"countryAlt":{"type":"string"},"region":{"type":"string"},"topRegion":{"type":"string"},"subRegion":{"type":"string"},"countriesTop":{"type":"array","description":"List countries (top 10)","items":{"type":"string","description":"List countries (top 10)"}},"probabilityCalibrated":{"type":"number","format":"double"},"probabilityAltCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"diasporaBatch":{"title":"Diaspora Batch","required":["firstName","lastName","countryIso2"],"cost":20,"summary":"[USES 20 UNITS PER NAME] Infer the likely ethnicity/diaspora of up to 100 personal names, given a country of residence ISO2 code (ex. US, CA, AU, NZ etc.)","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"countryIso2":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"score":{"type":"number","description":"Compatibility to NamSor_v1 Origin score value","format":"double"},"ethnicityAlt":{"type":"string"},"ethnicity":{"type":"string"},"lifted":{"type":"boolean"},"countryIso2":{"type":"string"},"ethnicitiesTop":{"type":"array","description":"List ethnicities (top 10)","items":{"type":"string","description":"List ethnicities (top 10)"}}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"usRaceEthnicityBatch":{"title":"US Race & Ethnicity Batch","required":["firstName","lastName"],"cost":10,"summary":"[USES 10 UNITS PER NAME] Infer up-to 100 US resident's likely race/ethnicity according to US Census taxonomy.","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"countryIso2":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"raceEthnicityAlt":{"type":"string","description":"Second most likely US 'race'/ethnicity","enum":["W_NL","HL","A","B_NL"]},"raceEthnicity":{"type":"string","description":"Most likely US 'race'/ethnicity","enum":["W_NL","HL","A","B_NL"]},"score":{"type":"number","description":"Compatibility to NamSor_v1 Origin score value","format":"double"},"raceEthnicitiesTop":{"type":"array","description":"List 'race'/ethnicities","items":{"type":"string","description":"List 'race'/ethnicities"}},"probabilityCalibrated":{"type":"number","format":"double"},"probabilityAltCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"usZipRaceEthnicityBatch":{"title":"US Zip Race & Ethnicity Batch","required":["firstName","lastName","countryIso2","zipCode"],"cost":10,"summary":"[USES 10 UNITS PER NAME] Infer up-to 100 US resident's likely race/ethnicity according to US Census taxonomy, with (optional) ZIP code.","request":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"countryIso2":{"type":"string"},"zipCode":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"raceEthnicityAlt":{"type":"string","description":"Second most likely US 'race'/ethnicity","enum":["W_NL","HL","A","B_NL"]},"raceEthnicity":{"type":"string","description":"Most likely US 'race'/ethnicity","enum":["W_NL","HL","A","B_NL"]},"score":{"type":"number","description":"Compatibility to NamSor_v1 Origin score value","format":"double"},"raceEthnicitiesTop":{"type":"array","description":"List 'race'/ethnicities","items":{"type":"string","description":"List 'race'/ethnicities"}},"probabilityCalibrated":{"type":"number","format":"double"},"probabilityAltCalibrated":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"parseNameBatch":{"title":"Parse Name Batch","required":["name"],"cost":1,"summary":"Infer the likely first/last name structure of a name, ex. John Smith or SMITH, John or SMITH; John.","request":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"},"nameParserType":{"type":"string"},"nameParserTypeAlt":{"type":"string"},"firstLastName":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"}},"score":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}},"parseNameGeoBatch":{"title":"Parse Name Geo Batch","required":["name","countryIso2"],"cost":1,"summary":"Infer the likely first/last name structure of a name, ex. John Smith or SMITH, John or SMITH; John. Giving a local context improves precision. ","request":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"},"countryIso2":{"type":"string"}}},"response":{"200":{"personalNames":{"id":{"type":"string"},"name":{"type":"string"},"nameParserType":{"type":"string"},"nameParserTypeAlt":{"type":"string"},"firstLastName":{"id":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"}},"score":{"type":"number","format":"double"}}},"401":{"description":"Missing or incorrect API Key"},"403":{"description":"API Limit Reached or API Key Disabled"}}}}}

//API GESTION
let apiGestion = {}
apiGestion.get = function (options) {
  // console.log('Request GET');
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
      let apiKey = await getApiKey();
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
      resolve(responseArray);
    }
    catch (e) {
      reject(`${e}.`)
    };
  });
};

//DISPATCHER
const dispatcher =
(function(){
const {byId, bySelector, addClass, removeClass, hideModal, showModal} = domGestion;
const dropzoneSection = bySelector(".dropzone-section");
const modalLogin = byId('modal-login');
const modalFormat = byId('modal-format'); 
const loadingDom = byId('loading');
const notLoadingDom = byId('not-loading');
const formatOverflow = byId('format-overflow');
const arraySection = byId('array-section');
const tabpanelSection = bySelector('.tabpanel-section');
const downloadAllButton = byId('download-all-button');
/* ========= Mise à jour des components suite à la mise à jour du local storage ===========*/
    let isLogin = window.localStorage.getItem("firebaseui::rememberedAccounts");
    // Action à effectuer lors de la mise à jour du local storage
    const storageIsUpdate = async () => {
        console.log('storageIsUpdate')
        const justLogged = window.localStorage.getItem("firebaseui::rememberedAccounts");
        
        if(isLogin !== justLogged){ //L'utilisateur vient de se connecter
            valideDropzone(); //relancer le choix des modals
            isLogin = justLogged;
        }else if(justLogged){ //L'utilisateur vient d'acheter des credits
            const {forms} = formsGestion;
            servicesGestion.userIsLogin() //interroger le module fetch
            .then(userIsLogin => {
                creditsGestion.avaibleCredits = userIsLogin || 0; //Mettre à jour le store credit
                const formsNumber = Object.keys(forms).length; //Calcul du nombres de composants forms
                Object.values(forms).forEach((form, index) => {
                    form.updateCostIndicator(); //Mise à jour des components forms
                    if((index + 1) === formsNumber) form.updateSubmitSection(); //Mise à jour des components forms
                });
            })
            .catch(error => flashsGestion.callFlash(error, 'error'));
        };
        window.localStorage.removeItem('refresh');
    };

//DROPZONE    
/* ========= VALIDATION DE LA DROPZONE ===========*/
    // Action à effectuer lors du click sur le bouton validate de la dropzone
    const valideDropzone = async () => {
        servicesGestion.userIsLogin() //interroger le module fetch
        .then(userIsLogin => {
            creditsGestion.avaibleCredits = userIsLogin || 0; //Mettre à jour le store credit
            if(userIsLogin) formsGestion.createForm(); // Ordonner la création de  components forms
            hideModal(userIsLogin ? modalLogin : modalFormat);
            showModal(userIsLogin ? modalFormat : modalLogin); //Choisir quel modal afficher
        })
        .catch(error => flashsGestion.callFlash(error, 'error'));
    };
        
//FORMS
/* ========= Mise à jour du parsing d'un fichier (ex: new separator) ===========*/
    const updateParsing = (id, separator) => {
        const form = formsGestion.forms[id];
        servicesGestion.papaParsing(id, separator)
        .then(parsingData => {
            const requestCost = parsingData.totalLignes * form.data.cost;
            creditsGestion.updateRequiredCredits = {id, value: requestCost, operation: 'update'};
            form.parsingData = parsingData;
            form.updateInputsArea();
        })
        .catch(error => {
            creditsGestion.updateRequiredCredits = {id, value: 0, operation: 'update'};
            form.parsingData = undefined;
            form.updateInputsArea();
            flashsGestion.callFlash('Could not process your file, please try with another separator or file.', 'error');
        });
    };
/* ========= Mise à jour d'une requete ===========*/
    const updateRequest = (requestName, id) => {
        const form = formsGestion.forms[id];
            if(requestName !== form.requestName){
                form.updateForm(requestName);
                    if(form.readyToSubmit === undefined) updateParsing(id);
                    else {
                        const requestCost = form.parsingData.totalLignes * form.data.cost;
                        creditsGestion.updateRequiredCredits = {id, value: requestCost, operation: 'update'};
                        form.updateInputsArea();
                    };
            };
    };
/* ========= Mise à jour du séparateur ===========*/
    const updateSeparator = (event, id) => {
        const newSeparator = event.target.value;
        const form = formsGestion.forms[id];

        if(newSeparator !== form.separator) {
            form.separator = newSeparator;
            updateParsing(id, newSeparator);
        };
    };
/* ========= Mise à jour de la valeur if file as header ===========*/
    const updateHeaderValue = (event, id) => {
        const withHeader = event.target.checked;
        const form = formsGestion.forms[id];
        const numberOfLines = form.parsingData.totalLignes - (withHeader ? 1 : -1);
        creditsGestion.updateRequiredCredits = {id, value: (numberOfLines * form.data.cost), operation: 'update'};
        form.parsingData.totalLignes = numberOfLines;
        form.updateInputsOptions(withHeader);
        form.updateCostIndicator("required");
        form.updateSubmitSection();
    };
/* ======== Suppression d'une requete ===========*/
    const deleteRequest  = function(){
        const {files, dropzoneComponent} = dropzoneGestion;
        if(files[this.id]) {
            dropzoneComponent.removeFile(files[this.id]);
            delete files[this.id];
        };
        creditsGestion.updateRequiredCredits = {id: this.id, operation: 'delete'};
        selectsGestion.disableSelect(this.id);
        this.deleteForm();
        if(!Object.keys(formsGestion.forms).length) hideModal(modalFormat);
    };


/* ========= Validation des forms ===========*/
    let errorsNumber, formsNumber;
    const submitForms = (e) => {
        e.preventDefault();
        const {forms} = formsGestion;
        const formsAddError = formsGestion.submitForm();
        if(formsAddError){
            const target = formsAddError.find(el => !false);
            formatOverflow.scrollTo(0, forms[target].componentsDom.inputsArea.offsetTop);
        }else{
            formsNumber = Object.keys(forms).length;
            errorsNumber = 0;
            notEnoughNumber = 0;
            const infoCredits = creditsGestion.haveEnough;
            removeClass(loadingDom, 'hide');
            addClass(notLoadingDom, 'hide');
            hideModal(modalFormat);
            tablesGestion.createTablesElements();
            if(Object.keys(forms).length > 1) removeClass(tabpanelSection, 'hide');
            else addClass(tabpanelSection, 'hide');
            Object.keys(forms).forEach((id, index) => {
              let sliceNumber;
              if(!infoCredits.filesNotUsed.includes(id)){
                if(id === infoCredits.fileSlice?.id){
                    sliceNumber = infoCredits.fileSlice.remainingCredits / forms[id].data.cost;
                };
                //function papaParse
                servicesGestion.papaParsingFinal(id, sliceNumber)
                .then(csv => {
                    // traitement api
                    apiGestion.batch(id, csv)
                    .then(json =>  {
                    //création tableau
                    tablesGestion.tables[id].insertTable(json, sliceNumber);
                    removeClass(arraySection, 'hide');
                    addClass(dropzoneSection, 'hide');
                    removeClass(downloadAllButton, 'hide');
                    //envoi pour unparse
                    servicesGestion.papaUnparse(id, json)
                    .then(blob => tablesGestion.tables[id].updateDownloadLink(blob))
                    .catch(error => treatmentError(id, error));
                    })
                    .catch(error => treatmentError(id, error))
                })
                .catch(error => treatmentError(id, error))
              }else{
                treatmentError(id);
              };
            });
        };
    };
/* ========= Gestion des erreurs durant le traitement ===========*/
    const treatmentError = (id, error) => {
        if(error) {
            console.log('Error ====> ', error);
            errorsNumber++;
            flashsGestion.callFlash(`We have a problem with your file ${dropzoneGestion.files[id].name}.`, 'error');
        }else {
            notEnoughNumber++;
        };
        if(formsNumber - errorsNumber  - notEnoughNumber < 1) addClass(downloadAllButton, 'hide');
        tablesGestion.tables[id].updateError(error);
        removeClass(arraySection, 'hide');
        addClass(dropzoneSection, 'hide');
    };
/* ========= Télécharger l'ensemble des fichiers traités ===========*/    
    const downloadAll = () => {
        bySelector('.download-link', 'all').forEach(link => link.click());
    };
return {storageIsUpdate, valideDropzone, updateRequest, updateSeparator, updateHeaderValue, 
    deleteRequest, submitForms, downloadAll};
})();
// ACTIONS
const actionsGestion =
(function(){
const {byId, addEvent, hideModal} = domGestion;
const {storageIsUpdate, valideDropzone, updateRequest, updateSeparator, 
    updateHeaderValue, deleteRequest, submitForms, downloadAll} = dispatcher;
/* ========= TRY BUTTON ===========*/
    addEvent(byId('try'), "click", () => window.scrollTo(0, byId('dropzone').getBoundingClientRect().top + window.scrollY));
/* ========= DROPZONE CLICK ===========*/ 
    addEvent(byId('dropzone-input'), 'click', ()=> dropzone.click()); //Activer input lors d'un click sur la dropzone
/* ========= CLOSE MODAL ===========*/
    document.querySelectorAll('.modal').forEach( el => {
        addEvent(el.querySelector('.close-modal'),'click', () => hideModal(el));
        addEvent(el.querySelector('.close-button'),'click', () => hideModal(el));
    });
 /* ========= LOCAL STORAGE ===========*/
    window.addEventListener('storage', storageIsUpdate);
/* ========= DROPZONE ===========*/
    addEvent(byId('validate-drop'), "click", valideDropzone);
/* ========= FORMS ===========*/
    addEvent(byId('modal-format-fieldset'), "submit", submitForms);
/* ========= TABLES ===========*/
    window.addEventListener('resize', tablesGestion.showHideArrows);
    addEvent(byId('arrow-next'), 'click', tablesGestion.moveTabPanels.bind({direction: 'next'}));
    addEvent(byId('arrow-prev'), 'click', tablesGestion.moveTabPanels.bind({direction: 'prev'}));
    addEvent(byId('download-all-button'), 'click', downloadAll); 
/* ================================================================================================
                            FONCTIONS PUBLIQUES DE ACTIONS
==================================================================================================*/
/* ========= FORMS ===========*/
    const requestInputListener = id => selectsGestion.activateSelect(id, updateRequest);
    const separatorInputListener = (separatorInput, id) => addEvent(separatorInput, "change", (event) => updateSeparator(event, id));
    const headerInputListener = id => addEvent(byId(`checkbox-header-${id}`), "change", (event) => updateHeaderValue(event, id));
    const deleteButtonListener = (form, properties) => addEvent(form.querySelector('.delete'), "click", deleteRequest.bind(properties));
/* ========= TABLES ===========*/
    const tablePanelListener = clickTarget => addEvent(clickTarget, "click", tablesGestion.newActiveTable);
    return {requestInputListener, separatorInputListener, headerInputListener, deleteButtonListener, tablePanelListener}
})();
