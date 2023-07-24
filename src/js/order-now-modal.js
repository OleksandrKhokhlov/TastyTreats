const refs = {
  openModalBtns: document.querySelectorAll('.shop-btn'),
  closeModalBtn: document.querySelector('.order-modal-close-btn'),
  backdrop: document.querySelector('.backdrop-order'),
  modal: document.querySelector('.modal-order'),
  forma: document.querySelector('.modal-form-order'),
  input: document.querySelectorAll('.input-js'),
};

refs.openModalBtns.forEach(btn => {
  btn.addEventListener('click', openModalOpen);
});

refs.closeModalBtn.addEventListener('click', closeModalClose);
refs.backdrop.addEventListener('click', clickBackdropClick);

refs.forma.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateFormAndShowAlert()) {
    const { name, tel, email, comment } = refs.forma;
    const result = {
      name: name.value,
      tel: tel.value,
      email: email.value,
      comment: comment.value,
    };
    console.log(result);
    refs.forma.reset();
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
  refs.backdrop.classList.add('active');
  refs.modal.classList.add('active');
}

function closeModalClose() {
  document.body.classList.remove('overflowHidden');
  window.removeEventListener('keydown', onEscPress);
  refs.backdrop.classList.remove('active');
  refs.modal.classList.remove('active');
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
