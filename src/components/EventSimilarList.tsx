import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { api, BASE_URL } from '../services/api';
import { EventSimilar } from '../models/EventSimilar';
import {_thEventSimilar}from '../styles/EventSimilarStyles';
import FavoriteButton from './FavoriteButton';

const EventSimilarList: React.FC<any> = ({ eventId }) => {
  const [eventSimilar, setEventSimilar] = useState<EventSimilar[]>([]);

  useEffect(() => {
    const fetchEventSimilar = async () => {
      try {
        const response = await api.get(`events/${eventId}/similar`);
        setEventSimilar(response.data.data);
      } catch (error) {
        console.error('Error fetching similar events:', error);
      }
    };

    fetchEventSimilar();
  }, [eventId]);

  const renderItem = ({ item }: { item: EventSimilar }) => (
    <View style={_thEventSimilar.eventContainer}>
      <Image source={{ uri: BASE_URL+'/storage/images/'+item.image }} style={_thEventSimilar.eventImage} />
      <View style={_thEventSimilar.infoContainer}>
        <Text style={_thEventSimilar.eventDates}>{`From: ${new Date(item.start_date).toLocaleDateString()} To: ${new Date(item.finish_date).toLocaleDateString()}`}</Text>
        <Text style={_thEventSimilar.eventName}>{item.name}</Text>
        <Text style={_thEventSimilar.eventAddress}>{item.address}</Text>
      </View>
      <View style={_thEventSimilar.eventFavorite}><FavoriteButton eventId={item.id} /></View>
    </View>
  );

  return (
    <>
    {eventSimilar &&(
    <View>
      <Text style={_thEventSimilar.title}>Similar Events</Text>
      <FlatList
        data={eventSimilar}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>  
    )}
    </>
  );
};
export default EventSimilarList;
