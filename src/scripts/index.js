import 'regenerator-runtime'; /* for async await transpile */
import '@fortawesome/fontawesome-free/js/all';
import './views/component/navigation';
import './views/component/header-element';
import './views/component/footer-element';
import { nanoid } from 'nanoid';
import App from './views/app';
import IncomeCategoryIdb from './data/idb/income-category-idb';

const app = new App();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

document.querySelector('header nav').innerHTML = '<nav-bar></nav-bar>';

// Debug API
async function testAPI() {
  // const category = {
  //   _id: nanoid(16),
  //   created_at: new Date().toISOString(),
  //   updated_at: new Date().toISOString(),
  //   title: 'Hadiah',
  // };

  // await IncomeCategoryIdb.putData(category);

  console.log(await IncomeCategoryIdb.getAllData());
}

testAPI();
