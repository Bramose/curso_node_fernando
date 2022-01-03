// Un número primo es un número natural mayor que 1 que tiene únicamente dos divisores positivos distintos:
// él mismo y el 1.
const number = 10

const isPrime = (number = 0) => {
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            return false
        }
    }
    return true
}

console.log(`El ${number}`,isPrime(number) ? 'es primo' : 'no es primo' )