"use strict"

// действие клика по кнопке
document.addEventListener("click", function (e) {
    const targetItem = e.target;
    if (targetItem.closest('[data-ripple]')) {

        // константы
        const button = targetItem.closest('[data-ripple]');
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
    
        // формирование элемента
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
        ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
        ripple.classList.add('ripple'); 

        // удаление существующего элемента (опционально)
        button.dataset.ripple === 'once' && button.querySelector('.ripple') ?
            button.querySelector('.ripple').remove() : null;
        
        // добавление элемента
        button.appendChild(ripple);


        const timeOut = getAnimationDuration(ripple);

        // удаление элемента
        setTimeout(() => {
            ripple ? ripple.remove() : null;

        }, timeOut);

        // функция полученик времени действия анимации
        function getAnimationDuration() {
            const aDuration = window.getComputedStyle(ripple).animationDuration;
            return aDuration.includes('ms') ?
                aDuration.replace("ms", '') : aDuration.replace("s", '') * 1000;
        }
    }
});