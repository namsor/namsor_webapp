
const actionsGestion =
(function(){

/* ================================================================================================
                                        ACTIONS = EVENT PRINCIPAUX
==================================================================================================*/

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