import '../../../styles/container/dashboard-container.scss';
import getProfileByName from '../items/profile';
import '../component/saldo-dashboard';
import '../component/transaktion-dashboard';
import '../component/bill-dashboard';

class DashboardContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="dashboard">
        <section class="dashboard-header">
          <div class="profile">
            <div class="profile-images">
              ${getProfileByName('Ilyas')}
            </div>
            <p>Halo Ilyas</p>
          </div>
          <a href="#/notifikasi" aria-label="notification">
            <span class="icon">
              <i class="fa-solid fa-bell"></i>
            </span>
            <span class="new active"></span>
          </a>
        </section>
        <section class="dashboard-info">
          <div>
            <saldo-dashboard></saldo-dashboard>
            <transaktion-dashboard></transaktion-dashboard>
            <bill-dashboard></bill-dashboard>
          </div>
        </section>
      </article>
    `;
  }
}

customElements.define('dashboard-container', DashboardContainer);
