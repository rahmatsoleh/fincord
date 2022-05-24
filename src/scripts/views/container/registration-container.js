import '../../../styles/container/registration-container.scss';

class RegistrationContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="main-registration">
      <div class="card">
          <h1>Create an account</h1>
            
          <form action="">
            <label for="email">Email</label>
            <input type="text" placeholder="Enter Email" name="email" id="email" required>

            <label for="fullname">Full Name</label>
            <input type="text" placeholder="Enter Full Name" name="fullname" id="fullname" required>

            <label for="address">Address</label>
            <input type="text" placeholder="Enter Address" name="address" id="address" required>

            <label for="phone">Phone</label>
            <input type="text" placeholder="Enter Phone" name="phone" id="phone" required>
        
            <label for="psw">Password</label>
            <input type="password" placeholder="Enter Password" name="psw" id="psw" required>
        
            <label for="psw-repeat">Repeat Password</label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
            
            <input type="submit" value="Register">
            <a href="/#/login"><p>Already have an account?</p></a>
          </form>
        
      </div>
    </div>
    `;
  }
}

customElements.define('registration-container', RegistrationContainer);
