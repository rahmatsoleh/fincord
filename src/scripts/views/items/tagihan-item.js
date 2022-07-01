import '../../../styles/container/tagihan-container.scss';
import Swal from 'sweetalert2';
import moment from 'moment';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import { commaSeparateNumber } from '../../utils/number';
import API_ENDPOINT from '../../globals/api-endpoint';

class TagihanItem extends HTMLElement {
  connectedCallback() {
    this._id = this.dataset.id;
    this.name = this.dataset.name;
    this.payment = this.dataset.payment;
    this.date = this.dataset.date;
    this.remember = this.dataset.remember;
    this.paid = this.dataset.paid;
    this.render();
    this.afterRender();
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
                <p class='remaining'>${this.reminder(this.paid, this.date)}</p>
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

  reminder(paid, date) {
    const paidBool = paid === 'true';
    const dateNow = moment().startOf('day');
    const datePay = moment(date, 'YYYY-MM-DD');
    const differentOfDay = moment.duration(datePay.diff(dateNow)).asDays();

    if (paidBool) return 'Lunas';

    if (differentOfDay < 0) return `Terlambat ${Math.abs(differentOfDay)} Hari`;

    if (differentOfDay > 0) return `${differentOfDay} Hari lagi`;

    return 'Hari ini';
  }

  afterRender() {
    const payButton = this.querySelector('button.pay-button');

    payButton.addEventListener('click', async () => {
      const paid = this.paid === 'true';
      const payment = parseInt(this.payment);
      const remember = this.remember === 'true';
      const date = remember ? moment(this.date, 'YYYY-MM-DD').add(1, 'M').format('YYYY-MM-DD') : this.date;

      if (paid) {
        Swal.fire(`${this.name} sudah lunas.`);
        return;
      }

      const { value: payBill } = await Swal.fire({
        title: `Bayar tagihan ${this.name}`,
        input: 'number',
        inputValue: parseInt(this.payment),
        inputLabel: 'Bayarkan tagihan anda sesuai nominal',
        showCancelButton: true,
        cancelButtonText: 'Nggak jadi',
        confirmButtonText: 'Bayarkan',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        },
      });

      if (!payBill) return;

      const pay = parseInt(payBill);

      if (pay < payment) {
        Swal.fire({
          title: 'Uppss',
          icon: 'warning',
          text: `Pastikan anda membayar ${this.name} sebesar Rp. ${commaSeparateNumber(payment)}`,
        });
        return;
      }

      Swal.fire({
        title: 'Apakah anda sudah yakin ?',
        icon: 'question',
        text: `Anda akan membayar tagihan ${this.name} sebesar Rp. ${commaSeparateNumber(payment)}`,
        showCancelButton: true,
        cancelButtonText: 'Nggak Jadi',
        confirmButtonText: 'Bayarkan',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const dataItem = {
            _id: this._id,
            name: this.name,
            payment,
            date,
            remember,
            paid: !remember,
          };

          await TagihanItemIdb.putData(dataItem);

          const userId = JSON.parse(localStorage.getItem('appFin')).id;

          const formApi = {
            id: dataItem._id,
            userId,
            name: dataItem.name,
            payment: dataItem.payment,
            date: dataItem.date,
            remember: dataItem.remember,
            status: dataItem.paid,
          };

          await fetch(API_ENDPOINT.bill, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(formApi),
          });

          const text = pay > payment ? `Tagihan ${this.name} telah dilunasi. Pembayaran lebih Rp. ${commaSeparateNumber(pay - payment)}` : `Tagihan ${this.name} telah dilunasi`;

          Swal.fire({
            title: 'Lunas',
            icon: 'success',
            text,
          }).then(() => window.location.reload());
        }
      });
    });
  }
}

customElements.define('tagihan-item', TagihanItem);
