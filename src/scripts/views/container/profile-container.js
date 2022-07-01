import Swal from 'sweetalert2';
import '../../../styles/container/profile-container.scss';
import getProfileByName from '../items/profile';
import ProfileIdb from '../../data/idb/profile-idb';

class ProfileContainer extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderLogout();
  }

  async render() {
    this.innerHTML = `
    <section class="main">
      <header>
        <div class="profile">
          <div class="images">
          </div>
        </div>
      </header>
      <article>
        <div class="card">
          <div class="header">
            <p>Nama</p>
          </div>
          <div class="detail">
            <table>
              <tr id="name">
              </tr>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="header">
            <p>Username</p>
          </div>
          <div class="detail">
            <table>
              <tr id="username">
              </tr>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="header">
            <p>Email</p>
          </div>
          <div class="detail">
            <table>
              <tr id="email">
              </tr>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="header">
            <p>No Phone</p>
          </div>
          <div class="detail">
            <table>
              <tr>
                -
              </tr>
            </table>
          </div>
        </div>
        <button id="btn-logout">Logout</button>
      </article>
    </section>
    `;
  }

  async renderLogout() {
    const profile = await ProfileIdb.getAllData();
    const name = profile.name.split(' ')[0];
    const btnLogout = document.querySelector('#btn-logout');

    document.querySelector('.profile .images').innerHTML = getProfileByName(name);
    document.querySelector('#name').innerHTML = profile.name;
    document.querySelector('#username').innerHTML = profile.username;
    document.querySelector('#email').innerHTML = profile.email;

    btnLogout.addEventListener('click', async () => {
      Swal.fire({
        title: 'Ingin Keluar ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya Keluar',
        cancelButtonText: 'Enggak Jadi',
      }).then(async (result) => {
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          const dbs = await window.indexedDB.databases();

          dbs.forEach((db) => { window.indexedDB.deleteDatabase(db.name); });

          window.location.href = '/';
        }
      });
    });
  }
}

customElements.define('profile-container', ProfileContainer);
