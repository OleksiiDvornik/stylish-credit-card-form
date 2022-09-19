const DOMelements = {
    formFields: {
        form: document.querySelector('[data-form="form"]'),
        number: document.querySelector('[data-form="number"]'),
        holder: document.querySelector('[data-form="holder"]'),
        month: document.querySelector('[data-form="month"]'),
        year: document.querySelector('[data-form="year"]'),
        cvv: document.querySelector('[data-form="cvv"]'),
    },
    cardFront: document.querySelector('.card__front'),
    cardBack: document.querySelector('.card__back'),
    cardNumber: document.querySelector('[data-card="number"]'),
    cardHolder: document.querySelector('[data-card="holder"]'),
    cardMonth: document.querySelector('[data-card="month"]'),
    cardYear: document.querySelector('[data-card="year"]'),
    cardCVV: document.querySelector('[data-card="cvv"]'),
}

function CardForm(elements) {

    this.init = function() {
        this.rotate(elements);
        this.submit(elements);
        this.checkNumber(elements);
    };

    this.checkNumber = function({ formFields, cardNumber }) {
        const { number } = formFields;
        number.addEventListener('input', (event) => {
            const value = number.value;
            if (value.length <= 16) {
                cardNumber.innerHTML = value.replace(/(.{4})/g, '$1 ');
            } else {
                event.preventDefault();
                number.value = value.slice(0, 16);
            }
            this.checkAllFields();
        })
    };

    this.checkAllFields = function() {

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

    this.submit = function({ formFields }) {
        const { form } = formFields;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('It works!');
        })
    };
 }

const card = new CardForm(DOMelements);

card.init();
