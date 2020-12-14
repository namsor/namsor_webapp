
const flashsGestion =
(function(){


/* ================================================================================================
                                             FLASH
==================================================================================================*/

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
                    <img src="./public/media/img/${this.icon}.png" />
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