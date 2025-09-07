const hamburgerBtn = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.top-nav nav');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('nav-open');
});