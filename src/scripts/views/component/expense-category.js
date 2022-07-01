import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import ExpenseCategoryIdb from '../../data/idb/expense-category-idb';
import FincordApi from '../../data/api/fincord-api';

class ExpenseCategory extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderCategory();
    this.inputNumber();
  }

  render() {
    this.innerHTML = `
      <div>
        <button class="add-category">Tambah Kategori</button>
        <div class="category-item">
          <ul></ul>
        </div>
        <div class="category-modal">
          <div class="container">
            <h2>Tambah Kategori</h2>
            <form>
              <input type="hidden" value="" id="created">
              <input type="hidden" value="" id="id-category">
              <div class="form-control">
                <label for="category-name">Nama Kategori</label>
                <input type="text" id="category-name" required>
              </div>
              <div class="form-control">
                <label for="limit">Batas Maksimum</label>
                <input type="text" id="limit" required>
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

    const formModal = document.querySelector('.category-modal .container form');
    const addCategory = document.querySelector('.category-main .add-category');
    const resetButton = document.querySelector('.button-control .reset');
    const modalForm = document.querySelector('.category-modal');
    const idInput = document.querySelector('.category-modal #id-category');
    const created = document.querySelector('.category-modal #created');

    addCategory.addEventListener('click', () => {
      modalForm.classList.add('active');
      idInput.value = `cat-${nanoid(16)}`;
      created.value = new Date().toISOString();
      formModal.dataset.method = 'POST';
    });

    resetButton.addEventListener('click', () => {
      modalForm.classList.remove('active');
    });
  }

  async renderCategory() {
    const dataFromIdb = await ExpenseCategoryIdb.getAllData();

    let result = '';

    dataFromIdb.forEach((element) => {
      result += `
        <li>
          <p>${element.title}</p>
          <div>
          <button data-id="${element._id}" data-created="${element.created_at}" data-name="${element.title}"  data-limit="${element.limited}" class="update"><i class="fa-solid fa-pen-to-square"></i></button>
            <button data-id="${element._id}" data-name="${element.title}" class="delete"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </li>
      `;
    });

    document.querySelector('.category-item ul').innerHTML = result;

    const buttonDeleteItems = document.querySelectorAll('.category-item .delete');

    buttonDeleteItems.forEach((element) => {
      element.addEventListener('click', () => {
        const { id, name } = element.dataset;

        Swal.fire({
          title: `Apakah anda yakin ingin menghapus kategori ${name} ?`,
          text: 'Data yang sudah dihapus tidak bisa dikembalikan.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#aaa',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Hapus',
        }).then(async (result) => {
          if (result.isConfirmed) {
            await ExpenseCategoryIdb.deleteData(id);

            await FincordApi.manageCategory('DELETE', { id });

            Swal.fire(
              'Berhasil',
              `Data ${name} berhasil terhapus`,
              'success',
            ).then(() => window.location.reload());
          }
        });
      });
    });

    const buttonUpdateItems = document.querySelectorAll('button.update');
    const formModal = document.querySelector('.category-modal .container form');

    buttonUpdateItems.forEach((element) => {
      element.addEventListener('click', () => {
        window.scrollTo({ top: 0 });
        const {
          id, created, name, limit,
        } = element.dataset;
        const inputCreated = document.querySelector('input#created');
        const inputId = document.querySelector('input#id-category');
        const inputName = document.querySelector('input#category-name');
        const inputLimit = document.querySelector('input#limit');

        inputCreated.value = created;
        inputId.value = id;
        inputName.value = name;
        inputLimit.value = this.getFormatNumber(limit, 'Rp. ');
        formModal.dataset.method = 'PUT';

        const modalForm = document.querySelector('.category-modal');
        modalForm.classList.add('active');
      });
    });
  }

  inputNumber() {
    const inputNumber = document.querySelector('#limit');

    inputNumber.addEventListener('keyup', () => {
      inputNumber.value = this.getFormatNumber(inputNumber.value, 'Rp. ');
    });
  }

  getFormatNumber(numb, prefix) {
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
}

customElements.define('expense-category', ExpenseCategory);
