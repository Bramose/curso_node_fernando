// Se necesita una funcion para aplanar un arreglo
const arr = [[1, 2], [[3, 4]], [1, []]]
const flatten = arr => arr.reduce((acc, el) => acc.concat(el), [])
console.log(flatten(arr))
