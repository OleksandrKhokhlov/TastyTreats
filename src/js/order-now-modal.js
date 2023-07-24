const refss = {
  openModalBtns: document.querySelectorAll('.shop-btn'),
  closeModalBtn: document.querySelector('.order-modal-close-btn'),
  backdrop: document.querySelector('.backdrop-order'),
  modal: document.querySelector('.modal-order'),
  forma: document.querySelector('.modal-form-order'),
  input: document.querySelectorAll('.input-js'),
};

refss.openModalBtns.forEach(btn => {
  btn.addEventListener('click', openModalOpen);
});

refss.closeModalBtn.addEventListener('click', closeModalClose);
refss.backdrop.addEventListener('click', clickBackdropClick);

refss.forma.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateFormAndShowAlert()) {
    const { name, tel, email, comment } = refss.forma.elements;
    const result = {
      name: name.value,
      tel: tel.value,
      email: email.value,
      comment: comment.value,
    };
    console.log(result);

    refss.input.forEach(input => {
      input.value = '';
      input.classList.remove('valid', 'invalid');
    });

    closeModalClose();
  }
});

function validateInput(input) {
  if (input.checkValidity()) {
    input.classList.add('valid');
    input.classList.remove('invalid');
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
  }
}

function validateFormAndShowAlert() {
  const inputFields = document.querySelectorAll('.input-js');
  let isFormValid = true;

  inputFields.forEach(input => {
    validateInput(input);
    if (!input.checkValidity()) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    alert('Please fill in all the fields correctly.');
  }

  return isFormValid;
}

function openModalOpen() {
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('overflowHidden');
  refss.backdrop.classList.add('active');
  refss.modal.classList.add('active');
}

function closeModalClose() {
  document.body.classList.remove('overflowHidden');
  window.removeEventListener('keydown', onEscPress);
  refss.backdrop.classList.remove('active');
  refss.modal.classList.remove('active');
}

function clickBackdropClick(e) {
  if (e.currentTarget === e.target) {
    closeModalClose();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    closeModalClose();
  }
}
