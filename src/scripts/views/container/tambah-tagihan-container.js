import '../../../styles/container/tagihan-container.scss';

class TambahTagihanContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class='navbar-tagihan'>
            <h1 class='title'>Tambah Tagihan</h1>
        </section>
        <section class='form-tambah'>

        </section>
    `;
  }
}

customElements.define('tambah-tagihan-container', TambahTagihanContainer);
