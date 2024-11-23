/* eslint-disable @typescript-eslint/ban-ts-comment */
const DEFAULT_STATE = {
    token: "",
    user: {
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
      created_at: "",
      updated_at: "",
    },
  };
  
  //@ts-expect-error
  export const userReducer = (state = DEFAULT_STATE, action) => {
    if (action.type === "SET_USER") {
      return {
        ...state,
        token: action.payload.token,
        user: {
          ...state.user,
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          phone: action.payload.user.phone,
          role: action.payload.user.role,
          profile_picture_url: action.payload.user.profile_picture_url,
          address: {
            ...state.user.address,
            ...action.payload.user.address,
          },
          created_at: action.payload.user.created_at,
          updated_at: action.payload.user.updated_at,
        },
      };
    }
  
    return state;
  };
  