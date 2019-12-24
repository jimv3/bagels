export const getSecretNumber = () => {
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let num = ''
    for (let i = 0; i < 3; i++) {
        let choice = Math.floor(Math.random() * numbers.length)
        num += numbers[choice]
        numbers.splice(choice, 1)
    }

    return num
}
