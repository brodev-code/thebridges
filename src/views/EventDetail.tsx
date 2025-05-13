import React, { useState, useEffect } from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity, StatusBar, ActivityIndicator, ImageBackground} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Event } from '../models/Event';
import { api, BASE_URL } from '../services/api';
import { RootStackParamList } from '../routes';
import ParticipantAvatars from '../components/ParticipantAvatars';
import GalleryComponent from '../components/EventGallery';
import Ticket from '../components/TicketCards';
import EventSimilarList from '../components/EventSimilarList';
import { _thEventDetail } from '../styles/EventDetailStyles';
import {PageHeader} from '../components/PageHeader';
import { BroIcons } from '../components/Icons';
import LinearGradient from 'react-native-linear-gradient';
import ParticipantReviews from '../components/ParticipantReviews';
import { decode } from 'html-entities';

type EventDetailScreenNavigationProp = StackNavigationProp<RootStackParamList,'EventDetail'>;
type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

type Props = {
  navigation: EventDetailScreenNavigationProp;
  route: EventDetailScreenRouteProp;
};

const MAX_LENGTH = 150; 

const EventDetail: React.FC<Props> = ({ route, navigation }) => {    
  const { eventId } = route.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        setEvent(response.data.data);

      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
     return <ActivityIndicator size="large" color="#4B0082" />;
  }
  const toggleExpand = () => setExpanded(!expanded);

  const getDescription = () => {
    if (!event.description) return '';
  
    // HTML etiketlerini temizle
    const plainText = decode(event.description.replace(/<[^>]+>/g, ''));
  
    // Uzunsa kes
    if (expanded || plainText.length <= MAX_LENGTH) {
      return plainText;
    }
  
    return plainText.substring(0, MAX_LENGTH) + '...';
  };
  

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <PageHeader title={event.name} eventId={eventId} showFavorite showShare  />
    <ScrollView contentContainerStyle={_thEventDetail.container}> 
      <View style={_thEventDetail.imageContainer}>
      <ImageBackground
          source={{ uri: `${BASE_URL}/storage/images/${event.image}` }}
          style={_thEventDetail.image}
          imageStyle={_thEventDetail.imageStyle}
        >
          {/* Blur Layer */}
          <View style={_thEventDetail.blurContainer}>
            <ImageBackground
              source={{ uri: `${BASE_URL}/storage/images/${event.image}` }}
              style={_thEventDetail.blurOverlay}
              imageStyle={{ 
                transform: [{ translateY: -60 }] // Resmi yukarı kaydır
              }}
            />
          </View>

          {/* Gradient Layer */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            locations={[0, 0.4, 1]}
            style={_thEventDetail.gradient}
          />

          <View style={_thEventDetail.rightContent}>
            {event.facilitators.map((facilitator, index) => (
              <View key={index} style={_thEventDetail.organizerContainer}>
                <Image source={{ uri: `${BASE_URL}/storage/avatars/${facilitator.avatar}` }} style={_thEventDetail.organizerImage} />
                <Text style={_thEventDetail.organizerName}>{facilitator.name.substring(0,20)}</Text>
              </View>
            ))}
          </View>
        </ImageBackground>
      </View> 
      <View style={_thEventDetail.header}>
        <Text style={_thEventDetail.eventDates}><BroIcons.Calendar size={14} color='#b1b1b1' /> {event.start_date} - {event.finish_date}</Text>
        <Text style={_thEventDetail.eventName}>{event.name} <View style={_thEventDetail.eventLanguage}><Text style={_thEventDetail.eventLanguageText}>{event.language}</Text></View></Text>
        <Text style={_thEventDetail.eventAddress}><BroIcons.Location size={14} color='#b1b1b1' /> {event.address}</Text>
      </View>

     
      {/* About Section */}
      {event.description && (
      <View style={_thEventDetail.section}>
          <Text style={_thEventDetail.sectionTitle}>About this retreat</Text>
          <Text style={_thEventDetail.eventDescription}>{getDescription()}</Text>
          {event.description.length > MAX_LENGTH && (
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={_thEventDetail.readMore}>{expanded ? 'Read less' : 'Read more'}</Text>
            </TouchableOpacity>
          )}
        </View> )}

      {/* Gallery */}
      <GalleryComponent eventId={eventId} />
      {event.youtube && (
        <>
      <View style={_thEventDetail.divider}></View>
      <View style={_thEventDetail.videoPlaceholder}>
        <Text style={_thEventDetail.videoText}>{event.youtube}</Text>
      </View>
      <View style={_thEventDetail.divider}></View>
      </>
    )}
      {/* Participants */}
       <View style={_thEventDetail.section}>
        <TouchableOpacity onPress={() => navigation.navigate('EventParticipants', { eventId: event.id })}>
          <ParticipantAvatars eventId={event.id} />  
        </TouchableOpacity>
       </View>
      <View style={_thEventDetail.divider}></View>
      {/* Reviews*/}
      <View style={_thEventDetail.section}>
        <ParticipantReviews eventId={eventId} />
      </View>
      {/* Similar Events */}
      <View style={_thEventDetail.section}>
        <EventSimilarList eventId={eventId} />
      </View>
      {/* Available Tickets */}
      {event.tickets.length!=0 &&(
      <View style={_thEventDetail.section}>
        <Text style={_thEventDetail.sectionTitle}>Event Tickets</Text>
        <Ticket eventId={event.id.toString()} eventName={event.name} eventDate={event.start_date} eventLocation={event.address} />
      </View>
      )}
    </ScrollView>
    </>
  );
};

export default EventDetail;
