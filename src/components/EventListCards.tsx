import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Event } from '../models/Event';
import { Interest } from '../models/Interest';
import { _thEventListCards } from '../styles/EventCardListStyles';
import { api, BASE_URL, formatDate } from '../services/api';
import FavoriteButton from './FavoriteButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../theme';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EventDetail'>>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await api.get('/events');
        setEvents(eventResponse.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchInterests = async () => {
      try {
        const interestResponse = await api.get('/interests');
        setInterests(interestResponse.data.data);
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchEvents();
    fetchInterests();
  }, []);

  const filteredEvents = selectedInterest
    ? events.filter(event => event.interests.some(interest => interest.id === selectedInterest))
    : events;

  return (
    <>
      <Text style={[_thEventListCards.categoryTitle, theme.mT16]}>Categories</Text>
      <ScrollView horizontal>
        <TouchableOpacity
          style={[
            _thEventListCards.categoryButton,
            selectedInterest === null && _thEventListCards.categoryActiveButton
          ]}
          onPress={() => setSelectedInterest(null)}
        >
          <Text style={[selectedInterest != null? _thEventListCards.categoryText: _thEventListCards.categoryActiveText]}>All</Text>
        </TouchableOpacity>
        {interests.map(interest => (
          <TouchableOpacity
            key={interest.id}
            style={[
              _thEventListCards.categoryButton,
              selectedInterest === interest.id && _thEventListCards.categoryActiveButton
            ]}
            onPress={() => setSelectedInterest(interest.id)}
          >
            <Text style={[selectedInterest != interest.id? _thEventListCards.categoryText: _thEventListCards.categoryActiveText]}>{interest.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={{ marginBottom: 16 }}>
        {filteredEvents.map(event => (
          <TouchableOpacity
            key={event.id}
            style={_thEventListCards.eventCard}
            onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
          >
            {/* Etkinlik Resmi */}
            <Image 
              source={{ uri: `${BASE_URL}/storage/images/${event.image}` }} 
              style={_thEventListCards.eventImage} 
            />
            
            {/* İçerik Bilgileri */}
            <View style={_thEventListCards.eventInfo}>            
              <Text style={_thEventListCards.eventDate}>{formatDate(event.start_date)} - {formatDate(event.finish_date)}</Text>             
              <Text style={_thEventListCards.eventTitle}>{event.name}</Text>
              <Text style={_thEventListCards.eventAddress}>{event.address}</Text>
              
              {/* Alt Bilgiler */}
              <View style={_thEventListCards.bottomRow}>
                <View style={_thEventListCards.organizerWrapper}>
                  {event.facilitators.map((facilitator, index) => (
                    <View key={index} style={_thEventListCards.organizerContainer}>
                      <Image source={{ uri: `${BASE_URL}/storage/avatars/${facilitator.avatar}` }} style={_thEventListCards.organizerImage} />
                      <Text style={_thEventListCards.organizerName}>{facilitator.name.substring(0,20)}</Text>
                    </View>
                  ))}
                </View>
                <Text style={_thEventListCards.eventPrice}>{event.price}</Text>
              </View>
            </View>
            {/* Favori Butonu */}
            <FavoriteButton eventId={event.id} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default EventList;
