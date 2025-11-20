export interface ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
  data?: T;
}

export interface ApiError {
  error: string;
  detail?: string;
  errors?: { [key: string]: string[] };
}