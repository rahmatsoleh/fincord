import '../../../styles/container/rencana-container.scss';

class RecanaContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="plans">
        <section class="plans-header">
          <h2>Tabungan Impian</h2>
        </section>
        <section class="add-form">
          <button id="add-plans"><i class="fa-solid fa-plus"></i> Tambahkan Impian</button>
        </section>
      </article>
    `;
  }
}

customElements.define('rencana-container', RecanaContainer);
