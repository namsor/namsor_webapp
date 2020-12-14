/* ================================================================================================
                                        FONCTIONS UTILITAIRES
==================================================================================================*/

//Générer string aléatoire
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


