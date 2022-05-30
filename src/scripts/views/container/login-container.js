import '../../../styles/container/login-container.scss';

class LoginContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="main-login">
        <div class="left">
          <h1>Log in to your Account</h1>
          <img alt="fincord" src="fincord.png"/>
          <h2>FINCORD<h2/>
        </div>
        <div class="right">              
            <form action="">
              <input type="text" id="username" name="username" placeholder="Username" required>

              <input type="password" id="password" name="password" placeholder="Password" required>
              
              <input type="submit" value="Log in">
              <p>Don't have an account? <a href="/#/registration">Create one</a></p>
            </form>
          
        </div>
      </div>
    `;
  }
}

customElements.define('login-container', LoginContainer);
