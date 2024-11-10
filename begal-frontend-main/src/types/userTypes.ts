interface LoginData {
  email: string;
  password: string;
}

interface UserProfile {
  name: string;
  email: string;
  address: {
    detail: string;
    district: string;
    province: string;
    regency: string;
    street: string;
    village: string;
  };
  role: string;
  phone: number;
}

export type { LoginData, UserProfile };
