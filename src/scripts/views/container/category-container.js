import '../../../styles/container/category-container.scss';
import '../component/income-category';
import '../component/expense-category';

class CategoryContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="category">
        <section class="category-header">
          <h2>Kelola Kategori</h2>
        </section>
        <section class="category-nav">
          <div>
            <a href="#/category/in" class="active" data-nav="in">Pemasukan</a>
            <a href="#/category/out" data-nav="out">Pengeluaran</a>
          </div>
        </section>
        <section class="category-main">
        </section>
      </article>
    `;
  }
}

customElements.define('category-container', CategoryContainer);
