// Common types for the application

export interface NutritionalValue {
  energy: number;
  protein: number;
  carbohydrates: number;
  sugar: number;
  fat: number;
  salt?: number; // Optional for beverages
}

export interface APIResponse<T> {
  data: T[];
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  category: 'food' | 'beverage';
  price: number;
  image: string;
  energy: number;
  protein: number;
  carbohydrates: number;
  sugar: number;
  fat: number;
  salt?: number;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin';
}

// Helper function to transform API response to frontend format
export const transformFoodItem = (item: FoodItem): FoodItem & { imageUrl: string } => {
  return {
    ...item,
    imageUrl: `https://expert-winner-rv4j4v9qwxvcx6x-8055.app.github.dev/assets/${item.image}`
  };
};