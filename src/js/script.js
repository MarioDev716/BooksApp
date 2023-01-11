{
  ('use strict');

  const select = {
    templateOf: {
      cartProduct: '#template-book',
    },
    elements: {
      booksList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
    },
  };

  const templates = {
    cartProduct: Handlebars.compile(
      document.querySelector(select.templateOf.cartProduct).innerHTML
    ),
  };

  let favoriteBooks = [];
  let filters = [];

  function productRender() {
    const thisProduct = this;
    for (let book of dataSource.books) {
      //console.log(book);
      const generatedHTML = templates.cartProduct(book);
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      const productContainer = document.querySelector(
        select.elements.booksList
      );
      productContainer.appendChild(thisProduct.element);
    }
  }

  // event.target.parentElement.matches('.book__image')
  // lub
  // event.target.parentElement.classList.contains('book__image')

  /*   function initActions() {
    const dom = {};
    dom.bookCovers = document.querySelector('.books-list') || [];
    console.log(dom.bookCovers);
    dom.bookCovers.forEach((cover) => {
      cover.addEventListener('dblClick', function (event) {
        if (event.target.parentElement.matches('.book__image')) {
          event.preventDefault();
          console.log('Dubble Click!!!');
          const dataId = event.target.dataset.id;
          if (!favoriteBooks.includes(dataId)) {
            event.target.classList.add('favorite');
            favoriteBooks.push(dataId);
          } else {
            event.target.classList.remove('favorite');
            favoriteBooks.splice(favoriteBooks.indexOf(dataId), 1);
          }
          console.clear();
          console.log(favoriteBooks);
        }
      });
    });
  } */

  function initActions() {
    // console.log(document.querySelector(select.elements.booksList));
    // console.log(document.querySelectorAll(select.elements.bookImage));
    // console.log('Adults only: ', optionAdults);
    // console.log('NonFicition', optionNonFiction);
    console.log(document.querySelector(select.elements.filters));
    document
      .querySelector(select.elements.booksList)
      .addEventListener('dblclick', function (event) {
        if (event.target && event.target.matches(select.elements.bookImage)) {
          //mam problem ze zrozumieniem dlaczego w tym miejscu nie działa mi deklaracja event.target.parentElement.classList.contains('book__image') lub event.target.parentElement.matches('.book__image').
          //w tej chwili dwuklik wyzwala się tylko jak kliknę na ikone serca po wykonaniu hover na obrazku.
          event.preventDefault();
          console.log('Dubble Click!!!');
          const dataId = event.target.dataset.id;
          if (!favoriteBooks.includes(dataId)) {
            event.target.classList.add('favorite');
            favoriteBooks.push(dataId);
          } else {
            event.target.classList.remove('favorite');
            favoriteBooks.splice(favoriteBooks.indexOf(dataId), 1);
            console.log('test');
          }
          console.clear();
          console.log(favoriteBooks);
        }
      });
    document
      .querySelector(select.elements.filters)
      .addEventListener('click', function (event) {
        if (event.target.matches('input[type="checkbox"]')) {
          const value = event.target.value;
          if (!filters.includes(value)) {
            console.log(value);
            filters.push(value);
          } else {
            filters.splice(filters.indexOf(value), 1);
          }
          console.log(filters);
        }
      });
  }

  const app = {
    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },

    init: function () {
      const thisApp = this;
      thisApp.initData();
      productRender();
      initActions();
    },
  };

  app.init();
}
