import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
}

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.location} numberOfLines={1}>
          📍 {event.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});

export default EventCard;
