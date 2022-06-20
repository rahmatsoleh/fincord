import moment from 'moment';
import '../../../styles/items/card-bill.scss';
import { commaSeparateNumber } from '../../utils/number';

const cardBills = (cards) => {
  let cardHTML = '';

  cards.forEach((item) => {
    cardHTML += `
      <div class="card-bill">
          <div class="card-bill-left">
            <p>${item.name}</p>
            <p>Rp. ${commaSeparateNumber(item.payment)}</p>
          </div>
          <div class="card-bill-right">
            <i class="fa-solid fa-calendar-week fa-2xl"></i>
            <p>${moment(item.date).format('DD MMM YYYY')}</p>
          </div>
        </div>
      `;
  });

  return cardHTML;
};

export default cardBills;
