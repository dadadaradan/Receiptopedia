import { async } from "q";
import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      cookTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      link: recipe.source_url,
      title: recipe.title,
    };
    console.log(recipe);

    if (state.bookmarks.some((rec) => rec.id === id)) {
      state.recipe.bookmark = true;
    }
  } catch (err) {
    throw err;
  }
}

export async function loadSearch(query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
}

export function loadPagination(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * 10;
  const end = page * 10;
  //   console.log(state.search.results.slice(start, end));
  return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4

  state.recipe.servings = newServings;
}

export function setBookmark(recipe) {
  state.bookmarks.push(recipe);

  if (state.recipe.id === recipe.id) {
    state.recipe.bookmark = true;
  }

  console.log(state.bookmarks);
}

export function removeBookmark(id) {
  state.recipe.bookmark = false;
  const index = state.bookmarks.findIndex((el) => el.id == id);

  state.bookmarks.splice(index, 1);
}
