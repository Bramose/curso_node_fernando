const fs = require('fs');
require('colors');

const crearArchivo = async(base = 0, listar) => {
    try {
        let salida = '';
        let nameFile = `tabla-${base}.txt`;

        for (let i = 1; i <= 10; i++) {
            salida += `${base} x ${i} = ${base * i}\n`
        }

        if (listar) {
            console.log('================='.yellow);
            console.log('   Tabla del: '.red, base);
            console.log('================='.yellow);
            console.log(salida.grey)
        }



        fs.writeFileSync('./salida/' + nameFile, salida);

        return nameFile;
    } catch (error) {
        throw error
    }

}

module.exports = {
    crearArchivo
}