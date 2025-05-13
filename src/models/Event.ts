import { ReactNode } from "react";

export interface Event {
    sold_out: any;
    sold_tickets: ReactNode;
    id: number;
    name: string;
    subname: string | null;
    parent: string | null;
    status: number;
    language: string | null;
    link: string | null;
    sort: number;
    description: string;
    image: string;
    rating: number;
    price: number;
    icon: string | null;
    address: string;
    latitude: number;
    longitude: number;
    start_date: string;
    finish_date: string;
    youtube:string;
    facilitators: {
      avatar: any; id: number; name: string; email: string 
}[];
    tickets: { id: number; name: string; price: string; ticket_type:any }[];
    interests: { id: number; name: string;}[];
    created_at: string;
    updated_at: string;
  }
  