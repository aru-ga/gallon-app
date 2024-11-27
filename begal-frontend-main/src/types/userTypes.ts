interface LoginData {
  email: string;
  password: string;
}

interface UserProfileWithConfirmPassword {
  address: {
    province: string;
    regency: string;
    district: string;
    village: string;
    detail?: string;  
    street?: string;
  };
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone: number;
  profile_picture_url: string;
}


interface UserProfile {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;  
  address: {
    detail: string;
    district: string;
    province: string;
    regency: string;
    street: string;
    village: string;
  };
  role: string;
  phone: string;
  profile_picture_url: string;
}

interface SellerProfile {
  owner_name: string,
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string,
  address: {
    province: string,
    regency: string,
    district: string,
    village: string,
    street: string,
    detail: string
  },
  operational_hours: {
    open: string,
    close: string
  }
}


export type { LoginData, UserProfile, UserProfileWithConfirmPassword, SellerProfile };
