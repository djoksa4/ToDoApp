import * as model from "./model.js";
import view from "./View.js";
import "core-js/stable";

const addToList = function () {
  // 1. Get the input field string
  const input = view.qetQuery();

  // 2. Update the state with the string
  model.updateState(input);

  // 3. Add an entry to the list
  view.render(model.state.item);
};

// // Publisher - subsriber pattern initialization
const init = function () {
  view.addHandlerInput(addToList);
  view.addHandlerClear();
  view.addHandleRemoveItem();
  view.addHandlerDone();
};
init();
