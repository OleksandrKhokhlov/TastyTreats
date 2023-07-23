(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

const themeSwitchMobile = document.getElementById('themeSwitchMobile');
const themeSwitchTablet = document.getElementById('themeSwitchTablet');
const body = document.body;

function toggleTheme() {
  const isMobileChecked = themeSwitchMobile.checked;
  const isTabletPCChecked = themeSwitchTablet.checked;

  // if (isMobileChecked || isTabletPCChecked) {
  //   body.classList.add('dark-theme');
  // } else {
  //   body.classList.remove('dark-theme');
  // }
}

themeSwitchMobile.addEventListener('change', toggleTheme);
themeSwitchTablet.addEventListener('change', toggleTheme);
