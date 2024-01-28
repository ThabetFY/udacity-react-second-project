// test-utils.js
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import rootReducer from "../store/reducers";
import middleware from "../store/middleware";

function render(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState, middleware),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter {...renderOptions}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
