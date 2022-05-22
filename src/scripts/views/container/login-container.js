import '../../../styles/container/login-container.scss';

class LoginContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="main-login">
        <div class="card">
            <h1>Log in to your account</h1>
              
            <form action="">
              <input type="text" id="username" name="username" placeholder="Username" required>

              <input type="text" id="password" name="password" placeholder="Password" required>
              <input type="checkbox" onclick="hidePassword()"> Show Password
              
              <input type="submit" value="Log in">
              <p>Don't have an account? <a href="/#/registration">Create one</a></p>
            </form>
          
        </div>
      </div>
    `;
  }
}

customElements.define('login-container', LoginContainer);
