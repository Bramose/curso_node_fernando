const text = 'Do geese see God'

const isPalindrome = str => {
    str = str.replace(/\s/g, '')
    const lowered = str.toLowerCase()
    const splitted = lowered.split('')
    const reversed = splitted.reverse()
    const joined = reversed.join('')
    return lowered == joined
}

console.log(`La palabra "${text}" ${ isPalindrome(text) ? 'es un' : 'no es' } palidromo`)