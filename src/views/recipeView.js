// import Fraction from "fractional";
import View from "./View.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".section__recipe");
  _errorMessage = `Sorry, no results found for your search. Please try again !`;

  addHandlerRender(handler) {
    [`hashchange`, `load`].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerServingsControl(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.recipe__portion`);
      if (!btn) return;
      const updateTo = +btn.dataset.servings;

      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerSetBookmark(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.recipe__bookmark`);
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
  <figure class="recipe__figure">
  <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img">
<h1 class="recipe__heading">
   <span>${this._data.title}</span>
</h1>
</figure>
<div class="recipe__details">
    <div class="recipe__detail">
        <span class="recipe__icon--container">
            <svg class="recipe__icon">
                <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-clock"></use>
            </svg>
        </span>
        <p class="recipe__paragraph">
            <b>${this._data.cookTime}</b> minutes
        </p>
    </div>

    <div class="recipe__detail">
        <span class="recipe__icon--container">
            <svg class="recipe__icon">
                <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-users"></use>
            </svg>
        </span>
        <p class="recipe__paragraph">
            <b>${this._data.servings}</b> Servings
        </p>
        <button class="recipe__portion" data-servings="${
          this._data.servings + 1
        }">
            <svg class="recipe__portion--icon">
                <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-user-plus"></use>
            </svg>
        </button>
        <button class="recipe__portion" data-servings="${
          this._data.servings - 1
        }">
            <svg class="recipe__portion--icon">
                <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-user-minus"></use>
            </svg>
        </button>
    </div>
   
    <button class="header__logo--container recipe__bookmark">
        <svg class="recipe__bookmark--icon${
          this._data.bookmark ? `-bookmarked` : ``
        }">
          <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-bookmark"></use>
        </svg>
    </button>
</div>
<div class="recipe__ingredients">
    <h2 class="recipe__ingredients--title">
        Recipe Ingredients
    </h2>
    <ul class="recipe__ingredients--list">

    ${this._data.ingredients
      .map((ing) => {
        // console.log(ing.quantity);
        return `
      <li class="recipe__ingredients--item">
          <svg class="recipe__ingredients--icon">
              <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-point-right"></use>
          </svg>
           <p> ${ing.quantity} ${ing.unit} ${ing.description} </p>
        </li>
      `;
      })
      .join(``)}
   
    </div>
    <div class="recipe__howto">
    <h2 class="recipe__ingredients--title">How to cook it</h2> 
    <p class="recipe__howto--paragraph">
    This recipe was carefully designed and tested by <span class="receipt__source">Two Peas and Their Pod</span>. Please check out directions at their website.
    </p>
    <a href="${
      this._data.link
    }" class="recipe__howto--link">Directions &rarr;</a>
    </div>
    `;
  }
}

export default new RecipeView();
