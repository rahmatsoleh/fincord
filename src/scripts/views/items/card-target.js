import '../../../styles/items/card-target.scss';
import { commaSeparateNumber } from '../../utils/number';

const cardTarget = (cards) => {
  let cardHTML = '';

  cards.forEach((item) => {
    cardHTML += `
        <div class="card-target">
          <div class="card-target__header">
            <h1>Tabungan Impian</h1>
          </div>
          <div class="card-target__body">
            <button class="mb-2 btn btn-primary">Tambahkan Impian</button>
            <h2>${item.title}</h2>
            <div class="card-target__inner-container">
              <div class="card-target__bg-progress">
                <div class="card-target__progress" style="width:${item.progress}%"></div>
              </div>
              <div class="card-target__populated">
                <h3>Target Terkumpul</h3>
                <h3>Rp. ${commaSeparateNumber(item.populated)}</h3>
              </div>

              <p>Kumpulkan uang Rp.${commaSeparateNumber(item.moneyPerDay)} setiap harinya agar target terpenuhi</p>
              <button class="btn btn-primary mt-2">Alokasikan</button>
            </div>
          </div>
        </div>
      `;
  });

  return cardHTML;
};

export default cardTarget;
