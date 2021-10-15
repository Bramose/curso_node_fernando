console.log("Hola mundo")	// Eliminar

const http = require('http')

const server = http.createServer((req, res) => {
    // res.write('Hola Mundo')
    // res.writeHead(404)
    // res.write('404 | Page not found')
    // res.writeHead(200, { 'Content-Type': 'application/json' })
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
    // res.writeHead(200, { 'Content-Type': 'application/csv' })

    res.write('Hola Mundo')
    // res.write('1, Sergio\n')
    // res.write('2, Carlos\n')
    // res.write('3, Maria\n')
    // res.write('4, Carmen\n')

    res.end()
})

const port = 3000

server.listen(port)

console.log("Escuchando el puerto", port)