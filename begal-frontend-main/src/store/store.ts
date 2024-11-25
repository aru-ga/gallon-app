import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./user";
import {cartReducer} from "./cart";
import {sellerReducer} from "./seller";

const store = configureStore({
  reducer: {
    user: userReducer,  
    cart: cartReducer,
    seller: sellerReducer,
  },
});

export default store;
