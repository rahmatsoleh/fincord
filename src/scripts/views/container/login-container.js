import '../../../styles/container/login-container.scss';

class LoginContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="main-login">
          <div class="left">
            <img alt="fincord" src="fincord.png"/>
            <h2>FINCORD<h2/>
          </div>
          <div class="right">       
              <form action="">    
                <div class="title"><h1>Masuk<h1/></div>
                <input type="text" id="username" name="username" placeholder="Username" required>

                <input type="password" id="password" name="password" placeholder="Password" required>
                
                <input type="submit" value="Masuk">
                <p>Belum memiliki akun? <a href="/#/registration">Daftar</a></p>
              </form>          
          </div>
      </div>
    `;
  }
}

customElements.define('login-container', LoginContainer);
