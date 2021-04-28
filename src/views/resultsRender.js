import View from "./View.js";

class resultsRender extends View {
  _parentElement = document.querySelector(`.results`);
  _errorMessage = `No recipes found for your query! Please try again ;)`;

  // renderSpinner();

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    const markup = this._data

      .map((elem) => {
        return `
      <li class="results__item">
          <a href="#${elem.id}" class="results__link ${
          elem.id === id ? "results__link--active" : ""
        }">
              <figure class="results__img--container">
                  <img src="${elem.image}" alt="${
          elem.title
        }" class="results__img">
              </figure>
              <div class="results__link--details">
                  <h3 class="results__heading">
                  ${
                    elem.title.length > 27
                      ? elem.title.slice(0, 24) + "..."
                      : elem.title
                  }
                  </h3>
                  <p class="results__paragraph">${elem.publisher}</p>
              </div>
          </a>
      </li>
`;
      })
      .join(``);
    return markup;
  }
}

export default new resultsRender();
