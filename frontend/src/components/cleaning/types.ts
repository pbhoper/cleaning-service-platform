export interface Company {
  id: number;
  name: string;
  logo: string | null;
  address: string;
  rating: number;
  estimatedPrice: number;
  distanceKm: number | null;
  popularity: number;
}

export interface BookingFormData {
  address: string;
  cleaningType: string;
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
  date?: string;
  startTime?: string;
  recurrence: string;
  recurrenceDurationMonths?: number;
  contact?: string;
}