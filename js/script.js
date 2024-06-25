const btnCb = document.querySelector('.btn-cb');
const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');
const closeIcon = document.querySelector('.close-icon');
const form = document.querySelector('.form-reg');
const phoneInput = document.querySelector('.phone');
const errorPhone = document.querySelector('.error-phone');
const consent = document.querySelector('.privacy-notice');
const consentCheckbox = document.querySelector('.consent');

btnCb.addEventListener('click', () => {
  popupWrapper.style.display = 'flex';
});

closeIcon.addEventListener('click', () => {
  popupWrapper.style.display = 'none';
});

popupWrapper.addEventListener('click', (event) => {
  if (!popup.contains(event.target)) {
    popupWrapper.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "ru",
    autoHideDialCode: false,
    nationalMode: false,
    separateDialCode: true,
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorPhone.innerHTML = '';
    consent.style.border = ''

    if (!iti.isValidNumber()) {
      errorPhone.innerHTML = 'введите корректный телефон';
      return;
    }

    if (!consentCheckbox.checked) {
      consent.style.border = '1px solid #ff0000'
      return;
    }

    const formData = new FormData(form);
    const phoneNumber = iti.getNumber();
    formData.set('phone', phoneNumber);

    fetch('http://localhost:8000/process_form.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Ответ от сервера:', data);
      form.reset();
    })
    consentCheckbox.checked = false;
    popupWrapper.style.display = 'none';
  });
});
