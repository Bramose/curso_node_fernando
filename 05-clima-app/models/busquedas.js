const fs = require('fs');

const axios = require('axios');


class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        // TODO: leer DB si existe
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    get historialCapitalizado() {
        let lugares = [];
        this.historial.forEach(lugar => {
            lugares.push(lugar.name);
        });
        return lugares;

        // Solucion de Fernando Herrera
        // return this.historial.map(lugar => {
        //     let palabras = lugar.split('');
        //     palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
        //     return palabras.join(' ');
        // })
    }

    async cuidad(lugar = '') {
        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon }
            });
            const resp = await intance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = '') {
        // TODO: No guardar duplicados
        if (this.historial.find(place => place.name === lugar.name)) return;
        this.historial.unshift(lugar);
        this.historial = this.historial.splice(0, 5);
        this.guardarDB();
    }

    async showWather(place = {}) {
        this.agregarHistorial(place);
        const clima = await this.climaLugar(place.lat, place.lng);
        console.clear()
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', place.name.green);
        console.log('Lat:', place.lat);
        console.log('Lng:', place.lng);
        console.log('Clima:', clima.desc.green);
        console.log('Temperatura:', clima.temp);
        console.log('Mínima:', clima.min);
        console.log('Máxima:', clima.max);
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports = Busquedas;