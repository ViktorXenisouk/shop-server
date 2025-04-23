const splitPath = (path : string) : string[] => {
    const arr = path.split('/')
    const newArray = []

    for (let i = 0; i < arr.length; i++) {
        console.log('word:')
        let word = ''
        for (let j = 0; j <= i; j++) {
            word = (word + arr[j]) + (j == i ? '' : '/');
        }
        newArray.push(word)
    }
    return newArray
}

export {splitPath}