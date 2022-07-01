/* eslint-disable radix */
import '../../../styles/items/card-transaktion.scss';
import { commaSeparateNumber } from '../../utils/number';

const cardExpends = (dataTrans) => {
  let cards = '';

  dataTrans.forEach((item) => {
    cards += `
      <div class="card-expend">
        <div class="card-expend-header">
          <p>${item.name}</p>
          <div id="card${item.id}"></div>
        </div>
        <div class="card-expend-detail">
          <table>
            <tr>
              <td class="key">Batas Pengeluaran</td>
              <td class="value">Rp. ${commaSeparateNumber(item.max)}</td>
            </tr>
            <tr>
              <td class="key">Pengeluaran</td>
              <td class="value">Rp. ${commaSeparateNumber(item.use)}</td>
            </tr>
            <tr>
              <th class="key">Sisa budget</th>
              <th class="value">Rp. ${commaSeparateNumber(item.max - item.use)}</th>
            </tr>
          </table>
        </div>
      </div>
    `;
  });

  return cards;
};

export default cardExpends;
