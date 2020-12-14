/* ================================================================================================
                                        GESTION DES SERVICES
==================================================================================================*/

const servicesGestion = {
  
  //Méthode servant à récupérer le nombre de crédits
  userIsLogin: () => new Promise ((resolve, reject) => {
    let getInfoOpt = '{\"uid\":null,\"email\":\"camille@communaute.tech\",\"phoneNumber\":null,\"emailVerified\":true,\"displayName\":\"Camille Rungette\",\"photoUrl\":null,\"disabled\":false,\"firstKnownIpAddress\":null,\"providerId\":null,\"timeStamp\":0,\"verifyToken\":null,\"apiKey\":null,\"stripePerishableKey\":\"pk_live_MJCO7o8jhXkywqO9yqlSL2VE\",\"stripeCustomerId\":null,\"otherInfos\":null}';
    let getApiKeyInfo = "0cd268c1527ff3132191326cde6c06bc";
    // getInfoOpt = undefined;
    // getInfoOpt = await getInfo();
    // getApiKeyInfo = await getApiKey();

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


        // let configParse = {
        //   commentsActive : true, // will consider a line starting with "//" or "#" as comments
        //   fastModeActive : true , // parsing plus rapide mais seulement s'il n'y a pas de '"'
        // }


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