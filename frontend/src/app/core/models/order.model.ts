import { Dish } from './dish.model';

export interface Order {
  id?: number;
  date?: string;
  status: OrderStatus;
  status_display?: string;
  total: string | number;
  order_type: OrderType;
  order_type_display?: string;
  table?: number;
  delivery?: number;
  order_details?: OrderDetail[];
}

export type OrderStatus = 
  | 'PENDING' 
  | 'PREPARING' 
  | 'READY' 
  | 'DELIVERED' 
  | 'CANCELLED';

export type OrderType = 
  | 'DINE_IN' 
  | 'TAKEOUT' 
  | 'DELIVERY';

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PREPARING: 'PREPARING',
  READY: 'READY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
} as const;

export const ORDER_STATUS_LABELS = {
  PENDING: 'Pendiente',
  PREPARING: 'En Preparación',
  READY: 'Listo',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado'
};

export const ORDER_TYPE = {
  DINE_IN: 'DINE_IN',
  TAKEOUT: 'TAKEOUT',
  DELIVERY: 'DELIVERY'
} as const;

export const ORDER_TYPE_LABELS = {
  DINE_IN: 'Para comer aquí',
  TAKEOUT: 'Para llevar',
  DELIVERY: 'Delivery'
};

export interface OrderDetail {
  id?: number;
  order?: number;
  dish: number;
  dish_name?: string;
  dish_details?: Dish;
  quantity: number;
  unit_price: string | number;
  subtotal: string | number;
}
