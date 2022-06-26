import moment from 'moment';
import '../../../styles/container/notification-container.scss';

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

  renderNotif() {
    const notifList = document.querySelector('.notification-list');
    const data = notion;
    let cards = '';

    data.forEach((item) => {
      cards += `
      <a href="/#/tagihan" class="notif-item ${item.read ? 'readed' : ''}" data-id="${item.id}">
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

    if (data.length > 0) notifList.innerHTML = cards;
  }
}

customElements.define('notification-container', NotificationContainer);
