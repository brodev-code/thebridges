import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Event } from '../models/Event';
import { Interest } from '../models/Interest';
import { _thEventListCards } from '../styles/EventCardListStyles';
import { api, BASE_URL, formatDate } from '../services/api';
import FavoriteButton from './FavoriteButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { theme } from '../theme';

interface EventLocationListProps {
  locationUpdated?: number; // locationUpdated değeri değiştiğinde yeniden fetch et
}

const EventLocationList: React.FC<EventLocationListProps> = ({ locationUpdated }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EventDetail'>>();

  const fetchInterests = async () => {
    try {
      const response = await api.get('/interests');
      setInterests(response.data.data);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const address = await AsyncStorage.getItem('search_address');
      const userJson = await AsyncStorage.getItem('user');
      const radiusStr = await AsyncStorage.getItem('search_radius');
      const coordinatesStr = await AsyncStorage.getItem('search_coordinates');
  
      const user = userJson ? JSON.parse(userJson) : null;
      const coordinates = coordinatesStr ? JSON.parse(coordinatesStr) : null;
      const radius = radiusStr ? parseInt(radiusStr) : 10;
  
      let fetchedEvents: Event[] = [];
  
      if (address) {
        const response = await api.post('/events/address', { address });
        fetchedEvents = response.data?.data || [];
      } else if (coordinates?.latitude && coordinates?.longitude) {
        const response = await api.post('/events/near', {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          radius,
        });
        fetchedEvents = response.data?.data || [];
      } else if (user?.latitude && user?.longitude) {
        const response = await api.post('/events/near', {
          latitude: user.latitude,
          longitude: user.longitude,
          radius,
        });
        fetchedEvents = response.data?.data || [];
      }
  
      setEvents(fetchedEvents);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      if (error.response && error.response.status === 404) {
        setEvents([]);
      }
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEvents();
  }, [locationUpdated]);

  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // ekran yeniden odaklandığında yükle
    }, [locationUpdated])
  );

  useEffect(() => {
    fetchInterests();
    fetchEvents();
  }, [locationUpdated]);

  const filteredEvents = selectedInterest
    ? events.filter(event =>
        event.interests.some(interest => interest.id === selectedInterest)
      )
    : events;

  return (
    <>
      <Text style={[_thEventListCards.categoryTitle, theme.mT16]}>
        Categories
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            _thEventListCards.categoryButton,
            selectedInterest === null && _thEventListCards.categoryActiveButton,
          ]}
          onPress={() => setSelectedInterest(null)}
        >
          <Text
            style={[
              selectedInterest != null
                ? _thEventListCards.categoryText
                : _thEventListCards.categoryActiveText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {interests.map(interest => (
          <TouchableOpacity
            key={interest.id}
            style={[
              _thEventListCards.categoryButton,
              selectedInterest === interest.id &&
                _thEventListCards.categoryActiveButton,
            ]}
            onPress={() => setSelectedInterest(interest.id)}
          >
            <Text
              style={[
                selectedInterest !== interest.id
                  ? _thEventListCards.categoryText
                  : _thEventListCards.categoryActiveText,
              ]}
            >
              {interest.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={{ marginBottom: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredEvents.map(event => (
          <TouchableOpacity
            key={event.id}
            style={_thEventListCards.eventCard}
            onPress={() =>
              navigation.navigate('EventDetail', { eventId: event.id })
            }
          >
            <Image
              source={{ uri: `${BASE_URL}/storage/images/${event.image}` }}
              style={_thEventListCards.eventImage}
            />

            <View style={_thEventListCards.eventInfo}>
              <Text style={_thEventListCards.eventDate}>
                {formatDate(event.start_date)} - {formatDate(event.finish_date)}
              </Text>
              <Text style={_thEventListCards.eventTitle}>{event.name}</Text>
              <Text style={_thEventListCards.eventAddress}>{event.address}</Text>

              <View style={_thEventListCards.bottomRow}>
                <View style={_thEventListCards.organizerWrapper}>
                  {event.facilitators.map((facilitator, index) => (
                    <View
                      key={index}
                      style={_thEventListCards.organizerContainer}
                    >
                      <Image
                        source={{
                          uri: `${BASE_URL}/storage/avatars/${facilitator.avatar}`,
                        }}
                        style={_thEventListCards.organizerImage}
                      />
                      <Text style={_thEventListCards.organizerName}>
                        {facilitator.name.substring(0, 20)}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text style={_thEventListCards.eventPrice}>{event.price}</Text>
              </View>
            </View>

            <FavoriteButton eventId={event.id} />
          </TouchableOpacity>
        ))}

        {filteredEvents.length === 0 && !loading && (
          <Text style={{ textAlign: 'center', padding: 20, color: '#777' }}>
            No events found near your location.
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default EventLocationList;
