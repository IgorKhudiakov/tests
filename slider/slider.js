document.querySelectorAll('.slider-categories .category').forEach(el => {
    el.addEventListener('click', (e) => {
        if (!(e.target.classList.contains('active'))) {
            for (let elem of e.target.parentNode.children) {
                elem.classList.remove('active')
            }
            e.target.classList.add('active')
            let cat_id = e.target.getAttribute('data-id')
            var slider = e.target.parentNode.parentNode
            slider.querySelectorAll('.slider-images img').forEach(img => {
                img.classList.add("animate")
                img.setAttribute('style', 'opacity: 0;')
                img.setAttribute('title', e.target.innerHTML)
                img.setAttribute('data-art', img.getAttribute(`data-art-${cat_id}`))
                setTimeout(() => {
                    img.src = img.getAttribute(`data-src-${cat_id}`)
                    img.removeAttribute('style')
                }, 200)
                setTimeout(() => {
                    img.classList.remove("animate")
                }, 200)
            })
            article_update(slider, cat_id)
        }
    })
})

function article_update(slider, cat_id) {
    var article = slider.querySelector('.article')
    var current_img = slider.querySelector('.slider-images img.center')
    let current_article = current_img.getAttribute(`data-art`)
    article.innerHTML = current_article
}

function slide(id, dir) {
    var slider = document.getElementById(id)
    let category_id = slider.querySelector('.category.active').getAttribute("data-id")
    var imgs = slider.querySelectorAll('.slider-images img')

    var vis = imgs[0].checkVisibility()

    let len = imgs.length
    let transform_params = []
    for (let i = 0; i < len; i++) {
        let after_i = dir == 'right' ? ((i == 0) ? len - 1 : i - 1) : (i + 1 == len) ? 0 : i + 1
        let before_i = dir == 'left' ? ((i == 0) ? len - 1 : i - 1) : (i + 1 == len) ? 0 : i + 1
        transform_params[i] = [
            imgs[after_i].getBoundingClientRect().left + imgs[after_i].clientWidth / 2 - (imgs[i].getBoundingClientRect().left + imgs[i].clientWidth / 2), // разница центров
            vis ? imgs[after_i].clientHeight / imgs[i].clientHeight : 1,                                                     // масштаб
            imgs[before_i].getAttribute('src'),        // новый источник изображения
            imgs[before_i].getAttribute('data-art')    // новый иртикул
        ]
    }

    for (let i = 0; i < len; i++) {
        let timeout = 500
        imgs[i].setAttribute('style', `transition: ${timeout}ms all; transform: translateX(${transform_params[i][0]}px) scaleX(${transform_params[i][1]}) scaleY(${transform_params[i][1]}); ${!vis && imgs[i].classList.contains('center') ? 'opacity: 0;' : ''}`)
        imgs[i].setAttribute('data-art', transform_params[i][3])
        setTimeout(() => {
            imgs[i].removeAttribute('style')
            imgs[i].setAttribute('src', transform_params[i][2])
        }, timeout)
    }

    category_id = slider.querySelector('.category.active').getAttribute("data-id")
    article_update(slider, category_id)
}