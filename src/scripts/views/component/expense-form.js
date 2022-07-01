import '../../../styles/component/form-transaction.scss';
import ExpenseCategoryIdb from '../../data/idb/expense-category-idb';

class ExpenseForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getCategory();
    this.inputNumber();
  }

  render() {
    this.innerHTML = `
      <form>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-wallet"></i>
          </div>
          <div class="form-input">
            <label for="nominal">Jumlah</label><input type="text" id="nominal" placeholder="Rp. ">
          </div>
        </div>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-angles-down"></i>
          </div>
          <div class="form-input">
            <label for="category">Kategori</label>
            <select id="category-out" class="category"></select>
          </div>
          <div>
            <a href="#/category/out" title="Kelola Kategori"><i class="fa-solid fa-gear"></i></a>
          </div>
        </div>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-calendar-days"></i>
          </div>
          <div class="form-input">
            <label for="date">Tanggal</label><input type="date" id="date">
          </div>
        </div>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-clipboard"></i>
          </div>
          <div class="form-input">
            <label for="desc">Catatan</label><input type="text" id="desc" placeholder="(Opsional)">
          </div>
        </div>
        <button type="submit">Simpan</button>
      </form>
    `;
  }

  async getCategory() {
    const dataCategory = await ExpenseCategoryIdb.getAllData();
    let result = '';

    dataCategory.forEach((item) => {
      result += `
        <option value="${item._id}">${item.title}</option>
      `;
    });

    const inputCategory = document.querySelector('#category-out');

    if (inputCategory) inputCategory.innerHTML = result;
  }

  inputNumber() {
    const inputNumber = document.querySelector('#nominal');

    function getFormat(numb, prefix) {
      const numberString = numb.replace(/[^,\d]/g, '').toString();
      const split = numberString.split(',');
      const splitLength = split[0].length % 3;
      let formatRupiah = split[0].substr(0, splitLength);
      const toThousand = split[0].substr(splitLength).match(/\d{3}/gi);

      if (toThousand) {
        const separator = splitLength ? '.' : '';
        formatRupiah += separator + toThousand.join('.');
      }

      formatRupiah = split[1] !== undefined ? `${formatRupiah}, ${split[1]}` : formatRupiah;
      return prefix === undefined ? formatRupiah : (formatRupiah ? `Rp. ${formatRupiah}` : '');
    }

    inputNumber.addEventListener('keyup', () => {
      inputNumber.value = getFormat(inputNumber.value, 'Rp. ');
    });
  }
}

customElements.define('expense-form', ExpenseForm);
