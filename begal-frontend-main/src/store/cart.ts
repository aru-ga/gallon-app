const DEFAULT_STATE = {
    items: [] as Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      stock: number;
      image_url: string;
      quantity: number;
      seller_id: string;
      seller_name: string;
    }>,
  };
  
  export const cartReducer = (state = DEFAULT_STATE, action) => {
    if (action.type === "ADD_TO_CART") {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
  
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, { ...action.payload }] };
      }
    } else if (action.type === "REMOVE_FROM_CART") {
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    } else if (action.type === "UPDATE_CART_ITEM") {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items: updatedItems };
    } else if (action.type === "CLEAR_CART") {
      return { ...state, items: [] };
    } else {
      return state;
    }
  };
  