const { boolean } = require('yargs');
const { crearArchivo } = require('./helpers/multiplicar')
const argv = require('./config/yargs')

console.clear();

// console.log(process.argv);
// console.log(argv);

// console.log(process.argv);
// const [, , arg3 = 'base=0'] = process.argv;
// const [, base = 0] = arg3.split('=');

crearArchivo(argv.base, argv.listar)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err));