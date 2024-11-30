import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

// components
import App from "./App";

// store
import { store } from "./redux/store";

// styles
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
