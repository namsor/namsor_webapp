const selectsGestion = 
(() => {

const {byId, addEvent, removeClass, addClass, removeEvent} = domGestion; //import du modules dom Gestion

/* ================================================================================================
                                        GESTION DES INPUTS SELECT
==================================================================================================*/

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


/* ================================================================================================
                            FONCTIONS PUBLIQUES  DE GESTION DES INPUTS SELECT
==================================================================================================*/


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