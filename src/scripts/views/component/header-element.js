import '../../../styles/component/header-element.scss';

class HeaderElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="header-element">
        <img alt="fincord" src="fincord.png"/>
        <h1>Fincord</h1>
      </div>
    `;
  }
}

customElements.define('header-element', HeaderElement);
