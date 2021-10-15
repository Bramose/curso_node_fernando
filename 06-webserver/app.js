const express = require('express')
const hbs = require('hbs')
const app = express()
require('dotenv').config()
const port = process.env.PORT

// Handlebars
app.set('view engine', 'hbs')
hbs.registerPartials( __dirname + '/views/partials' )

app.use( express.static('public') )
 
// app.get('/', function (req, res) {
//   res.send('Home page')
// })

app.get('/', (req, res) => {
    res.render('home', {
        nombre: "Sergio Bravo Montoya",
        titulo: "Curso de node"
    })
})


app.get('/generic', (req, res) => {
    // res.sendFile( __dirname + '/public/generic.html' )   
    res.render('generic',{
        nombre: "Sergio Bravo Montoya",
        titulo: "Curso de node"
    })
})
app.get('/elements', (req, res) => {
    // res.sendFile( __dirname + '/public/elements.html' )    
    res.render('elements',{
        nombre: "Sergio Bravo Montoya",
        titulo: "Curso de node"
    })
})

// app.get('/hola-mundo', (req, res) => {
//     res.send('Hola mundo en su respectiva ruta')
// })

app.get('*', (req, res) => {
    // res.send('404 | Page not found')
    res.sendFile( __dirname + '/public/404.html' )
})
 
app.listen(port, () => {
    console.log(`Example app listening at http:localhost:${port}`)
})