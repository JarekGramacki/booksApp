
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
    
    const generatedHTML = menuProductTemplate(book);
    console.log("kod html:",generatedHTML)
    const elementDOM = utils.createDOMFromHTML(generatedHTML);  
    console.log("obiekt DOM:",elementDOM)
    const menuContainer = document.querySelector(select.panel.productsList); 
    console.log("kontener z lista ksiazek:",menuContainer)
    menuContainer.appendChild(elementDOM);

    }
  }
  render()

}

