export interface Dish {
  id?: number;
  name: string;
  description: string;
  price: string | number;
  category: number;
  category_name?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export const DISH_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const;