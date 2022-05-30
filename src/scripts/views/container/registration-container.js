import '../../../styles/container/registration-container.scss';

class RegistrationContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="main-registration">
        <div class="left">
          <h2>Datang Kembali<h2/>
          <p>Silahkan terhubung kembali dengan akun yang sudah ada</p>
          <a href="/#/login"><button>Masuk</button></a>
        </div>

        <div class="right">             
        <form action="">
          <div class="title"><h1>Daftar Akun<h1/></div>
          <label for="email">Email</label>
          <input type="text" placeholder="Email" name="email" id="email" required>

          <label for="fullname">Nama Lengkap</label>
          <input type="text" placeholder="Nama Lengkap" name="fullname" id="fullname" required>

          <label for="psw">Password</label>
          <input type="password" placeholder="Password" name="psw" id="psw" required>
      
          <label for="psw-repeat">Konfirmasi Password</label>
          <input type="password" placeholder="Konfirmasi Password" name="psw-repeat" id="psw-repeat" required>
          
          <input type="submit" value="Daftar">
        </form>        
        </div>
    </div>
    `;
  }
}

customElements.define('registration-container', RegistrationContainer);
