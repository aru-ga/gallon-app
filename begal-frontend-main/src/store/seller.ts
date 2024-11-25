/* eslint-disable @typescript-eslint/ban-ts-comment */
const DEFAULT_STATE = {
  token: "",
  seller: {
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    profile_picture_url: null,
    address: {
      province: "",
      regency: "",
      district: "",
      village: "",
      street: "",
      detail: "",
    },
    operational_hours: {
      open: "",
      close: "",
    },
    rating: "",
    review_count: "",
    created_at: "",
    updated_at: "",
  },
};

//@ts-expect-error
export const sellerReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "SET_SELLER") {
    return {
      ...state,
      token: action.payload.token,
      seller: {
        ...state.seller,
        id: action.payload.seller.id,
        name: action.payload.seller.name,
        email: action.payload.seller.email,
        phone: action.payload.seller.phone,
        role: action.payload.seller.role,
        profile_picture_url: action.payload.seller.profile_picture_url,
        address: {
          ...state.seller.address,
          ...action.payload.seller.address,
        },
        operational_hours: {
          ...state.seller.operational_hours,
          ...action.payload.seller.operational_hours,
        },
        rating: action.payload.seller.rating,
        review_count: action.payload.seller.review_count,
        created_at: action.payload.seller.created_at,
        updated_at: action.payload.seller.updated_at,
      },
    };
  }

  return state;
};
