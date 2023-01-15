{
  ('use strict');

  class BooksApp {
    constructor() {
      this.select = {
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

      this.templates = {
        cartProduct: Handlebars.compile(
          document.querySelector(this.select.templateOf.cartProduct).innerHTML
        ),
      };

      this.settings = {
        dbBooks: 'dataSource.books',
      };

      this.favoriteBooks = [];
      this.filters = [];

      this.initData();
      this.productRender();
      this.prepareRatingBar();
      this.initActions();
    }

    productRender() {
      const books = this.books;
      const productContainer = document.querySelector(
        this.select.elements.booksList
      );
      console.log(books);
      for (let book of books) {
        const generatedHTML = this.templates.cartProduct(book);
        const thisElement = books.indexOf(book);
        this.element = utils.createDOMFromHTML(generatedHTML);
        const rating = book.rating;
        // console.log(book.name + ' - ' + rating);
        productContainer.appendChild(this.element);
        const ratingBarDOM = document.querySelectorAll(
          this.select.elements.rating
        );
        const result = this.prepareRatingBar(rating);
        const ratingBarStyle = result.ratingBarStyle;
        const widthPercentBar = result.widthPercentBar;
        ratingBarDOM[thisElement].style.background = ratingBarStyle;
        ratingBarDOM[thisElement].style.width = widthPercentBar + '%';
      }
    }

    prepareRatingBar(rating) {
      let ratingBarStyle = '';
      // Przygotowanie wartości koloru paska w zależności od oceny
      if (rating < 6) {
        ratingBarStyle = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        ratingBarStyle = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        ratingBarStyle = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        ratingBarStyle = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      //Przygotowanie długości paska w zależności od oceny.
      const widthPercentBar = rating * 10;
      // console.log(widthPercentBar + '%');
      // console.log(ratingBarStyle);
      //Dodawanie stylu paska do strony
      return {
        ratingBarStyle: ratingBarStyle,
        widthPercentBar: widthPercentBar,
      };
    }

    initActions() {
      const thisApp = this;
      document
        .querySelector(thisApp.select.elements.booksList)
        .addEventListener('dblclick', function (event) {
          console.log(thisApp.select.elements.bookImage);
          if (
            event.target &&
            event.target.matches(thisApp.select.elements.bookImage)
          ) {
            //mam problem ze zrozumieniem dlaczego w tym miejscu nie działa mi deklaracja event.target.parentElement.classList.contains('book__image') lub event.target.parentElement.matches('.book__image').
            //w tej chwili dwuklik wyzwala się tylko jak kliknę na ikone serca po wykonaniu hover na obrazku.
            event.preventDefault();
            const dataId = event.target.dataset.id;
            if (!thisApp.favoriteBooks.includes(dataId)) {
              event.target.classList.add('favorite');
              thisApp.favoriteBooks.push(dataId);
            } else {
              event.target.classList.remove('favorite');
              thisApp.favoriteBooks.splice(
                thisApp.favoriteBooks.indexOf(dataId),
                1
              );
            }
            console.clear();
          }
        });
      document
        .querySelector(thisApp.select.elements.filters)
        .addEventListener('click', function (event) {
          if (event.target.matches('input[type="checkbox"]')) {
            const value = event.target.value;
            if (!thisApp.filters.includes(value)) {
              thisApp.filters.push(value);
            } else {
              thisApp.filters.splice(thisApp.filters.indexOf(value), 1);
            }
          }
          thisApp.filterAction();
          console.log(thisApp.filters);
        });
    }

    filterAction() {
      const thisApp = this;
      const filterAction = [];
      console.clear();
      const books = this.books;
      for (let book of books) {
        const bookImageDOM = document.querySelectorAll(
          this.select.elements.bookImage
        );
        for (let filter of thisApp.filters) {
          if (book.details[filter]) {
            if (!filterAction.includes(books.indexOf(book))) {
              filterAction.push(books.indexOf(book));
            }
          }
        }
        if (filterAction.includes(books.indexOf(book))) {
          bookImageDOM[books.indexOf(book)].classList.add('hidden');
        } else {
          bookImageDOM[books.indexOf(book)].classList.remove('hidden');
        }
      }
    }

    initData() {
      const data = dataSource;
      this.books = data.books;
    }
  }
  const app = new BooksApp();
  app.initData();
}
