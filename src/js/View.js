import { strikeThrough } from "./helpers.js";

class View {
  #formElement = document.querySelector(".input-area__form");
  #listElement = document.querySelector(".list-area__list");
  #clearBtn = document.querySelector(".input-area__btn--clear");
  #data;

  // Publisher - subsriber patterns for event listening
  addHandlerInput(handler) {
    this.#formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerClear() {
    this.#clearBtn.addEventListener("click", this.clearList.bind(this));
  }

  addHandleRemoveItem() {
    this.#listElement.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".list-area__btn--remove");
        if (!btn) return;
        const listItem = btn.parentElement;
        this.#listElement.removeChild(listItem);
      }.bind(this)
    );
  }

  addHandlerDone() {
    this.#listElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".list-area__btn--done");
      if (!btn) return;
      const listItem = btn.parentElement;
      listItem.firstElementChild.textContent = strikeThrough(
        listItem.firstElementChild.textContent
      );
    });
  }

  // Clears all items on the list
  clearList() {
    this.#listElement.innerHTML = "";
  }

  // Clears the input field
  #clearInput() {
    this.#formElement.querySelector(".input-area__text").value = "";
  }

  // Gets and returns the input field
  qetQuery() {
    const value = this.#formElement.querySelector(".input-area__text").value;
    this.#clearInput();
    return value;
  }

  render(data) {
    this.#data = data;
    if (!data) return;
    const markup = this.#generateMarkup();
    this.#listElement.insertAdjacentHTML("beforeend", markup);
  }

  #generateMarkup() {
    return `
        <li class="list-area__list-item">
            <span>${this.#data}</span>
            <button class="btn list-area__btn--remove">X</button>
            <button class="btn list-area__btn--done">DONE</button>
        </li>
      `;
  }
}

export default new View();
