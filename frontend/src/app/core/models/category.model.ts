export interface Category {
  id?: number;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export const CATEGORY_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const;
