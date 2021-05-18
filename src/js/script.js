{
  ("use strict");

  const select = {
    templateOf: {
      templateBook: "#template-book",
    },

    panel: {
      productsList: ".books-list",
      productsImage: ".book__image",
    },
  };

  const menuProductTemplate = Handlebars.compile(
    document.querySelector(select.templateOf.templateBook).innerHTML
  );

  function render() {
    for (let book of dataSource.books) {
      const generatedHTML = menuProductTemplate(book); //tworzymy czysty kod html ktory jest polaczeniem szablonu template oraz danych z data.js
      //console.log('kod html:',generatedHTML);
      const elementDOM = utils.createDOMFromHTML(generatedHTML); //na podstawie tego stworzenoego kodu html tworzymy jeden obiekt DOM (jedna ksiazke)
      //console.log('obiekt DOM:',elementDOM);
      const menuContainer = document.querySelector(select.panel.productsList); //szukamy miejsca przy pomocy selektora gdzie dorzucic liste ksiazek
      //console.log('kontener z lista ksiazek:',menuContainer);
      menuContainer.appendChild(elementDOM); //dodajemy ksiazki za pomoca petli ppojedynczo  jako elemnty DOM do listy
    }
  }

  render();
  initAction();

  favoriteBooks = [];
  //console.log(favoriteBooks)

  function initAction() {
    //const booksListImage = document.querySelectorAll(select.panel.productsImage);
    const productsPanel = document.querySelector(select.panel.productsList);

    productsPanel.addEventListener("dblclick", function (event) {
      const mouseTarget = event.target.offsetParent;

      if (mouseTarget.classList.contains("book__image")) {
        event.preventDefault();

        const dataId = mouseTarget.getAttribute("data-id"); // wyciagamy atrybut data-id
        const toggleResult = mouseTarget.classList.toggle("favorite"); // zapisujemy wynik toggle

        if (toggleResult) {
          // jezeli jest true - klasa zostala dodana (do classList)
          favoriteBooks.push(dataId);
        } else {
          // jezeli jest false - klasa została usunieta z classList
          // sprawdzamy pozycje dataId w tablicy i go usuwamy
          const indexOfDataId = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(indexOfDataId, 1);
        }

        // if (mouseTarget.classList.toggle("favorite")){
        //     favoriteBooks.push(mouseTarget.getAttribute("data-id"));
        // }else{
        //  favoriteBooks.splice(favoriteBooks.indexOf(mouseTarget.getAttribute("data-id")),1)
        // }
      }
    });
  }
}