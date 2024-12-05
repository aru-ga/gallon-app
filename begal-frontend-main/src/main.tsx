import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./types/App";
import store from "./store/store";
import { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
        <Toaster />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
