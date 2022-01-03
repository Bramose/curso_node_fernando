const arr = [110,-45,100,999,3,-1000,89]
const getBiggest = (arr) => arr.reduce((acc, el) => acc > el ? acc : el)
console.log(getBiggest(arr))