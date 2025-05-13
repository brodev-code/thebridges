import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api, BASE_URL, formatDate } from '../services/api';
import { Event } from '../models/Event';
import { RootStackParamList } from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { _thMyEvents } from '../styles/MyEventsStyles';
import { BroIcons } from '../components/Icons';
import { PageHeader } from '../components/PageHeader';

const MyEvents = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [stats, setStats] = useState<{ total_earnings?: number; balance?: number; total_events?: number; total_participants?: number } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchStatsAndEvents = async () => {
        try {
          const statsResponse = await api.get('facilitator/stats');
          const eventsResponse = await api.get('facilitator/events-tickets');
          setStats(statsResponse.data);
          setEvents(eventsResponse.data.events);
          setLoading(false);
          setError(null);
        } catch (error) {
          setLoading(false);
          setError('Error fetching data. Please try again later.');
          console.error('Error fetching data:', error);
        }
      };
  
      fetchStatsAndEvents();
    });
  
    return unsubscribe;
  }, [navigation]);

  const navigateToEdit = (eventId: number | null = null) => {
    navigation.navigate('EventEdit', {eventId});
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <View style={_thMyEvents.eventCard}>
      <Image
        source={{ uri: BASE_URL+'/storage/images/'+item.image }}
        style={_thMyEvents.eventImage}
      />
      <View style={_thMyEvents.eventInfo}>
        <Text style={_thMyEvents.eventDate}>{formatDate(item.start_date)} - {formatDate(item.finish_date)}</Text>
        <Text style={_thMyEvents.eventName}>{item.name}</Text>      
        <Text style={_thMyEvents.eventAddress}>{item.address}</Text>
        <Text
          style={[
            _thMyEvents.eventStatus,
            item.status === 1
              ? _thMyEvents.statusPublished
              : item.status === 0
              ? _thMyEvents.statusPending
              : _thMyEvents.statusRejected,
          ]}
        >
          <BroIcons.Info size={12} color={item.status === 1 ? '#008080' : item.status === 0 ? '#F2860B' : '#F20B45'} />
          {item.status === 1 ? 'Published' : item.status === 0 ? 'Pending' : 'Rejected'}
        </Text>
        {item.status === 1 && (
          <Text style={_thMyEvents.soldTickets}>Sold Tickets: {item.sold_tickets} {item.sold_out ? '🎉 Sold Out' : ''}</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => navigateToEdit(item.id)} style={_thMyEvents.editIcon}>
        <BroIcons.Filter size={24} color="#003333" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#6C63FF" style={_thMyEvents.loader} />;
  }

  if (error) {
    return <Text style={_thMyEvents.errorText}>{error}</Text>;
  }

  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <PageHeader title='My Events' />
    <View style={_thMyEvents.container}>
      <View style={_thMyEvents.statsContainer}>
        <View style={_thMyEvents.statItem}>
          <Text style={_thMyEvents.statValue}>£{stats?.total_earnings}</Text>
          <Text style={_thMyEvents.statLabel}>Earnings</Text>
        </View>
        <View style={_thMyEvents.statItem}>
          <Text style={_thMyEvents.statValue}>£{stats?.balance}</Text>
          <Text style={_thMyEvents.statLabel}>Balance</Text>
        </View>
        <View style={_thMyEvents.statItem}>
          <Text style={_thMyEvents.statValue}>{stats?.total_events}</Text>
          <Text style={_thMyEvents.statLabel}>Events</Text>
        </View>
        <View style={_thMyEvents.statItem}>
          <Text style={_thMyEvents.statValue}>{stats?.total_participants}</Text>
          <Text style={_thMyEvents.statLabel}>Participants</Text>
        </View>
      </View>

     <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
        key={events.length}
        contentContainerStyle={_thMyEvents.listContent}
      />

      <TouchableOpacity
        style={_thMyEvents.createButton}
        onPress={() => navigateToEdit(null)}
      >
        <Text style={_thMyEvents.createButtonText}>Create New</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default MyEvents;
