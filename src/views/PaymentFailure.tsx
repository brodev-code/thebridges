import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { PageHeader } from '../components/PageHeader';
import { BroIcons } from '../components/Icons';
import { _thPaymentComplete } from '../styles/PaymentComplete';

const PaymentFailure = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  
  // route.params üzerinden Payment sayfasından gelen veriler
  const { eventName, eventDate, eventLocation, selectedTickets, totalAmount } = route.params as {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    selectedTickets: { name: string; quantity: number }[];
    totalAmount: number;
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <>
      <PageHeader title="Payment Complete" />
      <ScrollView style={_thPaymentComplete.container}>
        <View style={_thPaymentComplete.divider}>
          <Text style={_thPaymentComplete.dateTime}>{eventDate}</Text>
          <Text style={_thPaymentComplete.eventTitle}>{eventName}</Text>
          <Text style={_thPaymentComplete.location}>{eventLocation}</Text>
          <Text style={_thPaymentComplete.sectionTitle}>Total Amount :  <Text style={_thPaymentComplete.amount}>${totalAmount}</Text></Text>
          {selectedTickets.map((ticket, index) => (
            <View style={_thPaymentComplete.ticketInfo} key={index}>
              <BroIcons.Ticket size={14} color='#4B0082' />
              <Text style={_thPaymentComplete.ticketText}>{ticket.quantity} x {ticket.name} Ticket</Text>
            </View>
          ))}
        </View>
        <Text style={_thPaymentComplete.congrats}>🎉</Text>
        <View style={_thPaymentComplete.paymentBottom}>
          <Text style={_thPaymentComplete.sectionTitle}>Confirm your  tickets</Text>
          <Text style={_thPaymentComplete.sectionDescription}>The Sanctuary Retreats portfolio of luxury safari lodges and river cruise boats brings the boutique experience to guests with the added promise of authenticity. 
            Located in some of the most stunning locations in the world,
            each property is completely individual in its design and operated around the philosophy of “Luxury, naturally.”
          </Text>  
          <TouchableOpacity style={_thPaymentComplete.backButton} onPress={handleBackToHome}>
            <Text style={_thPaymentComplete.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default PaymentFailure;
