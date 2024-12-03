export const addToCart = (cartItem: any) => ({
    type: "ADD_TO_CART",
    payload: cartItem,
  });
  
  export const updateCartItem = (cartItem: any) => ({
    type: "UPDATE_CART_ITEM",
    payload: cartItem,
  });
  
  export const removeFromCart = (id: string) => ({
    type: "REMOVE_FROM_CART",
    payload: id,
  });
  