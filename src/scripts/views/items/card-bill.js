import '../../../styles/items/card-bill.scss';

const cardBills = (cards) => {
  let cardHTML = '';

  cards.forEach((item) => {
    cardHTML += `
      <div class="card-bill">
          <div class="card-bill-left">
            <p>${item.name}</p>
            <p>Rp. ${item.jumlah}</p>
          </div>
          <div class="card-bill-right">
            <i class="fa-solid fa-calendar-week fa-2xl"></i>
            <p>${item.tanggal}</p>
          </div>
        </div>
      `;
  });

  return cardHTML;
};

export default cardBills;
