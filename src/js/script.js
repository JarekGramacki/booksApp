{
  ('use strict');


  const select = {
    templateOf: {
      templateBook: '#template-book',
    },

    panel: {
      productsList: '.books-list',
      filtersForm: '.filters',
    },
  };

  favoriteBooks = [];
  filters = [];

  const menuProductTemplate = Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML
  );


  class BooksList {
    constructor() {
     const thisBookList = this;
     //console.log('obiekt ze wszystkimi danymi i funkcjami:', thisBookList)

     thisBookList.favoriteBooks = [];
     thisBookList.filters = [];
     
    
     thisBookList.initData();
     thisBookList.render(); 
     thisBookList.getElements();  //wywolujemy funkcje w ten sposob poniewaz tutaj this wskazuje na objekt this wskazuje na funkcje render
     thisBookList.initActions(); 
    }
  
    initData() {
      const thisBookList = this;
      
      thisBookList.data = dataSource.books;
      //console.log('dane do użycia:', thisBookList.data)

    }
    
    render(){
      const thisBookList = this;

      for (let book of thisBookList.data) {
  
        const bookClass = thisBookList.determineRatingBgc(book.rating);
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
     
      thisBookList.productsList = document.querySelector(select.panel.productsList);
      thisBookList.filtersForm = document.querySelector(select.panel.filtersForm);     
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
    
          thisBookList.filterBooks();
        });
      
    }
  
    filterBooks() {
      

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
  
    determineRatingBgc(rating) {
      

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
  
  }
  
  const app = new BooksList();
//console.log(app)  
  
}


