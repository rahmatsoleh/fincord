import '../../../styles/container/notification-container.scss';

const notion = [
  {
    id: new Date().toISOString(),
    title: 'Pembayaran Wifi',
    tag: 'Waktunya Bayar',
    date: '12 Mei 2022',
    desc: 'Cuy ojo lali wayae mbayar wifi yo',
    read: false,
  },
  {
    id: new Date().toISOString(),
    title: 'Pembayaran Pulsa',
    tag: 'Waktunya Bayar',
    date: '20 Mei 2022',
    desc: 'Cuy ojo lali wayae mbayar wifi yo',
    read: true,
  },
  {
    id: new Date().toISOString(),
    title: 'Pembayaran Cicilan sepeda',
    tag: 'Waktunya Bayar',
    date: '12 Mei 2022',
    desc: 'Cuy ojo lali wayae mbayar sepeda ben gak ditarik leasing',
    read: false,
  },
];

class NotificationContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="notification">
        <section class="notification-header">
          <h2><i class="fa-solid fa-bell"></i> Notifikasi</h2>
        </section>
        <section class="notification-list">${this.renderNotif(notion)}</section>
      </article>
    `;
  }

  renderNotif(data) {
    let cards = '';

    data.forEach((item) => {
      cards += `
      <a href="" class="notif-item ${item.read ? 'readed' : ''}" data-id="${item.id}">
        <div>
          <p>${item.tag}</p>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
        <div>
          <p>${item.date}</p>        
        </div>
      </a>
    `;
    });

    return cards;
  }
}

customElements.define('notification-container', NotificationContainer);
