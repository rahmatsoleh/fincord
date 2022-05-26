import '../../../styles/component/form-transaction.scss';

const kategori = [
  {
    name: 'Transportasi',
  },
  {
    name: 'Makan dan Minum',
  },
  {
    name: 'Hiburan',
  },
  {
    name: 'Pajak',
  },
  {
    name: 'Investasi',
  },
  {
    name: 'Sedekah',
  },
];

class ExpenseForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-wallet"></i>
          </div>
          <div class="form-input">
            <label for="nominal">Jumlah</label><input type="number" id="nominal" placeholder="Rp. ">
          </div>
        </div>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-wallet"></i>
          </div>
          <div class="form-input">
            <label for="category">Kategori</label>
            <select id="category">${this.getCategory(kategori)}</select>
          </div>
          <div>
            <a href="#/category/out" title="Kelola Kategori"><i class="fa-solid fa-gear"></i></a>
          </div>
        </div>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-wallet"></i>
          </div>
          <div class="form-input">
            <label for="date">Tanggal</label><input type="date" id="date">
          </div>
        </div>
        <div class="form-control">
          <div class="form-icon">
            <i class="fa-solid fa-wallet"></i>
          </div>
          <div class="form-input">
            <label for="desc">Catatan</label><input type="text" id="desc" placeholder="(Opsional)">
          </div>
        </div>
        <button type="submit">Simpan</button>
      </form>
    `;
  }

  getCategory(data) {
    let result = '';

    data.forEach((item) => {
      result += `
        <option value="${item.name}">${item.name}</option>
      `;
    });

    return result;
  }
}

customElements.define('expense-form', ExpenseForm);
