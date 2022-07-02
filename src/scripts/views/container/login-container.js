import '../../../styles/container/login-container.scss';

class LoginContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="main-login">
          <div class="left">
          <a href="/"><i class="keluar fa-solid fa-arrow-left"></i> Kembali</a>
            <img alt="fincord" src="fincord.png"/>
            <h2>FINCORD<h2/>
          </div>
          <div class="right">       
              <form id="login" action="javascript:void(0)">
                <div class="title"><h1>Masuk<h1/></div>
                <input type="text" id="email" name="email" placeholder="Email" required>

                <input type="password" id="password" name="password" placeholder="Password" required>
                
                <button type="submit">Masuk</button>
                <a href="/#/registration" class="registry">Daftar</a>
              </form>          
          </div>
      </div>
    `;
  }
}

customElements.define('login-container', LoginContainer);
