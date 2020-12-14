

/* ================================================================================================
                                        MANIPULATION DU DOM
==================================================================================================*/

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