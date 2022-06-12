import '../../../styles/container/tagihan-container.scss';
import ProgressBar from 'progressbar.js';
import { commaSeparateNumber } from '../../utils/number';

class TagihanItem extends HTMLElement {
  connectedCallback() {
    this._id = this.dataset.id;
    this.name = this.dataset.name;
    this.payment = this.dataset.payment;
    this.date = this.dataset.date;
    this.remember = this.dataset.remember;
    this.rememberBefore = parseInt(this.dataset.remember_before, 10);
    this.rememberTime = this.dataset.remember_time;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class='content-tagihan'>
            <div>
                <h3 class='title-content'>${this.name}</h3>
                <h3 class='total-count'>Rp. ${commaSeparateNumber(this.payment)}</h3>
                <button class='pay-button' data-id="${this._id}">Bayar Sekarang</button>
            </div>
            <div>
                <h4 class='heading'>Maksimal Pembayaran</h4>
                <h4 class='subheading'>${this.fullDate(this.date)}</h4>
                <p class='remaining'>${this.reminder(this.date, this.rememberBefore)} Hari Lagi</p>
                <div class='flex items-center action'>
                    <button class='button edit-button'  data-id="${this._id}">
                        <span class="icon">
                        <i class="fa-solid mr-1 fa-edit"></i>
                        </span>
                    Edit</button>
                    <button class='button delete-button' data-id="${this._id}">
                        <span class="icon">
                        <i class="fa-solid mr-1 fa-trash"></i>
                        </span>
                    Hapus</button>
                </div>
            </div>
        </div>
    `;
  }

  fullDate(date) {
    const dateTime = date.split('-');
    let month = '';

    switch (dateTime[1]) {
      case '01':
        month = 'Januari';
        break;
      case '02':
        month = 'Februari';
        break;
      case '03':
        month = 'Maret';
        break;
      case '04':
        month = 'April';
        break;
      case '05':
        month = 'Mei';
        break;
      case '06':
        month = 'Juni';
        break;
      case '07':
        month = 'Juli';
        break;
      case '08':
        month = 'Agustus';
        break;
      case '09':
        month = 'September';
        break;
      case '10':
        month = 'Oktober';
        break;
      case '11':
        month = 'November';
        break;
      case '12':
        month = 'Desember';
        break;
      default:
        month = 'Januari';
    }

    return `${dateTime[2]} ${month} ${new Date().getFullYear()}`;
  }

  reminder(date, rememberBefore) {
    const dateNow = new Date();
    const endDate = new Date(date);
    const differentTime = dateNow.getTime() - endDate.getTime();
    const differentOfDay = Math.ceil(differentTime / (24 * 3600 * 1000));
    const reminder = Math.ceil(differentOfDay - rememberBefore);
    return reminder;
  }

  range(date, nominal) {
    const dateNow = new Date();
    const endDate = new Date(date);

    const differentTime = endDate.getTime() - dateNow.getTime();

    const differentOfDay = Math.ceil(differentTime / (24 * 3600 * 1000));

    return commaSeparateNumber(Math.ceil(nominal / differentOfDay));
  }
}

customElements.define('tagihan-item', TagihanItem);
