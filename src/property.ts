export interface Property {
  id: number;
  name: string;
  address: string;
  type: 'House' | 'Apartment' | 'Townhouse';
  listingType: 'For sale' | 'For rent';
  bedrooms: number;
  bathrooms: number;
  parking: number;
  price: number;
  availableDate: Date;
  agentName: string;
  agentEmail: string;
  agentContactNumber?: string;
  isExclusive: boolean; 
}