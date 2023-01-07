{
  ('use strict');

  const select = {
    templateOf: {
      cartProduct: '#template-book',
    },
    elements: {
      bookList: '.books-list',
    },
  };

  const templates = {
    cartProduct: Handlebars.compile(
      document.querySelector(select.templateOf.cartProduct).innerHTML
    ),
  };

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

  const app = {
    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },

    init: function () {
      console.log('Init function!');
      const thisApp = this;
      thisApp.initData();
      productRender();
    },
  };

  app.init();
}
