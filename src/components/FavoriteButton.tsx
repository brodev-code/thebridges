import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Image, Alert, View } from 'react-native';
import { api } from '../services/api';
import { _thFavorite} from '../theme';
import { BroIcons } from './Icons';

const FavoriteButton: React.FC<any> = ({ eventId }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const checkFavorite = async () => {
    try {
      const response = await api.get(`favorites/check/${eventId}`);
      setIsFavorite(response.data.data.isFavorite);
    } catch (error) {
      console.error('Favori kontrol hatası:', error);
    }
  };

  useEffect(() => { 
    checkFavorite();
  }, [eventId]);

  const addToFavorites = async () => {
    try {
      await api.post('favorites/add', { event_id: eventId });
      checkFavorite();
      Alert.alert('Başarılı', 'Favorilere eklendi');
    } catch (error) {
      console.error('Favorilere ekleme hatası:', error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await api.post('favorites/delete', { event_id: eventId });
      checkFavorite();
      Alert.alert('Başarılı', 'Favorilerden Çıkarıldı');
    } catch (error) {
      console.error('Favorilere ekleme hatası:', error);
    }
  };

  return (
    <TouchableOpacity onPress={isFavorite ? removeFromFavorites : addToFavorites} style={_thFavorite.favoriteButton}>
    <View style={_thFavorite.favoriteImage}>
      {isFavorite?<BroIcons.HeartFilled size={16} />:<BroIcons.HeartOutline size={16} />}
    </View>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
