{
  ('use strict');


  const select = {
    templateOf: {
      templateBook: '#template-book',
    },

    panel: {
      productsList: '.books-list',
      productsImage: '.book__image',
      filtersForm: '.filters',
    },
  };

  favoriteBooks = [];
  filters = [];

  const menuProductTemplate = Handlebars.compile(
    document.querySelector(select.templateOf.templateBook).innerHTML
  );

  function render(){
    for (let book of dataSource.books) {

      const bookClass = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      book.bookClass = bookClass;
      
      const generatedHTML = menuProductTemplate(book); //tworzymy czysty kod html ktory jest polaczeniem szablonu template oraz danych z data.js
      //console.log('kod html:',generatedHTML);
      const elementDOM = utils.createDOMFromHTML(generatedHTML); //na podstawie tego stworzenoego kodu html tworzymy jeden obiekt DOM (jedna ksiazke)
      //console.log('obiekt DOM:',elementDOM);
      const menuContainer = document.querySelector(select.panel.productsList); //szukamy miejsca przy pomocy selektora gdzie dorzucic liste ksiazek
      //console.log('kontener z lista ksiazek:',menuContainer);
      menuContainer.appendChild(elementDOM); //dodajemy ksiazki za pomoca petli ppojedynczo  jako elemnty DOM do listy
    }
  }

  function initAction() {
    const booksList = document.querySelector(select.panel.productsList);

    booksList.addEventListener('dblclick', function (event) {
      const mouseTarget = event.target.offsetParent;

      if (mouseTarget.classList.contains('book__image')) {
        event.preventDefault();

        const dataId = mouseTarget.getAttribute('data-id');
        const toggleResult = mouseTarget.classList.toggle('favorite');

        if (toggleResult) {
          favoriteBooks.push(dataId);
        } else {
          const indexOff = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(indexOff, 1);
        }
      }
    });

    const filter = document.querySelector(select.panel.filtersForm);

    filter.addEventListener('change', function (event) {
      const mouseFilterTarget = event.target.getAttribute('value');
      const checked = event.target.checked;

      if (checked) {
        filters.push(mouseFilterTarget);
      } else {
        filters.splice(filters.indexOf(mouseFilterTarget, 1));
      }

      filterBooks();
    });
  }

  function filterBooks() {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImgElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (shouldBeHidden) {
        bookImgElement.classList.add('hidden');
      } else if (bookImgElement.classList.contains('hidden')) {
        bookImgElement.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){

    if (rating < 6){
      return 'rating1';
    }
    else if (rating > 6 && rating <= 8 ){
      return 'rating2';
    }
    else if (rating > 8 && rating <= 9){
      return 'rating3';
    }
    else if (rating > 9){
      return 'rating4';
    }
  }

  render();
  initAction(); 
  








  class BooksList {
    constructor() {
     const thisBookList = this;
    
     thisBookList.render();   //wywolujemy funkcje w ten sposob poniewaz tutaj this wskazuje na objekt this wskazuje na funkcje render

    }
  
    initData() {
      const thisBookList = this;
      
      this.data = dataSource.books;

    }
    render(){
      for (let book of dataSource.books) {
  
        const bookClass = determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        book.bookClass = bookClass;
        
        const generatedHTML = menuProductTemplate(book); //tworzymy czysty kod html ktory jest polaczeniem szablonu template oraz danych z data.js
        //console.log('kod html:',generatedHTML);
        const elementDOM = utils.createDOMFromHTML(generatedHTML); //na podstawie tego stworzenoego kodu html tworzymy jeden obiekt DOM (jedna ksiazke)
        //console.log('obiekt DOM:',elementDOM);
        const menuContainer = document.querySelector(select.panel.productsList); //szukamy miejsca przy pomocy selektora gdzie dorzucic liste ksiazek
        //console.log('kontener z lista ksiazek:',menuContainer);
        menuContainer.appendChild(elementDOM); //dodajemy ksiazki za pomoca petli ppojedynczo  jako elemnty DOM do listy
      }
    }
    getElements() {
      const thisBookList = this;

      thisBookList.productsList = thisBookList.element.querySelector(select.panel.productsList);
      thisBookList.filtersForm = thisBookList.element.querySelector(select.panel.filtersForm);
    }
  
    initActions() {
      const thisBookList = this;
      
  
        thisBookList.productsList.addEventListener('dblclick', function (event) {
          const mouseTarget = event.target.offsetParent;
    
          if (mouseTarget.classList.contains('book__image')) {
            event.preventDefault();
    
            const dataId = mouseTarget.getAttribute('data-id');
            const toggleResult = mouseTarget.classList.toggle('favorite');
    
            if (toggleResult) {
              favoriteBooks.push(dataId);
            } else {
              const indexOff = favoriteBooks.indexOf(dataId);
              favoriteBooks.splice(indexOff, 1);
            }
          }
        });
  
        thisBookList.filtersForm.addEventListener('change', function (event) {
          const mouseFilterTarget = event.target.getAttribute('value');
          const checked = event.target.checked;
    
          if (checked) {
            filters.push(mouseFilterTarget);
          } else {
            filters.splice(filters.indexOf(mouseFilterTarget, 1));
          }
    
          filterBooks();
        });
      
    }
  
    filterBooks() {
      const thisBookList = this;
      
    }
  
    determineRatingBgc() {
      const thisBookList = this;
      
    }
  
  }
  
  const app = new BooksList();

}


