/** Возвращает максимальное н-ное число повторяющихся символов
 *  Если самые частые символы имеют равное количество повторов,
 *  н-ным будет считаться символ, идущий по частоте после них
 * 
 * @param {*} str   входная строка
 * @param {*} place место по частоте повторений
 * @returns
 */
function getSymbolsCount(str, place) {
    if (str.length == 0) return 'Empty'
    else if (str.length == 1) return str
    
    const symbolsCount = {}

    // Разбивает строку на массив и подсчитывает количество каждых символов
    str.split('').forEach(el => {
        if (Object.keys(symbolsCount).findIndex(s => s == el) < 0) symbolsCount[el] = 1
        else symbolsCount[el] += 1
    })

    // Сортирует и переворачивает счётчики, ищет дубликаты и "забывает" про них
    let tempArr = Object.values(symbolsCount).sort().reverse()
    let tempArr2 = tempArr.reduce((result, el) => result.includes(el) ? result : [... result, el], [])

    // Проверяет, не вышла ли искомая позиция за границы массива счётчиков
    let maxNth = place >= tempArr2.length ? tempArr2[tempArr2.length - 1] : tempArr2[place - 1]
    // Ищет индекс максимального н-ного количества символов и возвращает символ
    let id = Object.values(symbolsCount).findIndex(val => val == maxNth)
    return Object.keys(symbolsCount)[id]
}