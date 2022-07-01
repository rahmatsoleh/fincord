import ProgressBar from 'progressbar.js';
import { commaSeparateNumber } from '../../utils/number';
import '../../../styles/items/plan-items.scss';

class PlanItems extends HTMLElement {
  connectedCallback() {
    this._id = this.dataset.id;
    this._name = this.dataset.name;
    this._nominal = parseInt(this.dataset.nominal, 10);
    this._dateline = this.dataset.dateline;
    this._sum = this.dataset.sum;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="plan-items">
        <div class="plan-items-header">
          <h3>${this._name}</h3>
          <div id="plan-${this._id}" class="temp-bar"></div>
        </div>
        <div class="plan-items-main">
          <div class="detail">
            <p>Target terkumpul : <span>${this.fullDate(this._dateline)}</span></p>
            <p>Kumpulkan uang Rp. <span>${this.range(this._dateline, this._nominal - this._sum)}</span> setiap harinya agar target terpenuhi</p>
          </div>
          <div class="nominal">
            <table>
              <tr>
                <td>Target Pengumpulan</td>
                <td>Rp ${commaSeparateNumber(this._nominal)}</td>
              </tr>
              <tr>
                <td>Uang terkumpul</td>
                <td>Rp ${commaSeparateNumber(this._sum)}</td>
              </tr>
              <tr>
                <td>Sisa kekurangan</td>
                <td>Rp ${commaSeparateNumber(this._nominal - this._sum)}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="plan-items-footer">
          <div>
            <button aria-label="Alokasikan" class="alokasi" data-name="${this._name}" data-fk="${this._id}">Alokasikan</button>
          </div>
          <div>
            <button aria-label="Edit" class="update-button" data-id="${this._id}" data-name="${this._name}" data-nominal="${this._nominal}" data-dateline="${this._dateline}"><i class="fa-solid fa-pen-to-square"></i></button>
            <button aria-label="Hapus" class="delete-button" data-id="${this._id}"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    `;

    this.progressBar(this._id, this._sum / this._nominal);
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

    return `${dateTime[2]} ${month} ${dateTime[0]}`;
  }

  range(date, nominal) {
    const dateNow = new Date();
    const endDate = new Date(date);

    const differentTime = endDate.getTime() - dateNow.getTime();

    const differentOfDay = Math.ceil(differentTime / (24 * 3600 * 1000));

    return commaSeparateNumber(Math.ceil(nominal / differentOfDay));
  }

  progressBar(id, present) {
    const bar = new ProgressBar.Line(document.querySelector(`#plan-${id}`), {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#0077b6',
      trailColor: '#caf0f8',
      trailWidth: 10,
      svgStyle: { width: '100%', height: '10px' },
      from: { color: '#0077b6' },
      to: { color: '#0077b6' },
      text: {
        style: {
          color: '#03045e',
          position: 'absolute',
          right: '0',
          top: '-15px',
          padding: 0,
          margin: 0,
          transform: null,
        },
        autoStyleContainer: false,
      },
      step: (state, bar) => {
        bar.setText(`${Math.round(bar.value() * 100)} %`);
        bar.path.setAttribute('stroke', state.color);
      },
    });

    bar.animate(present);
  }
}

customElements.define('plan-items', PlanItems);
