import 'regenerator-runtime'; /* for async await transpile */
import '@fortawesome/fontawesome-free/js/all';
import './views/component/navigation';
import './views/component/header-element';
import './views/component/footer-element';
import './views/component/loading-bar';
import App from './views/app';

const app = new App();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

document.querySelector('header nav').innerHTML = '<nav-bar></nav-bar>';
