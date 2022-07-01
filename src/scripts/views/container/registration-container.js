import '../../../styles/container/registration-container.scss';

class RegistrationContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="main-registration">
        <div class="left">
          <a href="/"><i class="keluar fa-solid fa-arrow-left"></i> Kembali</a>
          <h2>Datang Kembali<h2/>
          <p>Silahkan terhubung kembali dengan akun yang sudah ada</p>
          <button><a href="/#/login">Masuk</a></button>
        </div>

        <div class="right">             
        <form action="javascript:void(0)" id="registration">
          <div class="title"><h1>Daftar Akun<h1/></div>
          <label for="email">Email</label>
          <input type="text" placeholder="Email" name="email" id="email" required>

          <label for="fullname">Nama Lengkap</label>
          <input type="text" placeholder="Nama Lengkap" name="fullname" id="fullname" required>

          <label for="psw">Password</label>
          <input type="password" placeholder="Password" name="psw" id="psw" required>
      
          <label for="psw-repeat">Konfirmasi Password</label>
          <input type="password" placeholder="Konfirmasi Password" name="psw-repeat" id="psw-repeat" required>
          
          <button type="submit">Daftar</button>
        </form>        
        </div>
    </div>
    `;
  }
}

customElements.define('registration-container', RegistrationContainer);
