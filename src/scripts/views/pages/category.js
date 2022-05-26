import pageRender from '../../utils/page-render';
import UrlParser from '../../routes/url-parser';
import '../container/category-container';

const Category = {
  async render() {
    pageRender('transaksi', 'app');
    return '<category-container></category-container>';
  },

  async afterRender() {
    const url = UrlParser.parseActiveWithoutCombiner().id;
    const navButtonCategory = document.querySelectorAll('.category-nav div a');
    const listCategory = document.querySelector('.category-main');

    navButtonCategory.forEach((element) => {
      element.classList.remove('active');

      if (element.dataset.nav === url) element.classList.add('active');
    });

    url === 'in' ? listCategory.innerHTML = '<income-category></income-category>' : listCategory.innerHTML = '<expense-category></expense-category>';
  },
};

export default Category;
