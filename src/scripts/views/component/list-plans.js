import '../items/plan-items';
import '../../../styles/component/list-plans.scss';
import SavingPlanIdb from '../../data/idb/saving-plan-idb';

// const rencana = [
//   {
//     id: 'aa11',
//     name: 'Uang untuk rakit PC',
//     nominal: 12000000,
//     dateline: '2022-08-20',
//     sum: 8000000,
//   },
//   {
//     id: 'aa22',
//     name: 'Uang untuk beli rumah',
//     nominal: 120000000,
//     dateline: '2024-05-17',
//     sum: 1000000,
//   },
//   {
//     id: 'aa33',
//     name: 'Uang untuk resepsi nikah',
//     nominal: 100000000,
//     dateline: '2025-06-20',
//     sum: 500000,
//   },
// ];

class ListPlans extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderList();
  }

  render() {
    this.innerHTML = `
      <div class="list-plans">
        
      </div>
    `;
  }

  async renderList() {
    const dataImpian = await SavingPlanIdb.getAllData();
    const tempList = this.querySelector('.list-plans');

    let card = '';

    dataImpian.forEach((item) => {
      card += `
      <plan-items
          data-id="${item.id}"
          data-name="${item.title}"
          data-nominal="${item.nominal}"
          data-dateline="${item.dateline}"
          data-sum="${item.sum}"
      ></plan-items>
      `;
    });

    tempList.innerHTML = card;
  }
}

customElements.define('list-plans', ListPlans);
