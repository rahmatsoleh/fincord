import '../../../styles/component/loading-bar.scss';

class LoadingBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="loading-wrapper d-none">
        <div class="loading-bar"></div>
      </div>
    `;
  }
}

customElements.define('loading-bar', LoadingBar);
