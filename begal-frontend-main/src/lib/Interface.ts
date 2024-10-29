interface NavbarProps {
  activePath: string;
}

interface DepotType {
  id: string;
  name: string;
  address: {
    province: string;
    regency: string;
    district: string;
    village: string;
    street: string;
    detail: string;
  };
  imageUrl?: string;
  ratings?: number;
  reviewsCount?: number;
  operationalHours?: {
    open: string;
    close: string;
  };
}

interface CardDepotType  {
  id: string;
  imageUrl?: string;
  name: string;
  location: string;
  ratings: number;
  className?: string;
};

interface CardProductType {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string | null;
  className?: string;
}

export type { NavbarProps, DepotType, CardDepotType, CardProductType };
