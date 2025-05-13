import axios from 'axios';
import { Event } from '../models/Event';
import { api } from '../services/api'; // API servisinizin doğru yolunu kullanın

export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<{ data: Event[] }>('/events');
    return response.data.data; // API dönüşünde data alanı içindeki veriyi alın
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Error fetching events');
  }
};

export const getSliderEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<{ data: Event[] }>('/slider');
    return response.data.data; // API dönüşünde data alanı içindeki veriyi alın
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Error fetching events');
  }
};
