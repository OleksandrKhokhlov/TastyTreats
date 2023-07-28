const sliderTheme = document.querySelector('#themeSwitchTablet');
sliderTheme.addEventListener('change', handlerChangeTheme);

function handlerChangeTheme() {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem(
      'theme',
      document.documentElement.getAttribute('class')
    );
  }else if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem(
      'theme',
      document.documentElement.getAttribute('class')
    );
    return;
  }
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
  localStorage.setItem('theme', document.documentElement.getAttribute('class'));
}
