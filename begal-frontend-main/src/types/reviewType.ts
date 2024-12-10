export interface Review {
  id: string;
  user_id?: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface NewReview {
  seller_id?: string;
  rating: number;
  comment: string;
}
