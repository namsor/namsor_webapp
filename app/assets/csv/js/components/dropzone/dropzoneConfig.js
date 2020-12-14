const dropzoneGestion = 
(function(){

const {byId, addClass, removeClass} = domGestion;

/* ================================================================================================
                                        DROPZONE GESTION
==================================================================================================*/
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
