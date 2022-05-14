import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  constructor() {
    this._content = document.querySelector('#main');
  }

  async renderPage() {
    window.scrollTo({ top: 0 });
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = this.getPage(url);
    this._content.innerHTML = await page.render();
    await page.render();
    await page.afterRender();
  }

  getPage(url) {
    return routes[url] || routes['/404'];
  }
}

export default App;
