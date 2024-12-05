import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/Auth/authSlice";
import cartSlice from "../Features/Cart/cartSlice";
import categorySlice from "../Features/Category/categorySlice";
import orderSlice from "../Features/Order/orderSlice";
import productSlice from "../Features/Product/productSlice";
import wishListSlice from "../Features/Wishlist/wishListSlice";
import userSlice from "../Features/User/UserSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishListSlice,
    auth: authSlice,
    products: productSlice,
    categories: categorySlice, 
    order: orderSlice,
    user: userSlice,
  },

  // middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false
    }
  ),
});

export default store;
