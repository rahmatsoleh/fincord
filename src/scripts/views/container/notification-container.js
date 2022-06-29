import moment from 'moment';
import '../../../styles/container/notification-container.scss';
import FincordApi from '../../data/api/fincord-api';
import NotificationsIdb from '../../data/idb/notifications-idb';

const notion = [
  {
    id: new Date().toISOString(),
    idFK: 'jhdkajshdakjsd',
    title: 'Pembayaran Wifi',
    tag: 3,
    date: '2022-06-26',
    dateline: '2022-07-03',
    desc: '3 hari lagi',
    read: false,
  },
];

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
    // const data = notion;
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

      // Mengubah Data Notifications
      await NotificationsIdb.putData(dataItem);
      await FincordApi.manageNotification('PUT', { id });
    }));
  }
}

customElements.define('notification-container', NotificationContainer);
