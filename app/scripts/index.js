const DOMelements = {
    formFields: {
        number: document.querySelector('[data-form="number"]'),
        holder: document.querySelector('[data-form="holder"]'),
        month: document.querySelector('[data-form="month"]'),
        year: document.querySelector('[data-form="year"]'),
        cvv: document.querySelector('[data-form="cvv"]'),
    },
    form: document.querySelector('[data-form="form"]'),
    submit: document.querySelector('[data-form="button"]'),
    cardFront: document.querySelector('.card__front'),
    cardBack: document.querySelector('.card__back'),
    cardNumber: document.querySelector('[data-card="number"]'),
    cardHolder: document.querySelector('[data-card="holder"]'),
    cardMonth: document.querySelector('[data-card="month"]'),
    cardYear: document.querySelector('[data-card="year"]'),
    cardCVV: document.querySelector('[data-card="cvv"]'),
}

function CardForm(elements) {
    this.elements = elements;

    this.init = function() {
        this.rotate(elements);
        this.submit(elements);
        this.checkNumber(elements);
        this.checkHolder(elements);
        this.checkDate(elements.formFields.month, elements.cardMonth);
        this.checkDate(elements.formFields.year, elements.cardYear);
        this.checkCVV(elements);
    };

    this.checkNumber = function({ formFields, cardNumber }) {
        const { number } = formFields;
        number.addEventListener('input', () => {
            const value = number.value;
            if (value.length <= 16) {
                cardNumber.innerHTML = value.replace(/(.{4})/g, '$1 ');
            } else {
                number.value = value.slice(0, 16);
            }
            this.checkAllFields();
        });
    };

    this.checkHolder = function({ formFields, cardHolder }) {
        const { holder } = formFields;
        holder.addEventListener('input', () => {
            const value = holder.value;
            cardHolder.innerHTML = value;
            this.checkAllFields();
        });
        holder.addEventListener('keypress', (event) => {
            if (holder.value.split(/\s/).length > 2 || (event.keyCode > 47 && event.keyCode < 58)) {
                event.preventDefault();
            }
        });
    }

    this.checkDate = function(inputField, outputElement) {
        inputField.addEventListener('input', () => {
            outputElement.innerHTML = inputField.value;
            this.checkAllFields();
        });
    };

    this.checkCVV = function({ formFields, cardCVV }) {
        const { cvv } = formFields;
        cvv.addEventListener('input', () => {
            const value = cvv.value;
            cardCVV.innerHTML = value.slice(0, 3);
            if (value.length >= 3) {
                cvv.value = value.slice(0, 3);
                this.checkAllFields();
            }
        }); 
        cvv.addEventListener('keypress', (event) => {
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        })
    };

    this.checkAllFields = function() {
        const { formFields, submit } = this.elements;
        let valid = [];
        for (let field in formFields) {
            if ((field === 'number' && formFields[field].value.length === 16) || field !== 'number') {
                valid.push(formFields[field].value.length !== 0)
            } else {
                valid.push(false);
            }
        }
        submit.disabled = !valid.every(currentValue => currentValue === true);
    };
  
    this.submit = function() {
        const { formFields, form, submit } = this.elements;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = {
                number: `${formFields.number.value}`,
                holder: `${formFields.holder.value}`,
                expDate: `${formFields.month.value}/${formFields.year.value}`,
                cvv: `${formFields.cvv.value}`
            }
            console.log(`Send data: ${data}`);
            formFields.number.value = '';
            formFields.holder.value = '';
            formFields.month.value = '';
            formFields.year.value = '';
            formFields.cvv.value = '';
            submit.disabled = true;
        });
    };

    this.rotate = function({ formFields, cardFront, cardBack }) {
        const { cvv } = formFields;

        const rotateUp = () => {
            cardFront.style.transform = 'perspective(1000px) rotateY(-180deg)';
            cardBack.style.transform = 'perspective(1000px) rotateY(0deg)';
        };

        const rotateDown = () => {
            cardFront.style.transform = 'perspective(1000px) rotateY(0deg)';
            cardBack.style.transform = 'perspective(1000px) rotateY(180deg)';
        };

        cvv.addEventListener('mouseenter', rotateUp);
        cvv.addEventListener('mouseleave', rotateDown);
        cvv.addEventListener('focus', rotateUp);
        cvv.addEventListener('focusout', rotateDown);
    };
 }

const card = new CardForm(DOMelements);

card.init();
