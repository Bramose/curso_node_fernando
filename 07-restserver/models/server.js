const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const { validarJSON } = require('../middlewares/validar-json')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/users'
        this.authPath = '/api/auth'
        // Conectar a base de datos
        this.conectarDB()
        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Directorio Público
        this.app.use(express.static('public'))
        
        // Validamos que sea un json valido
        this.app.use(validarJSON)
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servicio corriendo en el puerto", this.port)
        })
    }
}

module.exports = Server