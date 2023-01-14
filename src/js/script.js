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
      rating: '.book__rating__fill',
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
    const productContainer = document.querySelector(select.elements.booksList);
    for (let book of dataSource.books) {
      const generatedHTML = templates.cartProduct(book);
      const thisElement = dataSource.books.indexOf(book);
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      const rating = book.rating;
      console.log(book.name + ' - ' + rating);
      productContainer.appendChild(thisProduct.element);
      const ratingBarDOM = document.querySelectorAll(select.elements.rating);
      const result = prepareRatingBar(rating);
      const ratingBarStyle = result.ratingBarStyle;
      const widthPercentBar = result.widthPercentBar;
      ratingBarDOM[thisElement].style.background = ratingBarStyle;
      ratingBarDOM[thisElement].style.width = widthPercentBar + '%';
    }
  }

  function prepareRatingBar(rating) {
    let ratingBarStyle = '';
    // Przygotowanie wartości koloru paska w zależności od oceny
    if (rating < 6) {
      // console.log('średnia książka');
      ratingBarStyle = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      // console.log('może być');
      ratingBarStyle = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      // console.log('godna polecenia książka');
      ratingBarStyle = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      // console.log('super książka');
      ratingBarStyle = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    //Przygotowanie długości paska w zależności od oceny.
    const widthPercentBar = rating * 10;
    console.log(widthPercentBar + '%');
    console.log(ratingBarStyle);
    // ratingBarStyle += ' width: ' + widthPercentBar + '%;"';
    //Dodawanie stylu paska do strony
    return {ratingBarStyle: ratingBarStyle, widthPercentBar: widthPercentBar};
  }

  function initActions() {
    document
      .querySelector(select.elements.booksList)
      .addEventListener('dblclick', function (event) {
        if (event.target && event.target.matches(select.elements.bookImage)) {
          //mam problem ze zrozumieniem dlaczego w tym miejscu nie działa mi deklaracja event.target.parentElement.classList.contains('book__image') lub event.target.parentElement.matches('.book__image').
          //w tej chwili dwuklik wyzwala się tylko jak kliknę na ikone serca po wykonaniu hover na obrazku.
          event.preventDefault();
          const dataId = event.target.dataset.id;
          if (!favoriteBooks.includes(dataId)) {
            event.target.classList.add('favorite');
            favoriteBooks.push(dataId);
          } else {
            event.target.classList.remove('favorite');
            favoriteBooks.splice(favoriteBooks.indexOf(dataId), 1);
          }
          console.clear();
        }
      });
    document
      .querySelector(select.elements.filters)
      .addEventListener('click', function (event) {
        if (event.target.matches('input[type="checkbox"]')) {
          const value = event.target.value;
          if (!filters.includes(value)) {
            filters.push(value);
          } else {
            filters.splice(filters.indexOf(value), 1);
          }
        }
        filterAction();
      });
  }

  function filterAction() {
    console.clear();
    let filterAction = [];
    const data = dataSource.books;
    for (let book of data) {
      const bookImageDOM = document.querySelectorAll(select.elements.bookImage);
      for (let filter of filters) {
        if (book.details[filter]) {
          if (!filterAction.includes(data.indexOf(book))) {
            filterAction.push(data.indexOf(book));
          }
        }
      }
      if (filterAction.includes(data.indexOf(book))) {
        bookImageDOM[data.indexOf(book)].classList.add('hidden');
      } else {
        bookImageDOM[data.indexOf(book)].classList.remove('hidden');
      }
    }
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
