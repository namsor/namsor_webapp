const dispatcher =
(function(){

/* ================================================================================================
                                        DISPATCHER
==================================================================================================*/


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


/* ================================================================================================
                                        LOCAL STORAGE
==================================================================================================*/

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



/* ================================================================================================
                                            DROPZONE
==================================================================================================*/
    
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
        



/* ================================================================================================
                                            FORMS
==================================================================================================*/

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


/* ========= Suppression d'une requete ===========*/
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