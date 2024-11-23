export const addToCart = (cartItem) => ({
    type: "ADD_TO_CART",
    payload: cartItem,
  });
  
  export const updateCartItem = (cartItem) => ({
    type: "UPDATE_CART_ITEM",
    payload: cartItem,
  });
  
  export const removeFromCart = (id) => ({
    type: "REMOVE_FROM_CART",
    payload: id,
  });
  