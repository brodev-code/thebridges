import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { api, BASE_URL } from "../services/api";
import { _thEventEditComplete } from "../styles/EventEditCompleteStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes";
import { PageHeader } from '../components/PageHeader';
import { Ticket } from "../models/Ticket";
import { Event } from "../models/Event";

interface Facilitator {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

interface Interest {
  id: number;
  name: string;
}


const EventEditComplete = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { eventId } = route.params as { eventId: string };

  const [eventData, setEventData] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingTickets, setLoadingTickets] = useState(true);

  // Etkinlik detaylarını çekiyoruz
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        const data = response.data.data;
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoadingEvent(false);
      }
    };
    fetchEventData();
  }, [eventId]);

  // Ticket bilgilerini çekiyoruz
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get(`/tickets/event/${eventId}`);
        const ticketsData = response.data.data || [];
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoadingTickets(false);
      }
    };
    fetchTickets();
  }, [eventId]);

  if (loadingEvent || loadingTickets) {
    return (
      <View style={_thEventEditComplete.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!eventData) {
    return (
      <Text style={_thEventEditComplete.errorText}>
        Error loading event data
      </Text>
    );
  }

  const { name, description, image, address, start_date, finish_date } = eventData;

  return (
    <>
      <PageHeader title={name} />
      <ScrollView contentContainerStyle={_thEventEditComplete.container}>
        {/* Etkinlik Bilgileri */}
        <View>
        {image && (
          <View>
           <Image
              source={{ uri: `${BASE_URL}/storage/images/${image}` }}
              style={_thEventEditComplete.eventImage}
            />
          </View>
          )}
           {description && (
          <Text style={_thEventEditComplete.headerSubtitle}>
            {start_date}-{finish_date}
          </Text>
          )}
          <Text style={_thEventEditComplete.headerTitle}>{name}</Text>
          {description && (
          <Text style={_thEventEditComplete.headerSubtitle}>
            {description}
          </Text>
          )}
          <Text style={_thEventEditComplete.address}>{address}</Text>
        </View>
       
        {/* 🎉 Ayrım */}
        <Text style={_thEventEditComplete.separator}>🎉</Text>

        {/* Ticket Listesi */}
        <View style={_thEventEditComplete.ticketList}>
          {tickets.map((ticket) => (
            <View key={ticket.id} style={_thEventEditComplete.ticketCard}>
              <View style={_thEventEditComplete.ticketLeft}>
                <Text style={_thEventEditComplete.ticketTitle}>
                  {ticket.name}
                </Text>
                {ticket.ticket_type && (
                  <Text style={_thEventEditComplete.ticketSubtitle}>
                    {ticket.ticket_type}
                  </Text>
                )}
                <Text style={_thEventEditComplete.ticketPrice}>
                ${ticket.price}
                </Text>
              </View>
              <Text style={_thEventEditComplete.available}>
                {ticket.tickets_available}
              </Text>
            </View>
          ))}
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={_thEventEditComplete.backButton}
          onPress={() => navigation.navigate("MyEvents")}
        >
          <Text style={_thEventEditComplete.backButtonText}>
            Back to My Retreats
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default EventEditComplete;
