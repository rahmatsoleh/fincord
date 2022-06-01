const kategori = [
  {
    id: '1111',
    title: 'Gaji Pokok',
  },
  {
    id: '2222',
    title: 'Tunjangan',
  },
  {
    id: '3333',
    title: 'Bonus',
  },
  {
    id: '4444',
    title: 'Freelancer',
  },
];

class IncomeCategory extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div>
        <button class="add-category">Tambah Kategori</button>
        <div class="category-item">
          <ul>${this.getCategory(kategori)}</ul>
        </div>
        <div class="category-modal">
          <div class="container">
          <h2>Tambah Kategori</h2>
            <form>
              <input type="hidden" value="">
              <div class="form-control">
                <label for="categori-name">Nama Kategori</label>
                <input type="text" id="category-name" required>
              </div>
              <div class="button-control">
                <button type="reset" class="reset">Batal</button>
                <button type="submit">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const addCategory = document.querySelector('.category-main .add-category');
    const resetButton = document.querySelector('.button-control .reset');
    const modalForm = document.querySelector('.category-modal');

    addCategory.addEventListener('click', () => {
      modalForm.classList.add('active');
    });

    resetButton.addEventListener('click', () => {
      modalForm.classList.remove('active');
    });
  }

  getCategory(data) {
    let result = '';

    data.forEach((element) => {
      result += `
        <li>
          <p>${element.title}</p>
          <div>
            <button data-id="${element.id}"><i class="fa-solid fa-pen-to-square"></i></button>
            <button data-id="${element.id}"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </li>
      `;
    });

    return result;
  }
}

customElements.define('income-category', IncomeCategory);