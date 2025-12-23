import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
<<<<<<< HEAD
// import { store } from "./store";
=======
import { store } from "./store";
>>>>>>> 880d3a01f445a2d2727c0a9d0498490bf1b41161
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* <Provider store={store}> */}
=======
    <Provider store={store}>
>>>>>>> 880d3a01f445a2d2727c0a9d0498490bf1b41161
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
<<<<<<< HEAD
    {/* </Provider> */}
  </React.StrictMode>
);
=======
    </Provider>
  </React.StrictMode>
);
>>>>>>> 880d3a01f445a2d2727c0a9d0498490bf1b41161
