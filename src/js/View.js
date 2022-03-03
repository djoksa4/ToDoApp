import { strikeThrough } from "./helpers.js";

class View {
  #formElement = document.querySelector(".add__item");
  #listElement = document.querySelector(".list");
  #clearBtn = document.querySelector(".clear__btn");
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
        const btn = e.target.closest(".remove__btn");
        if (!btn) return;
        const listItem = btn.parentElement;
        this.#listElement.removeChild(listItem);
      }.bind(this)
    );
  }

  addHandlerDone() {
    this.#listElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".done__btn");
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
    this.#formElement.querySelector(".add__item--submit").value = "";
  }

  // Gets and returns the input field
  qetQuery() {
    const value = this.#formElement.querySelector(".add__item--submit").value;
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
        <li class="list__item">
            <span>${this.#data}</span>
            <button class="btn remove__btn">X</button>
            <button class="btn done__btn">DONE</button>
        </li>
      `;
  }
}

export default new View();
