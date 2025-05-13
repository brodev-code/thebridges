import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Modal, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { getTicketByEventId } from '../controllers/TicketController';
import { Ticket as TicketModel } from '../models/Ticket';
import { BroIcons } from './Icons';
import { _thTicketCard } from '../styles/TicketCardStyles';
import { _thModalStyle } from '../styles/ModalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { api } from '../services/api';

interface TicketProps {
  eventId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
}

const Ticket: React.FC<TicketProps> = ({ eventId, eventName, eventDate, eventLocation }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const [quantities, setQuantities] = useState<Record<string | number, number>>({});
  const { width } = useWindowDimensions();
  const [selectedTicket, setSelectedTicket] = useState<TicketModel | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getTicketByEventId(Number(eventId));
        setTickets(fetchedTickets.filter(ticket => ticket.is_visible));
        setQuantities(Object.fromEntries(fetchedTickets.map(ticket => [ticket.id, 0])));
      } catch (error) {
        console.error('Error fetching the tickets:', error);
      }
    };
    fetchTickets();
  }, [eventId]);

  const increment = (id: string | number | undefined) => {
    if (id !== undefined) {
      setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  const decrement = (id: string | number | undefined) => {
    if (id !== undefined) {
      setQuantities(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
    }
  };

  const getTotalPrice = () => 
      tickets.reduce((acc, ticket) => {
        if (ticket.id !== undefined) {
          const now = new Date();
          const earlyBirdEnd = ticket.early_bird_end_date ? new Date(ticket.early_bird_end_date) : null;
          const displayPrice = earlyBirdEnd && earlyBirdEnd >= now ? ticket.early_bird_price : ticket.price;
          return acc + ((displayPrice || 0) * (quantities[ticket.id] || 0));
        }
        return acc;
      }, 0);

  const checkGuestRole = async () => {
        try {
          const response = await api.get('/guest-check');
          if (response.data.code === 200 && response.data.attempt_code === 'VALID_ROLE') {
            Alert.alert('Access Denied', 'You are Guest User, please enter your information in the profile settings page.');
            navigation.replace('Settings');
          }else{
            handlePurchase();
          }
        } catch (error) {
          console.error('Error checking guest role:', error);
        }
      };

  const handlePurchase = () => {
    const selectedTickets = tickets
      .filter(ticket => ticket.id !== undefined && ticket.name !== undefined)
      .map(ticket => ({
        id: ticket.id as number,
        name: ticket.name as string,
        quantity: ticket.id !== undefined ? quantities[ticket.id] || 0 : 0,
      }))
      .filter(ticket => ticket.quantity > 0);
    
    if (selectedTickets.length > 0) {
      navigation.navigate('ParticipantsInfo', { eventId: Number(eventId), eventName, eventDate, eventLocation, selectedTickets, totalAmount: getTotalPrice() });
    } else {
      Alert.alert('Please select at least one ticket.');
    }
  };

  return (
    <>
      {tickets.map(ticket => {
        const now = new Date();
        const startSale = new Date(ticket.sale_start_date);
        const endSale = new Date(ticket.sale_end_date);
        const earlyBirdEnd = ticket.early_bird_end_date ? new Date(ticket.early_bird_end_date) : null;

        const isSaleActive = startSale <= now && endSale >= now;
        const displayPrice = earlyBirdEnd && earlyBirdEnd >= now ? ticket.early_bird_price : ticket.price;

        return (
          <View key={ticket.id} style={_thTicketCard.ticketCard}>
            <View style={_thTicketCard.ticketHeader}>
              <View>
                <Text style={_thTicketCard.ticketTitle}>
                  {ticket.name} {ticket.is_early_bird ? '(Early Bird)' : ''} {ticket.allowed_gender !== 'any' ? `(${ticket.allowed_gender})` : ''}
                </Text>
                <Text style={_thTicketCard.ticketPrice}>$ {displayPrice}</Text>
                <TouchableOpacity onPress={() => setSelectedTicket(ticket)}>
                  <Text style={_thTicketCard.ticketDetails}>
                    <BroIcons.Info size={10} color='#B1B1B1' /> Show details
                  </Text>
                  {ticket.min_age && ticket.max_age && (
                  <Text style={_thTicketCard.ticketAge}>
                      <BroIcons.Ticket size={10} color='#B1B1B1' /> Age : {ticket.min_age}-{ticket.max_age}
                  </Text>
                  )}
                </TouchableOpacity>               
              </View>

              <View style={_thTicketCard.counterContainer}>
                {isSaleActive ? (
                  <>
                    <TouchableOpacity 
                      style={_thTicketCard.counterButton} 
                      onPress={() => decrement(ticket.id)}
                    >
                      <BroIcons.Minus size={14} color="#003333" />
                    </TouchableOpacity>

                    <Text style={_thTicketCard.counterValue}>
                      {ticket.id !== undefined ? quantities[ticket.id] || 0 : 0}
                    </Text>

                    <TouchableOpacity 
                      style={_thTicketCard.counterButton} 
                      onPress={() => increment(ticket.id)}
                    >
                      <BroIcons.Plus size={14} color="#003333" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={_thTicketCard.saleNot}>Sold Out</Text>
                )}
              </View>
            </View>
          </View>
        );
      })}

      {selectedTicket && (
        <Modal animationType="fade" transparent visible onRequestClose={() => setSelectedTicket(null)}>
          <View style={_thModalStyle.modalContainer}>
            <View style={_thModalStyle.modalContent}>
              <Text style={_thModalStyle.modalTitle}>{selectedTicket.name}</Text>
              <Text style={_thModalStyle.modalBigTitle}>$ {selectedTicket.price}</Text>

              {selectedTicket.min_age && selectedTicket.max_age && (
                  <Text style={_thModalStyle.modalText}>
                    Age Restriction: {selectedTicket.min_age}-{selectedTicket.max_age}
                  </Text>
                )}
                <Text style={_thModalStyle.modalText}>
                  Sale: {new Date(selectedTicket.start_sale).toLocaleString()} - {new Date(selectedTicket.end_sale).toLocaleString()}
                </Text>
                <Text style={_thModalStyle.modalText}>
                  Early Bird: {selectedTicket.is_early_bird ? 'Yes' : 'No'}
                </Text>
              <ScrollView style={_thModalStyle.scrollView}>
                <Text style={_thModalStyle.modalText}>{selectedTicket.description}</Text>
              </ScrollView>

              <TouchableOpacity style={_thModalStyle.closeButton} onPress={() => setSelectedTicket(null)}>
                <Text style={_thModalStyle.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    <TouchableOpacity style={[_thTicketCard.purchaseButton, { width: width - 32 }]} onPress={checkGuestRole}>
        <Text style={_thTicketCard.purchaseButtonText}>{`Buy Tickets ($${getTotalPrice()})`}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Ticket;
