import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { Provider } from "react-redux";
import store from "store/store";
import { ToastContainer } from "react-toastify";
import App from "app";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeEditorProvider>
        <ToastContainer />
      </React.StrictMode>
    </ChakraProvider>
  </Provider>,

  document.getElementById("root")
);
