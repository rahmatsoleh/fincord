import '../../../styles/container/dashboard-container.scss';
import getProfileByName from '../items/profile';
import '../component/saldo-dashboard';
import '../component/transaktion-dashboard';
import '../component/bill-dashboard';
import NotificationsIdb from '../../data/idb/notifications-idb';

class DashboardContainer extends HTMLElement {
  connectedCallback() {
    this.render();
    this.newNotifications();
  }

  async render() {
    this.innerHTML = `
      <article class="dashboard">
        <section class="dashboard-header">
          <a href="/#/profile" class="profile">
            <div class="profile-images">
              ${getProfileByName('Ilyas')}
            </div>
            <p>Halo Ilyas</p>
          </a>
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

  async newNotifications() {
    const newIcon = document.querySelector('.dashboard-header a span.active');

    const notificattion = await NotificationsIdb.getAllData();
    const newNote = notificattion.find((data) => data.read === false);

    if (newNote) {
      newIcon.classList.add('new');
      return;
    }

    newIcon.classList.remove('new');
  }
}

customElements.define('dashboard-container', DashboardContainer);
