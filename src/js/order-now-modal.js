import { testyTreatsAPI } from './tasty-treatsAPI';

const tasty = new testyTreatsAPI();

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
    const data = {
      name: name.value,
      tel: tel.value,
      email: email.value,
      comment: comment.value,
    };
    tasty.addOrder(data);
    refs.forma.reset();
    closeModalClose();
  }
});

function validateFormAndShowAlert() {
  const { name, tel, email } = refs.forma;

  if (!name.value.trim() || !tel.value.trim() || !email.value.trim()) {
    alert("Будь ласка, заповніть всі обов'язкові поля.");
    return false;
  }

  if (!email.value.includes('@') || !email.value.includes('.')) {
    alert('Будь ласка, введіть коректний email.');
    return false;
  }

  return true;
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
