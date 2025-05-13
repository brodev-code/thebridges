import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { _thSlider } from '../styles/SliderStyles';
import { getSliderEvents } from '../controllers/EventController';
import { Event as EventModel } from '../models/Event';
import FavoriteButton from './FavoriteButton';
import { BASE_URL } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import LinearGradient from 'react-native-linear-gradient';

const EventSlider: React.FC = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EventDetail'>>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getSliderEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  if (events.length === 0) {
    return <ActivityIndicator size="large" color="#4B0082" />;
  }

  return (
    <Swiper showsButtons={false} showsPagination={false} autoplay={true} style={_thSlider.wrapper}>
      {events.map((event, index) => (
        <TouchableOpacity
          key={index}
          style={_thSlider.card}
          onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
        >
        <ImageBackground
          source={{ uri: `${BASE_URL}/storage/images/${event.image}` }}
          style={_thSlider.image}
          imageStyle={_thSlider.imageStyle}
        >
          {/* Blur Layer */}
          <View style={_thSlider.blurContainer}>
            <ImageBackground
              source={{ uri: `${BASE_URL}/storage/images/${event.image}` }}
              style={_thSlider.blurOverlay}
              imageStyle={{ 
                transform: [{ translateY: -60 }] // Resmi yukarı kaydır
              }}
            />
          </View>

          {/* Gradient Layer */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            locations={[0, 0.4, 1]}
            style={_thSlider.gradient}
          />

          <View style={_thSlider.content}>
                <Text style={_thSlider.title}>{event.name}</Text>
                <Text style={_thSlider.location}>{event.address}</Text>
                <Text style={_thSlider.date}>{new Date(event.start_date).toLocaleDateString()} - {new Date(event.finish_date).toLocaleDateString()}</Text>
              </View>
              <View style={_thSlider.favoriteContainer}>
                <FavoriteButton eventId={event.id} />
              </View>
        </ImageBackground>
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

export default EventSlider;