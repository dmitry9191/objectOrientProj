export default class ShowInfo {
    constructor(container) {
        this.container = document.querySelectorAll(container);
    }

    showMessage() {
        this.container.forEach(item => {
            item.setAttribute('data-show', 'false');

            item.querySelector('.plus').addEventListener('click', () => {
                if (item.getAttribute('data-show') === 'false') {
                    item.nextElementSibling.classList.remove('fadeOutUp');
                    item.nextElementSibling.classList.add('animated', 'fadeInDown');
                    item.nextElementSibling.style.display = 'block';
                    item.setAttribute('data-show', 'true');
                } else {
                    item.nextElementSibling.classList.add('animated', 'fadeOutUp');
                    item.nextElementSibling.classList.remove('fadeInDown');
                    setTimeout(() => {
                        item.nextElementSibling.style.display = 'none';
                    }, 0);
                    item.setAttribute('data-show', 'false');

                }
            });
        }); 
    }

    init() {
        this.showMessage();
    }
}