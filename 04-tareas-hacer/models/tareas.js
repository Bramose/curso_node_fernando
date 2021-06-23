const Tarea = require('./tarea');
require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listado(listado) {
        let tareas = '\n';
        listado.forEach((tarea, i) => {

            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ?
                `Completada en ${completadoEn}`.green :
                'Pendiente'.red;
            console.log();
            console.log(`${ idx } ${desc} :: ${estado}`);
        })

        return tareas;
    }

    listarTareas() {
        this.listado(this.listadoArr);
    }

    listarTareasCompletadas() {
        let tareasCompletas = this.listadoArr.filter(tarea => tarea.completadoEn);
        this.listado(tareasCompletas);
    }

    listarTareasPendientes() {
        let tareasPendientes = this.listadoArr.filter(tarea => !tarea.completadoEn);
        this.listado(tareasPendientes);
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;