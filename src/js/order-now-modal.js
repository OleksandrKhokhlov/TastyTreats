import { testyTreatsAPI } from './tasty-treatsAPI';

const testy = new testyTreatsAPI();

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
  const { name, tel, email, comment } = refs.forma;
  if (comment.value.trim() === '') {
    const result = {
      name: name.value,
      phone: tel.value,
      email: email.value,
      comment: 'comment',
    };
    testy.addOrder(result);
    return result;
  }
  const result = {
    name: name.value,
    phone: tel.value,
    email: email.value,
    comment: comment.value,
  };
  testy.addOrder(result);
  refs.forma.reset();
  closeModalClose();
});

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
