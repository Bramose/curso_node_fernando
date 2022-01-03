const text = "Sergio Non elit sit cupidatat aute pariatur dolor deserunt esse esse. Nulla officia sunt sergio do veniam laboris sergio in aliquip irure ipsum. Magna cillum nostrud ullamco magna laborum. Occaecat et ad culpa amet. Est do irure enim tempor nulla id velit eiusmod ea nostrud velit. Culpa aliqua irure dolore mollit tempor duis nisi proident ullamco. Sunt quis minim excepteur sint eu voluptate duis. Nostrud mollit dolor eu culpa ea laborum ad. Qui ipsum sint ipsum sit proident consequat esse excepteur cupidatat cillum. Sint nostrud qui amet et esse elit proident. Mollit ex esse dolore quis minim id. Excepteur pariatur deserunt quis velit incididunt deserunt sit exercitation minim reprehenderit adipisicing."

const repeated = str => {
    const lowered = str.toLowerCase().replace(/\.|,|!/g, '')
    const splitted = lowered.split(' ')
    const reduced = splitted.reduce((acc, el) => {
        if (acc[el]) {
            acc[el]++
        } else {
            acc[el] = 1
        }
        return acc
    }, {})

    // console.log(Object.entries(reduced))

    return {
        dictionary: reduced,
        wordMoreRepeat: Object.entries(reduced).reduce((acc,el) => acc[1] > el[1] ? acc : el)
    }
}

console.log(repeated(text))