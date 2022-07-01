const pageRender = async (navbar, page) => {
  document.querySelector('.header-element').classList.remove('app');
  document.querySelector('main').classList.remove('app');
  document.querySelector('.footer-element').classList.remove('app');
  document.querySelector('header nav').classList.remove('app');
  document.querySelector('header-element').classList.remove('app');

  if (page) {
    document.querySelector('.header-element').classList.add(page);
    document.querySelector('main').classList.add(page);
    document.querySelector('.footer-element').classList.add(page);
    document.querySelector('header nav').classList.add(page);
    document.querySelector('header-element').classList.add(page);
  }

  const listBar = document.querySelectorAll('nav ul li');

  listBar.forEach((nav) => {
    nav.classList.remove('active');
  });

  const navActive = document.querySelector(`.${navbar}`);
  if (navActive) navActive.classList.add('active');
};

export default pageRender;
