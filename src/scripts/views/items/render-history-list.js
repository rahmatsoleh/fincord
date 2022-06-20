import moment from 'moment';

const renderHistoryList = async (dataTransaction) => {
  const navButton = document.querySelectorAll('.report-history-nav button');
  const placeHistoryList = document.querySelector('.report-history-list ul');
  let listElement = '';

  await dataTransaction.forEach((item) => {
    listElement += `
      <li class="${item.tag === 'out' ? 'out' : ''}">
        <div class="main-list">
          <p>${item.tag === 'out' ? 'Keluar' : 'Masuk'}</p>
          <h4>${item.category}</h4>
          <p>Rp. ${item.count}</p>
        </div>
        <div class="badge-list">
          <p>${moment(item.date).format('DD MMM YYYY')}</p>
        </div>
      </li>
    `;
  });

  placeHistoryList.innerHTML = listElement;

  navButton.forEach((element) => {
    element.onclick = () => {
      navButton.forEach((button) => button.classList.remove('active'));
      element.classList.add('active');
      const { nav } = element.dataset;

      const dataFilter = dataTransaction.filter((item) => item.tag === nav);
      let listElementFilter = '';

      dataFilter.forEach((item) => {
        listElementFilter += `
          <li class="${item.tag === 'out' ? 'out' : ''}">
            <div class="main-list">
              <p>${item.tag === 'out' ? 'Keluar' : 'Masuk'}</p>
              <h4>${item.category}</h4>
              <p>Rp. ${item.count}</p>
            </div>
            <div class="badge-list">
              <p>${moment(item.date).format('DD MMM YYYY')}</p>
            </div>
          </li>
        `;
      });

      dataFilter.length > 0 ? placeHistoryList.innerHTML = listElementFilter : placeHistoryList.innerHTML = listElement;
    };
  });
};

export default renderHistoryList;
