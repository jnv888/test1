// Работа с кнопкой ввода email

const inputEmail = document.getElementById('sendEmail');
const sign = document.getElementById('exclamation');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener("click", () => {
    console.log('Нажали на кнопку')
    if (!inputEmail.value) {
        sign.style.backgroundColor = 'red';
        sign.style.color = 'white';
    }
    else {
        sign.style.backgroundColor = 'green';
    }
})

