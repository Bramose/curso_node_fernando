require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listadoLugares, listadoHistorial } = require("../05-clima-app/helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('colors');

// console.log(process.env);

const main = async() => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.cuidad(termino);
                const id = await listadoLugares(lugares);
                if (id === '0') continue;
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

                await busquedas.showWather(lugarSeleccionado);

                break;
            case 2:
                const idd = await listadoHistorial(busquedas.historial);
                if (idd === '0') continue;
                const selectedPlace = busquedas.historial.find(place => place.id === idd);

                await busquedas.showWather(selectedPlace);

                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();