export default class Form {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.inputs = document.querySelectorAll('input');
        this.message = {
            success: 'Спасибо, мы с Вами скоро свяжемся',
            failure: 'Извините, что-то пошло не так'
        };
        this.path = './assets/question.php';
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        
        return await res.text();
    }

    initMask() {
        const setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) { // полифил для старых браузеров
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'click') {
                setCursorPosition(this.value.length, this);
            }
                
            if (event.type === 'blur') {
                if (this.value.length === 2) {
                    this.value = '';
                } else if (this.value.length === matrix.length) {
                    return;
                } else {
                    setCursorPosition(this.value.length, this);
                }
            }
        }
        
    
        const inputs = document.querySelectorAll('#phone');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
            input.addEventListener('click', createMask);
        });
    }

    initForm() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);
                
                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 3000);
                    });
            });
        });
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs() {
        document.querySelectorAll('[name="email"]').forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[а-яё]/ig, '');
            });
        });
    }

    init() {
        this.checkMailInputs();
        this.initForm();
        this.initMask();
    }

}