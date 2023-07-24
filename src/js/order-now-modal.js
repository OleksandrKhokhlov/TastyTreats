const refss = {
  openModalBtn: document.querySelector('.shop-btn'),
  //   openModalBtnHero: document.querySelector('.btn-hero'),
  closeModalBtn: document.querySelector('.order-modal-close-btn'),
  backdrop: document.querySelector('.backdrop-order'),
  modal: document.querySelector('.modal-order'),
  forma: document.querySelector('.modal-form-order'),
  input: document.querySelectorAll('.input-js'),
};
try {
  refss.openModalBtnHero.addEventListener('click', openModalOpen);
} catch (error) {}

refss.openModalBtn.addEventListener('click', openModalOpen);
refss.closeModalBtn.addEventListener('click', closeModalClose);
refss.backdrop.addEventListener('click', clickBackdropClick);

refss.forma.addEventListener('submit', sendOrder);
function sendOrder(e) {
  e.preventDefault();
  const { name, tel, email, comment } = e.currentTarget;
  const result = {
    name: name.value,
    tel: tel.value,
    email: email.value,
    comment: comment.value,
  };

  console.log(result);
  e.currentTarget.reset();
  closeModalClose();
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
  document.body.classList.remove('overflowHidden');
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
