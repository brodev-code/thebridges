import { Alert } from "react-native";
import { api } from "../services/api";

export const getAddressFromCoords = async (latitude: any, longitude: any) => {
  try {
    const response = await api.post('location-coordinates', {
      latitude,
      longitude
    });

    if (response.data.status === 'success') {
      return response.data.address;
    } else {
      throw new Error('Adres alınamadı');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('getAddressFromCoords error:', error.message);
    } else {
      console.error('getAddressFromCoords error:', error);
    }
    return null;
  }
};

export const getCoordsFromAddress = async (address: any) => {
  try {
    const response = await api.post('location-address', {
      address
    });

    if (response.data.status === 'success') {
      return {
        latitude: response.data.location.lat,
        longitude: response.data.location.lng
      };
    } else {
      throw new Error('Koordinat alınamadı');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('getCoordsFromAddress error:', error.message);
    } else {
      console.error('getCoordsFromAddress error:', error);
    }
    return null;
  }
};

export const extractCityFromAddress = (address: string): string => {
  if (!address) return '';

  const parts = address.split(',').map(part => part.trim());

  if (parts.length >= 2) {
    return parts[parts.length - 2]; 
  }

  return address; 
};

export const validateRadius = (radius: string | number) => {
  const numericRadius = Number(radius);
  if (isNaN(numericRadius) || numericRadius <= 0) {
    Alert.alert('Error', 'Please enter a valid distance.');
    return false;
  }
  return true;
};