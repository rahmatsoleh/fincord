import '../../../styles/items/card-transaktion.scss';

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
              <td class="value">Rp. ${item.max}</td>
            </tr>
            <tr>
              <td class="key">Pengeluaran</td>
              <td class="value">Rp. ${item.use}</td>
            </tr>
            <tr>
              <th class="key">Sisa budget</th>
              <th class="value">Rp. ${item.max - item.use}</th>
            </tr>
          </table>
        </div>
      </div>
    `;
  });

  return cards;
};

export default cardExpends;
