
{
  'use strict'

  const select = {

    templateOf: {
      templateBook: "#template-book"
    },

    panel: {
      productsList: ".books-list"
    }
  };

  
   const menuProductTemplate = Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML); 
  


  function render(){
    for (let book of dataSource.books){
    
    const generatedHTML = menuProductTemplate(book); //tworzymy czysty kod html ktory jest polaczeniem szablonu template oraz danych z data.js
    console.log("kod html:",generatedHTML)
    const elementDOM = utils.createDOMFromHTML(generatedHTML);  //na podstawie tego stworzenoego kodu html tworzymy jeden obiekt DOM (jedna ksiazke)
    console.log("obiekt DOM:",elementDOM)
    const menuContainer = document.querySelector(select.panel.productsList);  //szukamy miejsca przy pomocy selektora gdzie dorzucic liste ksiazek 
    console.log("kontener z lista ksiazek:",menuContainer)
    menuContainer.appendChild(elementDOM); //dodajemy ksiazki za pomoca petli ppojedynczo  jako elemnty DOM do listy 

    }
  }
  render()

}

