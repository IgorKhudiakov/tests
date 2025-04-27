/** Конвертация числа из римских цифр в число с арабскими цифрами
 * 
 * @param { null, int, string } rimNum входная строка/число 
 * @returns { string, int } возвращает сообщение об ошибке, входное число или сконвертированное число
 */
function converter(rimNum) {
    // Массив сообщений о результате выполнения операции
    let messages = [
        'Input is empty',
        'Invalid number'
    ]

    let rimNumLen = rimNum.length
    
    // Возвращает сообщение о пустом вводе
    if (rimNumLen == 0) return messages[0]
    // Возвращает "арабское" число, если на входе число из арабских цифр
    if (!isNaN(rimNum)) return rimNum

    // Объект-шаблон для конвертации
    const convPattern = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    // Массив ключей (римских цифр) для проверки на валидность ввода
    const patternArr = Object.keys(convPattern)
    
    // Вспомогательные переменные:
    var result = 0
    let prewKey = ''    // предыдущий символ
    var operation = 0   // последняя операция между двумя символами (справа налево): 
        // 1, если было повышение (например CX, XV, XI, VI)
        // 0, если символы не изменились (CC, XX, VV, II)
        // -1, если было понижение (XC, XL, IX, IV)
    // счётчик повторений символов
    var repChar = 0

    // Повышаем регистр входного числа для сопоставления символов с ключами
    rimNum = rimNum.toUpperCase()

    // Итерация начинается с конца входных данных посимвольно
    // Строки в JS - абстрактные массивы, конвертация входной строки в массив не требуется...
    for (let i = rimNumLen - 1; i >= 0; i--) {
        // Для сокращения кода введена промежуточная переменная, содержит обрабатываемый символ
        let el = rimNum[i]

        // Валидация: число строго должно состоять из римских цифр,
        // в противном случае возвращает сообщение "Некорректное число"
        if (!patternArr.includes(el)) return messages[1]

        if (rimNumLen == 1) return convPattern[el]

        // Валидация: вычитаемый символ должен быть не далее, чем второй ближайший символ к старшему символу
        // VX, VL, LD и т.д. - некорректно
        let indexDiff = patternArr.findIndex(e => e == prewKey) - patternArr.findIndex(e => e == el)
        if (prewKey != '' && indexDiff > 2) return messages[1]

        // Конвертируем число согласно шаблону и правилам

        var equ = convPattern[el] == convPattern[prewKey]
        if (prewKey == '' || convPattern[el] > convPattern[prewKey] || equ && operation >= 0) {
            // Валидация: число не должно содержать более 3 символов одного значения
            if (equ && repChar > 1) return messages[1]

            result += convPattern[el]
            if (equ) {
                operation = 0
                repChar++
            } else {
                operation = 1
                repChar = 0
            }
        } else {
            // Валидация: количество вычитаемых символов должно быть 1
            // IIX, XXL, XXC и т.д. - некорректно
            if (operation < 1) return messages[1]
            // Валидация: вычитаемый символ должен быть I/X/C, то есть кратным степени 10
            if (!['I', 'X', 'C'].includes(el)) return messages[1]

            result -= convPattern[el]
            operation = -1
            repChar = 0
        }
        
        prewKey = el
    }

    return result
}