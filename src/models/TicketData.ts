export interface Event {
  id: number;
  name: string;
  subname: string | null;
  slug: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  start_date: string;
  finish_date: string;
}

export interface Ticket {
  id: number;
  name: string;
  slug: string;
  event_id: number;
  ticket_type: string;
  status: number;
  price: string;
  price_old: string | null;
  is_early_bird: boolean;
  early_bird_price: string | null;
  early_bird_end_date: string | null;
  allowed_gender: string;
  min_age: number | null;
  max_age: number | null;
  description: string;
  is_visible: boolean;
  image: string;
  event: Event;
}

export interface TicketDetailData {
  id:number;
  email: string;
  name: string;
  gender: string;
  birthdate: string;
  quantity: number;
  price: string;
  reference_number: string;
  payment_status: string;
  payment_intent_id: string;
  payment_completed_at: string | null;
  ticket: Ticket;
}

export interface TicketQrData {
  reference_number: string;
  qr_code_url: string;
}

export interface TicketItem {
  reference_number: string;
  event: Event;
  ticket: Ticket;
  quantity: number;
}