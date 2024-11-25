import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./types/App";
import store from "./store/store";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
