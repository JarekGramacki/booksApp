{
  ("use strict");

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
  filters = [];
  console.log(filters);
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

    filter.addEventListener("click", function (event) {
      const mouseFilterTarget = event.target.getAttribute("value");
      if (mouseFilterTarget) {
        filters.push(mouseFilterTarget);
      } else {
        filters.splice(filters.indexOf(mouseFilterTarget, 1));
      }
    });
  }
}
