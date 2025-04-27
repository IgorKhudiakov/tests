class ColorfulButton {
    constructor(buttonElement) {
        this.element = buttonElement
        this.element.classList.add('colorful-button')
        // this.element.addEventListener('click', this.onClickHandler);
        this.element.addEventListener('click', event => this.onClickHandler(event.target));
    }

    // onClickHandler() {
    async onClickHandler(elem) {
        // this.element.transition = 'color 0.3s ease-out, background-color 0.3s ease-out'
        elem.style.transition = 'color 0.3s ease-out, background-color 0.3s ease-out'

        // this.element.color = this.generateRandomColor()
        elem.style.color = this.generateRandomColor()
        
        // this.element.backgroundColor = this.generateRandomColor()
        elem.style.backgroundColor = this.generateRandomColor()
        
        // Следующее действие я считаю избыточным, да, на странице код после нажатия
        // на кнопку будет "чистеньким", но удалять параметр, который влияет
        // на переход стилей из одного состояния в другое нет смысла
        // await sleep(300)
        await this.sleep(300)
        elem.style.transition = ''
    }

    async sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }

    generateRandomColor() {
        const rgb = [
            this.generateRandomInt(0, 255),
            this.generateRandomInt(0, 255),
            this.generateRandomInt(0, 255),
        ]

        // return 'rgb(${rgb.join()})'
        return `rgb(${rgb.join()})`
    }

    generateRandomInt(start, end) {
        return Math.round(Math.random() * end + start)
    }
}

const buttons = document.querySelectorAll('button')
for (const button of buttons) {
    new ColorfulButton(button)
}