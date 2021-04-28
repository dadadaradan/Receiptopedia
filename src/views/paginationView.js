import View from "./View.js";

class paginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerRenderPage(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn-inline`);
      if (!btn) return;
      handler(+btn.dataset.gotopage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(curPage, totalPages);

    // IF on page 1 and there are other Pages;
    if (curPage === 1 && totalPages > 1) {
      return `<button data-goToPage=${
        curPage + 1
      } class="btn-inline btn-right">Page <span class="Page_nr forth">${
        curPage + 1
      }</span> &rarr;</button>`;
    }

    // if On a middle page and there are back/forth buttons
    if (curPage > 1 && curPage < totalPages) {
      return `
      <button data-goToPage=${
        curPage - 1
      } class="btn-inline btn-left">&larr; Page <span class="Page_nr back">${
        curPage - 1
      }</span></button>
      <button data-goToPage=${
        curPage + 1
      } class="btn-inline btn-right">Page <span class="Page_nr forth">${
        curPage + 1
      }</span> &rarr;</button>`;
    }

    // if on the last page and only the button to go back is required.
    if (curPage === totalPages && totalPages > 1) {
      return `
      <button data-goToPage=${
        curPage - 1
      } class="btn-inline btn-left">&larr; Page <span class="Page_nr back">${
        curPage - 1
      }</span></button>
      `;
    }
    // If on Page 1 and there are no other pages;
    return ``;
  }
}

export default new paginationView();
