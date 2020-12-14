/* ================================================================================================
                            GESTION CREDITS  = STORE (Object avec getter et setter)
==================================================================================================*/

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