export interface Delivery {
  id?: number;
  address: string;
  phone: string;
  customer_name: string;
  cost: string | number;
  delivery_person?: number;
  delivery_person_name?: string;
  order_id?: number;
}

export interface DeliveryPerson {
  id?: number;
  name: string;
  phone: string;
  status: DeliveryPersonStatus;
}

export type DeliveryPersonStatus = 
  | 'AVAILABLE' 
  | 'BUSY' 
  | 'OFFLINE';

export const DELIVERY_PERSON_STATUS = {
  AVAILABLE: 'AVAILABLE',
  BUSY: 'BUSY',
  OFFLINE: 'OFFLINE'
} as const;

export const DELIVERY_PERSON_STATUS_LABELS = {
  AVAILABLE: 'Disponible',
  BUSY: 'Ocupado',
  OFFLINE: 'Desconectado'
};