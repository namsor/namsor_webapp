const formsGestion =
    (function () {

        //import des modules
        const { byId, bySelector, addClass, removeClass } = domGestion;
        const { requestStructure } = servicesGestion;
        const { callFlash } = flashsGestion;

        /* ================================================================================================
                                                GESTION DU FORMULAIRE
        ==================================================================================================*/

        // ================= Valeurs communes à tous les Forms (instances de Form) ================//

        const loader = "<img class='loader' src='./public/media/img/loader.svg' alt='loader'/>";
        const separators = ["auto", ",", ";", ".", ":"]
        const parsingError = "<p class='parsing-error'>Unable to process requested file, please try again with another separator or file.</p>";
        const DomStaticElement = {
            notAllProcessingMessage: byId('not-all-processing-message'),
            parsingErrorMessage: byId('parsing-error-message'),
            notEnoughCreditsDiv: byId('not-enough-credits-div'),
            enoughCreditsDiv: byId('enough-credits-div'),
            formArea: byId('form-area'),
            totalRequiredCredits: bySelector('.total-required-credits', 'all'),
            avaibleCredits: bySelector('.avaible-credits', 'all'),
            neededCredits: bySelector('.needed-credits', 'all'),
        };


        let structure = {}; //Objet à remplir avec les données (structure des données) des routes => la clé est le nom de la route
        let selectInput = "";
        (() => {
            requestStructure()
                .then(res => {
                    structure = res;
                    const names = Object.keys(res);
                    selectInput =
                        `<input class="chosen-value" type="text" value="" placeholder="Choose a type of process &#8681;">
                    <ul class="value-list">
                        ${names.map(name => `<li>${name}</li>`).join("")}
                    </ul>`
                })
                .catch(error => callFlash(`We are having connection issues, please try again later.`, "error"))
        })()



        /* ================================================================================================
                                            CONSTRUCTEUR DU COMPOSANT FORM
        ==================================================================================================*/

        function Form(file) {
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
            this.inputsValue = { cols: {}, colsEx: {} };
        };


        // ============================= FORM ========================//

        //------------- Création du dom -------------//
        Form.prototype.createForm = function () {
            return (
                `<div class="form" id="form-${this.id}">
        <div class="flex first-line">
            <h3>${this.fileName} <span class="secondary">${this.fileSize}</span></h3>
            <img class='delete' src='./public/media/img/trash-bin.png' alt='delete' />
        </div>
        <div class="select-input" id="select-input-${this.id}">
            ${selectInput}
        </div>
        <p class="description-title">Description :</p>
        <p class="cost">Choose a type of process to estimate cost.</p>
        <p class="summary">Choose a type of process to get more information.</p>
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
        Form.prototype.insertForm = function () {

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
        Form.prototype.deleteForm = function () {
            const form = forms[this.id]
            this.componentsDom.form.remove();
            delete forms[this.id];
            form.updateSubmitSection();
        };



        //------------- Modification du composant -------------//
        Form.prototype.updateForm = function (name) {
            const { cost, summary, inputsArea, separatorInput } = this.componentsDom;

            if (this.requestName !== name) {
                this.data = structure[name];
                this.requestName = name;
                cost.innerHTML = `Use ${this.data.cost} credit(s) per line`;
                summary.innerHTML = this.data.summary;
                inputsArea.innerHTML = loader;
            };

            if (separatorInput.disabled) {
                separatorInput.disabled = false;
                actionsGestion.separatorInputListener(separatorInput, this.id);
            };
        };



        // ============================= SOUS COMPOSANT ========================//

        //------------------------- Création du DOM ------------------//
        Form.prototype.createInputsArea = function () {
            const requiredCredits = creditsGestion.requiredCredits[this.id];
            const options = this.parsingData.options;
            return `
    <p class="inputs-area-title">Data distribution :</p>
    <div>
        <input type="checkbox" id="checkbox-header-${this.id}" name="checkbox-header">
        <label class="checkbox-header" for="checkbox-header-${this.id}">the document contains a header</label>
    </div>
    <div class="select-area">
    ${Object.keys(this.data.request.personalNames).map(field => {
                const isRequired = this.data.required.includes(field);
                return (
                    `<div class="input">
            <label for="${field}">Select the ${isRequired ? field + "*" : field + " (optional)"}:</label>
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
                )
            }
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
        Form.prototype.updateInputsArea = function () {
            const { form, inputsArea } = this.componentsDom;
            if (this.parsingData) {
                this.readyToSubmit = true;
                inputsArea.innerHTML = this.createInputsArea();

                this.componentsDom = {
                    ...this.componentsDom,
                    inputs: form.querySelectorAll('.input'),
                    costIndicator: form.querySelector('.cost-indicator'),
                };

                actionsGestion.headerInputListener(this.id);

            } else {
                this.readyToSubmit = false;
                inputsArea.innerHTML = parsingError;
            };

            this.updateSubmitSection();
        };



        //---------------------- Mise à jour des options des inputs (selects colonnes) ------------------//
        Form.prototype.updateInputsOptions = function (withHeader) {
            const { inputsArea } = this.componentsDom;
            this.checkboxHeader = withHeader ? "withHeader" : "withoutHeader";
            const updateSelects = el => {
                if (el.classList.contains(this.checkboxHeader)) {
                    el.required = this.data.required.includes(el.name);
                    removeClass(el, 'hide');
                } else {
                    el.required = false;
                    addClass(el, 'hide');
                };
            };
            inputsArea.querySelectorAll('.select').forEach(updateSelects);
        };



        //-------------------- Mise à jour du sous composant Cost Indicator ------------------//
        Form.prototype.updateCostIndicator = function (type) {
            const { costIndicator } = this.componentsDom;
            const requiredCredits = creditsGestion.requiredCredits[this.id];
            if (type === "required") {
                costIndicator.querySelector('.required-credits').textContent = `${requiredCredits} credits are required for this request`;
            } else {
                costIndicator.querySelector('.avaible-credits').textContent = `${creditsGestion.avaibleCredits} avaible credits`;
            }
            costIndicator.classList = `cost-indicator ${requiredCredits <= creditsGestion.avaibleCredits ? "enough" : "not-enough"}`;
        };



        //------------------------- Préparation du submit ------------------//
        Form.prototype.updateSubmitSection = function () {
            const formsAreReady = Object.values(forms).every(form => form.readyToSubmit !== undefined);
            const formsAreError = Object.values(forms).some(form => !form.readyToSubmit);

            const { notAllProcessingMessage, parsingErrorMessage, notEnoughCreditsDiv,
                enoughCreditsDiv, totalRequiredCredits, avaibleCredits, neededCredits } = DomStaticElement;

            if (formsAreReady) {
                if (formsAreError) {
                    addClass(notAllProcessingMessage, "hide");
                    removeClass(parsingErrorMessage, "hide");
                    addClass(notEnoughCreditsDiv, 'hide');
                    addClass(enoughCreditsDiv, 'hide');

                } else {
                    const creditsInfo = creditsGestion.haveEnough;

                    totalRequiredCredits.forEach(el => el.textContent = creditsInfo.required);
                    avaibleCredits.forEach(el => el.textContent = creditsInfo.avaible);
                    neededCredits.forEach(el => el.textContent = ((creditsInfo.avaible - creditsInfo.required) * -1));

                    if (creditsInfo.haveEnough) {
                        addClass(notAllProcessingMessage, "hide");
                        addClass(parsingErrorMessage, "hide");
                        addClass(notEnoughCreditsDiv, 'hide');
                        removeClass(enoughCreditsDiv, 'hide');
                    } else {
                        addClass(notAllProcessingMessage, "hide");
                        addClass(parsingErrorMessage, "hide");
                        removeClass(notEnoughCreditsDiv, 'hide');
                        addClass(enoughCreditsDiv, 'hide');
                    };
                };
            } else {
                removeClass(notAllProcessingMessage, "hide");
                addClass(parsingErrorMessage, "hide");
                addClass(notEnoughCreditsDiv, 'hide');
                addClass(enoughCreditsDiv, 'hide');
            }
        };


        //------------------------- Submit du form ------------------//
        Form.prototype.submitForm = function () {
            const { inputsArea } = this.componentsDom;
            const inputs = inputsArea.querySelectorAll(`.select.${this.checkboxHeader}`);
            const selectedValue = [];
            let error;
            inputs.forEach(input => {
                const textContent = input.name !== "id" ? input.options[parseInt(input.value) + 1].outerText : isNaN(input.value) ? input.value : input.options[parseInt(input.value) + 1].outerText;
                if (selectedValue.includes(input.value)) {
                    addClass(input.closest('.input'), "error");
                    error = this.id;
                } else {
                    removeClass(input, "error");
                    selectedValue.push(input.value);
                    this.inputsValue.cols[input.name] = input.value;
                    this.inputsValue.colsEx[input.name] = textContent;
                    error = false;
                };
            });

            return error;
        };




        /* ================================================================================================
                                    FONCTIONS ET OBJETS PUBLIC DE GESTION FORMULAIRE
        ==================================================================================================*/

        /* ========= Liste des instances de Forms ===========*/
        let forms = {};


        /* ========= Création des instances forms ===========*/
        const createForm = () => {
            const { files } = dropzoneGestion;
            const filesNumber = Object.keys(files).length;
            const formsNumber = Object.keys(forms).length;

            Object.values(forms)?.forEach(form => {
                if (!files[form.id]) {
                    form.deleteForm();
                };
            });

            Object.values(files).forEach((file, index) => {
                if (!forms[file.id]) {
                    forms[file.id] = new Form(file);
                    forms[file.id].insertForm();
                    if (formsNumber && index + 1 === filesNumber) {
                        forms[file.id].updateSubmitSection();
                    }
                };
            });
        };


        /* ========= Extraction des données des forms ===========*/
        const submitForm = () => {
            const formsAddError = Object.values(forms).map(form => form.submitForm());
            if (formsAddError.some(error => error)) return formsAddError;
            else return false;
        };




        return { createForm, submitForm, forms }


    })()