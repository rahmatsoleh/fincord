import moment from 'moment';
import '../../../styles/container/notification-container.scss';
import NotificationsIdb from '../../data/idb/notifications-idb';

class NotificationContainer extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderNotif();
  }

  render() {
    this.innerHTML = `
      <article class="notification">
        <section class="notification-header">
          <h2><i class="fa-solid fa-bell"></i> Notifikasi</h2>
        </section>
        <section class="notification-list">
          <div class="not-found">
            <img src="no-data.svg" alt="Data masih kosong"/>
            <p>Data masih kosong</p>
          </div>
        </section>
      </article>
    `;
  }

  async renderNotif() {
    const notifList = document.querySelector('.notification-list');
    const dataNotif = await NotificationsIdb.getAllData();
    let cards = '';

    dataNotif.forEach((item) => {
      cards += `
      <a href="/#/tagihan" class="notif-item ${item.read ? 'readed' : ''}" data-id="${item._id}">
        <div>
          <p>Waktunya bayar</p>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
        <div>
          <p>${moment(item.date, 'YYYY-MM-DD').format('DD MMM YYYY')}</p>        
        </div>
      </a>
    `;
    });

    if (dataNotif.length > 0) notifList.innerHTML = cards;

    const notifItems = document.querySelectorAll('.notif-item');

    notifItems.forEach((element) => element.addEventListener('click', async () => {
      const { id } = element.dataset;
      const dataItem = dataNotif.find((item) => item._id === id);

      dataItem.read = true;

      await NotificationsIdb.putData(dataItem);
    }));
  }
}

customElements.define('notification-container', NotificationContainer);
