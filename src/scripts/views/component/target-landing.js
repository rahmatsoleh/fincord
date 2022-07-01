import cardBills from '../items/card-target';
import '../../../styles/component/target-landing.scss';

const tagihan = [
  {
    title: 'Uang untuk Makan',
    progress: 50,
    populated: 50000,
    moneyPerDay: 10000,
  },
  {
    title: 'Uang untuk Nonton',
    progress: 75,
    populated: 70000,
    moneyPerDay: 10000,
  },
];

class TargetLanding extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="target-landing">
        ${cardBills(tagihan)}
      </div>
    `;
  }
}

customElements.define('target-landing', TargetLanding);
