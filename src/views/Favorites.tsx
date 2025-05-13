import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { api, BASE_URL } from '../services/api';
import { Event } from '../models/Event';
import FavoriteButton from '../components/FavoriteButton';
import BottomMenu from '../components/BottomMenu';
import { RootStackParamList } from '../routes';
import { _thFavorites } from '../styles/FavoritesStyles';
import { PageHeader } from '../components/PageHeader';

const FavoriteEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        const response = await api.get('favorites');
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching favorite events:', error);
      }
    };

    fetchFavoriteEvents();
  }, []);

  const renderItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      key={item.id}
      style={_thFavorites.touchableCard}
      onPress={() => {
        navigation.navigate('EventDetail', { eventId: item.id });
      }}
    >
      <View style={_thFavorites.eventCard}>
        <Image
          source={{ uri: `${BASE_URL}/storage/images/${item.image}` }}
          style={_thFavorites.eventImage}
        />
        <View style={_thFavorites.eventInfo}>
          <Text style={_thFavorites.eventDate}>
            {new Date(item.start_date).toLocaleDateString()} - {new Date(item.finish_date).toLocaleDateString()}
          </Text>
          <Text style={_thFavorites.eventTitle}>{item.name}</Text>
                {/* Alt Bilgiler */}
                <View style={_thFavorites.bottomRow}>
                <View style={_thFavorites.organizerWrapper}>
                  {item.facilitators.map((facilitator, index) => (
                    <View key={index} style={_thFavorites.organizerContainer}>
                      <Image source={{ uri: `${BASE_URL}/storage/images/${facilitator.avatar}` }} style={_thFavorites.organizerImage} />
                      <Text style={_thFavorites.organizerName}>{facilitator.name.substring(0,20)}</Text>
                    </View>
                  ))}
                </View>
                <Text style={_thFavorites.eventPrice}>{item.price}</Text>
              </View>
            </View>
            {/* Favori Butonu */}
            <FavoriteButton eventId={item.id} />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <PageHeader title="Favorite Events"  />
      <View style={_thFavorites.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={_thFavorites.listContent}
        />
      </View>
      <View style={_thFavorites.footer}>
        <BottomMenu />
      </View>
    </>
  );
};

export default FavoriteEvents;
