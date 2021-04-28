class searchView {
  #Search = document.querySelector(`.header__search`);

  getQuery() {
    const query = this.#Search.querySelector(`.header__search--input`).value;
    this.clearInput();
    return query;
  }

  addHandlerGetQuery(handler) {
    this.#Search.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handler();
    });
  }

  clearInput() {
    this.#Search.querySelector(`.header__search--input`).value = ``;
  }
}

export default new searchView();
