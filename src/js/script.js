{
  ("use strict");

  favoriteBooks = [];
  filters = [];

  const select = {
    templateOf: {
      templateBook: "#template-book",
    },

    panel: {
      productsList: ".books-list",
      productsImage: ".book__image",
      filtersForm: ".filters",
    },
  };

  const menuProductTemplate = Handlebars.compile(
    document.querySelector(select.templateOf.templateBook).innerHTML
  );

  function render() {
    for (let book of dataSource.books) {

      //const ratingBgc = determineRatingBgc(rating);
     

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

    booksList.addEventListener("dblclick", function (event) {
      const mouseTarget = event.target.offsetParent;

      if (mouseTarget.classList.contains("book__image")) {
        event.preventDefault();

        const dataId = mouseTarget.getAttribute("data-id");
        const toggleResult = mouseTarget.classList.toggle("favorite");

        if (toggleResult) {
          favoriteBooks.push(dataId);
        } else {
          const indexOff = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(indexOff, 1);
        }
      }
    });

    const filter = document.querySelector(select.panel.filtersForm);

    filter.addEventListener("change", function (event) {
      const mouseFilterTarget = event.target.getAttribute("value");
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
        bookImgElement.classList.add("hidden");
      } else if (bookImgElement.classList.contains("hidden")) {
        bookImgElement.classList.remove("hidden");
      }
    }
  }

  function determineRatingBgc(rating){
    if (rating < 6){
      linear-gradient("to bottom,  #fefcea 0%, #f1da36 100%");
    }
    else if (rating > 6 &&  8 ){
      linear-gradient("to bottom, #b4df5b 0%,#b4df5b 100%");
    }
    else if (rating > 8 &&  9){
      linear-gradient("to bottom, #299a0b 0%, #299a0b 100%");
    }
    else if (Rating > 9){
      linear-gradient("to bottom, #ff0084 0%,#ff0084 100%");
    }
  }

  render();
  initAction();  
}
