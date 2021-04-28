export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    // console.log(this._data);
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll(`*`));
    const curElements = Array.from(this._parentElement.querySelectorAll(`*`));

    newElements.forEach((newEL, i) => {
      const curEl = curElements[i];

      if (
        !newEL.isEqualNode(curEl) &&
        newEL.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEL.textContent;
      }

      if (!newEL.isEqualNode(curEl)) {
        Array.from(newEL.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ``;
  }

  renderSpinner() {
    const spinner = `
    <div class="spinner">
      <svg class="spinner__icon">
        <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-spinner2"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, spinner);
  }

  renderError(message = this._errorMessage) {
    this._clear();
    const markup = `
        <p class="recipe__welcome-paragraph">
            <svg class="recipe__icon">
                <use xlink:href="symbol-defs.5ac5dfdd.svg#icon-warning"></use>
            </svg>
            ${message}
        </p>
    `;
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}
