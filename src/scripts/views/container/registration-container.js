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
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" id="email" required>

            <label for="fullname"><b>Full Name</b></label>
            <input type="text" placeholder="Enter Full Name" name="fullname" id="fullname" required>

            <label for="address"><b>Address</b></label>
            <input type="text" placeholder="Enter Address" name="address" id="address" required>

            <label for="phone"><b>Phone</b></label>
            <input type="text" placeholder="Enter Phone" name="phone" id="phone" required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" id="psw" required>
        
            <label for="psw-repeat"><b>Repeat Password</b></label>
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
