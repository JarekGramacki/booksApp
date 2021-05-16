
{
  'use strict';

  const select = {

    templateOf: {
      templateBook: '#template-book'
    },

    panel: {
      productsList: '.books-list',
      productsImage: '.book__image'
    }
  };

  
  const menuProductTemplate = Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML); 
  


  function render(){
    for (let book of dataSource.books){
    
      const generatedHTML = menuProductTemplate(book); //tworzymy czysty kod html ktory jest polaczeniem szablonu template oraz danych z data.js
      //console.log('kod html:',generatedHTML);
      const elementDOM = utils.createDOMFromHTML(generatedHTML);  //na podstawie tego stworzenoego kodu html tworzymy jeden obiekt DOM (jedna ksiazke)
      //console.log('obiekt DOM:',elementDOM);
      const menuContainer = document.querySelector(select.panel.productsList);  //szukamy miejsca przy pomocy selektora gdzie dorzucic liste ksiazek 
      //console.log('kontener z lista ksiazek:',menuContainer);
      menuContainer.appendChild(elementDOM); //dodajemy ksiazki za pomoca petli ppojedynczo  jako elemnty DOM do listy 

    }
  }

  render();
  initAction();

  favoriteBooks = [];
  //console.log(favoriteBooks)
  
  function initAction (){

    const booksListImage = document.querySelectorAll(select.panel.productsImage); //zmajdujemy e html i przypisujemy do zmiennej selektor z image 
    
    for (let bookImage of booksListImage){
      bookImage.addEventListener('dblclick',function(event){ //dodajemy nasluchiwacz dblclick za pomoca petli iterujacej po image ksiazek z funkcja calback 
        event.preventDefault();//blokowanie domyslnego zachowania przegladarki 
        bookImage.classList.toggle('favorite'); // dodano funkcję toggle ktora dodaje lub zabiera clase favorite
        console.log(event)
        favoriteBooks.push(bookImage);//wypychamy do tablicy favoriteBooks bookImage
        
      });
   
    }

  }

}

