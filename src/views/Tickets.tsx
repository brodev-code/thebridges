import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api, BASE_URL, formatDate } from '../services/api';
import BottomMenu from '../components/BottomMenu';
import { TicketItem } from '../models/TicketData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { _thTickets } from '../styles/TicketsStyles';
import { PageHeader } from '../components/PageHeader';
import { BroIcons } from '../components/Icons';

const Tickets = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get(`/ticket-list`);
        setTickets(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const renderItem = ({ item }: { item: TicketItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TicketDetail', { referenceNumber: item.reference_number })}>
      <View style={_thTickets.ticketCard}>
        <View style={_thTickets.ticketImage}>
          <Image source={{ uri: `${BASE_URL}/storage/images/${item.event.image}` }} style={_thTickets.ticketImage} />
        </View>
        <View style={_thTickets.ticketDetails}>
          <Text style={_thTickets.eventDates}>{formatDate(item.event.start_date)} - {formatDate(item.event.finish_date)}</Text>
          <Text style={_thTickets.eventName}>{item.event.name}</Text>
          <Text style={_thTickets.eventInfo}>{item.event.address}</Text>
          <Text style={_thTickets.ticketName}>{item.ticket.name}</Text>
          <Text style={_thTickets.ticketReference}>{item.reference_number}</Text>
          {/*<Text style={_thTickets.ticketDescription}>{item.event.description}</Text> */}
          <Text style={_thTickets.ticketPrice}><View style={_thTickets.ticketIcon}><BroIcons.Ticket size={14} color='#4B0082' /></View> {item.quantity} x $ {item.ticket.price}</Text>
          {item.ticket.price_old && (
            <Text style={_thTickets.ticketOldPrice}>$ {item.ticket.price_old}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <PageHeader title='My Tickets' />
      <View style={_thTickets.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#4B0082" />
        ) : (
          <FlatList
            data={tickets}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.reference_number.toString()} // reference_number'ı key olarak kullanalım
          />
        )}
      </View>
        <BottomMenu />
    </>
  );
};

export default Tickets;
