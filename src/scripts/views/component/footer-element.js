import '../../../styles/component/footer-element.scss';

class FooterElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="footer-element">
        <p>Personal Financial Record Application</p>
        <p>copyright &copy; 2022 CPSG-78</p>
      </div>
    `;
  }
}

customElements.define('footer-element', FooterElement);
