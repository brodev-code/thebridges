// controllers/TicketController.ts
import axios from 'axios';
import { Ticket } from '../models/Ticket';
import { api } from '../services/api'; // API servisinizin doğru yolunu kullanın

export const getTicketByEventId = async (eventId: number): Promise<Ticket[]> => {
  try {
    const response = await api.get<{ data: Ticket[] }>(`/tickets/event/${eventId}`);
    console.log(response.data.data); // Gelen veriyi kontrol etmek için
    return response.data.data; // API dönüşünde data alanı içindeki veriyi alın
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Error fetching the tickets');
  }
};
