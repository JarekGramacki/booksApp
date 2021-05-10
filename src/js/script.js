
'use strict';

{
  const select = {
    templateOf: {
      templateBooks: "#template-book"
    },
    panel: {
      booksPanel: ".books-list",
      bookImage: ".book__image"
    },    

  };
  
  const templates = {
    // kompilujemy template z indexu po id (funkcja Handle.compile zwraca funkcję która później 
    // może przyjąć obiekt jako parametr i podstawić dane do templateu) - dane podstawa w placeholdery  {{}}
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBooks).innerHTML)
  }

   function render(){ 
    for(let book of dataSource.books){

      const bookGeneratedHTML = templates.templateBook(book); // generujemy html z podstawionymi danymi ksiazki zamaist placeholderow
      const bookDOMElement = utils.createDOMFromHTML(bookGeneratedHTML); // tworzymy obiekt DOM zamiast czystego tekstu html

      const booksPanel = document.querySelector(select.panel.booksPanel); // szukamy miejsca gdzie dorzucić książki
      booksPanel.appendChild(bookDOMElement); // dodajemy elemnt dom do panelu

    }
  }
  render();
  initActions();

  const favoriteBooks = [];

  function initActions(){
    const booksImages = document.querySelectorAll(select.panel.booksPanel + " " + select.panel.bookImage);

    for(let bookImageElement of booksImages){
      bookImageElement.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookImg = this; 
        bookImg.classList.add('favorite');
      })
    }
  }
}

