// Funcion que elimina los undefined, null y 0 de un arreglo
const arr = [1, undefined, null, 0, 3, 4, -5]
const clean = (arr) => arr.reduce((acc, el) => {
    if (el) {
        acc.push(el)
    }
    return acc
}, [])
console.log(clean(arr))

