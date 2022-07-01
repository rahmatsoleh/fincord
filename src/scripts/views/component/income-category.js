import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import IncomeCategoryIdb from '../../data/idb/income-category-idb';
import FincordApi from '../../data/api/fincord-api';

class IncomeCategory extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderCategory();
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
      formModal.dataset.method = 'POST';
      idInput.value = `cat-${nanoid(16)}`;
      created.value = new Date().toISOString();
    });

    resetButton.addEventListener('click', () => {
      modalForm.classList.remove('active');
    });
  }

  async renderCategory() {
    const data = await IncomeCategoryIdb.getAllData();
    let result = '';

    data.forEach((element) => {
      result += `
        <li>
          <p>${element.title}</p>
          <div>
            <button data-id="${element._id}" data-created="${element.created_at}" data-name="${element.title}" class="update"><i class="fa-solid fa-pen-to-square"></i></button>
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
            await IncomeCategoryIdb.deleteData(id);

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
        const { id, created, name } = element.dataset;
        const inputCreated = document.querySelector('input#created');
        const inputId = document.querySelector('input#id-category');
        const inputName = document.querySelector('input#category-name');

        inputCreated.value = created;
        inputId.value = id;
        inputName.value = name;
        formModal.dataset.method = 'PUT';

        const modalForm = document.querySelector('.category-modal');
        modalForm.classList.add('active');
      });
    });
  }
}

customElements.define('income-category', IncomeCategory);
