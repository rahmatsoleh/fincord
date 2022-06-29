import '../../../styles/container/profile-container.scss';
import getProfileByName from '../items/profile';

class ProfileContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="main">
      <header>
        <div class="profile">
          <div class="images">
            ${getProfileByName('Ilyas')}
          </div>
          <h1>M Ilyas Arman S</h1>
          <p>@milyasarmans</p>
          <button>Edit Profile</button>
        </div>
      </header>
      <article>
        <div class="card">
          <div class="header">
            <p>Full Name</p>
          </div>
          <div class="detail">
            <table>
              <tr>
                M Ilyas Arman S
              </tr>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="header">
            <p>Address</p>
          </div>
          <div class="detail">
            <table>
              <tr>
                Pringsewu, Lampung
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
              <tr>
                milyasarmans13@gmail.com
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
                08127833455
              </tr>
            </table>
          </div>
        </div>
        <button><a href="">Logout</a></button>
      </article>
    </section>
    `;
  }
}

customElements.define('profile-container', ProfileContainer);
