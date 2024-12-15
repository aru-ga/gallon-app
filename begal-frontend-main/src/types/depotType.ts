import { productType } from "./productType";

interface depotType {
  products: productType[];
  id: string;
  className: string;
  name: string;
  owner_name: string;
  email: string;
  phone: string;
  role: string;
  profile_picture_url: string;
  address: {
    province: string;
    regency: string;
    district: string;
    village: string;
    street: string;
    detail: string;
  };
  operational_hours: {
    open: string;
    close: string;
  };
  rating: number;
  reviews_count: string;
  created_at: string;
  updated_at: string;
}

interface depotListType {
  depotList: depotType[];
}


export type { depotType, depotListType }
