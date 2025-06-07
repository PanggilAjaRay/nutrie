import { FoodItem, APIResponse, transformFoodItem } from '../types';

const API_URL = 'https://expert-winner-rv4j4v9qwxvcx6x-8055.app.github.dev';

interface SingleItemResponse {
  data: FoodItem;
}

export const fetchItems = async (): Promise<FoodItem[]> => {
  const response = await fetch(`${API_URL}/items/Food_items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  const data: APIResponse<FoodItem> = await response.json();
  return data.data.map(transformFoodItem);
};

export const fetchItemById = async (id: string): Promise<FoodItem> => {
  const response = await fetch(`${API_URL}/items/Food_items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch item');
  }
  const data: SingleItemResponse = await response.json();
  return transformFoodItem(data.data);
};

export const createItem = async (formData: FormData): Promise<{ id: string }> => {
  const response = await fetch(`${API_URL}/items/Food_items`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

export const updateItem = async (id: string, formData: FormData): Promise<void> => {
  const response = await fetch(`${API_URL}/items/Food_items/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to update item');
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/items/Food_items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
};