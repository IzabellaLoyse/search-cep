/* eslint-disable no-undef */
const getDataApi = async (cepNumber) => {
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${cepNumber}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const clearInputSearch = () => {
  const search = document.querySelector('.js-search-cep');
  search.value = '';
};

const loadDataCep = async (value) => {
  const list = document.querySelector('.c-table-data');

  try {
    const data = await getDataApi(value);

    const {
      cep, state, city, neighborhood, street,
    } = data;

    if (cep === undefined) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CEP não encontrado!',
      });
    }

    return list.insertAdjacentHTML(
      'beforeend',
      `
  <ul class="c-list">
  <li class="c-list__item">
    <span class="c-list__item-list">CEP:</span>
    <span class="c-list__item-list">${cep}</span>
  </li>

  <li class="c-list__item">
    <span class="c-list__item-list">Estado: </span>
    <span class="c-list__item-list">${state}</span>
  </li>
  <li class="c-list__item">
    <span class="c-list__item-list">Cidade: </span>
    <span class="c-list__item-list">${city}</span>
  </li>

  <li class="c-list__item">
    <span class="c-list__item-list">Bairro:</span>
    <span class="c-list__item-list"> ${neighborhood}</span>
  </li>

  <li class="c-list__item">
    <span class="c-list__item-list">Rua:</span>
    <span class="c-list__item-list">${street}</span>
  </li>
</ul>
  `,
    );
  } catch (error) {
    throw new Error(error);
  }
};

const inputValidationSearchCep = () => {
  const searchCep = document.querySelector('.js-search-cep');
  const valueSearch = searchCep.value;
  const cep = valueSearch.replace(/\D/g, '');
  const regex = /^[0-9]{8}$/;

  if (!regex.test(cep)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...Algo deu errado!',
      text: 'Informe um CEP válido!',
    });
  } else {
    loadDataCep(cep);
  }

  clearInputSearch();
};

document
  .querySelector('.js-btn-search')
  .addEventListener('click', inputValidationSearchCep);
