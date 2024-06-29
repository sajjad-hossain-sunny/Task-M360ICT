export interface Reviews {
  rating: number;
  comment: string;
  reviewerEmail: string;
  reviewerName: string;
  date: string;
}

export interface Products {
  id: number;
  title: string;
  brand: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  description?: string;
  thumbnail?: string;
  dimensions: {
    width: string;
    height: string;
  };
  category?: string;
  tags?: Array<string>,
  availabilityStatus?: string,
  shippingInformation?: string,
  returnPolicy?: string,
  reviews: Reviews[],
}
