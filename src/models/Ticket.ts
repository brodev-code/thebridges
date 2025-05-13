export interface Ticket {
    start_sale: string | number | Date;
    end_sale: string | number | Date;
    is_visible?: boolean | undefined;
    early_bird_price?: any;
    early_bird_end_date?: any;
    is_early_bird?: boolean | undefined;
    max_age?: any;
    min_age?: any;
    allowed_gender?: any;
    sale_end_date?: any;
    sale_start_date?: any;
    quota?: string | undefined;
    type?: string | undefined;
    id?: number;
    name?: string;
    subname?: string | null;
    parent?: string | null;
    event_id?: number;
    tickets_available?: number;
    ticket_type?: string;
    status?: number;
    language?: string | null;
    link?: string | null;
    sort?: number;
    description?: string;
    image?: string;
    icon?: string | null;
    price?: any;
    price_old?: any;
    created_at?: string;
    updated_at?: string;
  }

export type GenderOption = 'male' | 'female' | 'other';

export interface NewTicketForm {
  id?: number;
  name: string;
  tickets_available: number;
  description: string;
  price?:any;
  price_old?: any;
  event_id: number;
  is_visible: boolean;
  sale_start_date: Date | null;
  sale_end_date: Date | null;
  allowed_gender: GenderOption;
  min_age: number | null;
  max_age: number | null;
  is_early_bird: boolean;
  early_bird_end_date?: Date | null;
  early_bird_price?: any;
  image?: string | null;
  icon?: string | null;
}
