import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsRender from "./views/resultsRender.js";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultsRender.update(model.loadPagination());

    await model.loadRecipe(id);

    bookmarksView.update(model.state.bookmarks);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

async function controlSearch() {
  try {
    paginationView._clear();

    resultsRender.renderSpinner();

    const query = searchView.getQuery();
    if (query === "") {
      resultsRender._clear();
      return;
    }
    await model.loadSearch(query);
    if (model.state.search.results.length === 0) {
      throw new Error();
    }
    resultsRender.render(model.loadPagination());
    paginationView.render(model.state.search);
  } catch (err) {
    resultsRender.renderError();
  }
}

function controlPagination(page) {
  resultsRender.render(model.loadPagination(page));
  paginationView.render(model.state.search);
}

function controlServings(updatedServings) {
  model.updateServings(updatedServings);
  recipeView.update(model.state.recipe);
}

function controlSetBookmark() {
  if (!model.state.recipe.bookmark) model.setBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServingsControl(controlServings);
  recipeView.addHandlerSetBookmark(controlSetBookmark);
  searchView.addHandlerGetQuery(controlSearch);
  paginationView.addHandlerRenderPage(controlPagination);
}
init();
