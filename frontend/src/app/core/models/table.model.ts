export interface Table {
  id?: number;
  number: number;
  capacity: number;
  status: TableStatus;
}

export type TableStatus = 
  | 'AVAILABLE' 
  | 'OCCUPIED' 
  | 'RESERVED';

export const TABLE_STATUS = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  RESERVED: 'RESERVED'
} as const;

export const TABLE_STATUS_LABELS = {
  AVAILABLE: 'Disponible',
  OCCUPIED: 'Ocupada',
  RESERVED: 'Reservada'
};