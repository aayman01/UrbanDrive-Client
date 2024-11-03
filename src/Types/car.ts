export interface ICar {
    email: string;
    _id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    description: string;
    features: string[];
    category: string;
    rental_price_per_day: number;
    rental_duration: number;
    availability: boolean;
    total_price: number;
    membership: string;
    rating: number;
    review: string;
    name: string;
    date: number;
    seatCount: number;
    trip_count: number;
    plan_type: string;
    averageRating: number;
    reviewCount: number;
    categoryRatings: Array<{ label: string; value: number }>;
    discount: number;
    rental_price_per_day: number
}
