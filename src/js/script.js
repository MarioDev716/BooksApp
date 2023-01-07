{
  ('use strict');

  const select = {
    templateOf: {
      cartProduct: '#template-book',
    },
    elements: {
      bookList: '.books-list',
      bookCover: '.book__image',
    },
  };

  const templates = {
    cartProduct: Handlebars.compile(
      document.querySelector(select.templateOf.cartProduct).innerHTML
    ),
  };

  let favoriteBooks = [];

  function productRender() {
    const thisProduct = this;
    for (let book of dataSource.books) {
      console.log(book);
      const generatedHTML = templates.cartProduct(book);
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      const productContainer = document.querySelector(select.elements.bookList);
      productContainer.appendChild(thisProduct.element);
    }
  }

  function initActions() {
    const dom = {};
    dom.bookCovers = document.querySelectorAll(select.elements.bookCover) || [];
    console.log(dom);
    dom.bookCovers.forEach((cover) => {
      cover.addEventListener('dblclick', function (event) {
        event.preventDefault();
        console.log('Dubble Click!!!');
        const dataId = cover.dataset.id;
        if (!favoriteBooks.includes(dataId)) {
          cover.classList.add('favorite');
          favoriteBooks.push(dataId);
        } else {
          cover.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(dataId), 1);
        }
        console.log(favoriteBooks);
      });
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
