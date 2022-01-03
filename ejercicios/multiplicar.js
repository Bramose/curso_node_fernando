const multiply = (a =  0, b = 0) => {
    let result = 0
    const positivo = Math.abs(a) == a
    for (let i = 0; i < Math.abs(a); i++) {
        result = positivo ? result + b : result - b
    }
    return result
}

console.log(multiply(10,-55))