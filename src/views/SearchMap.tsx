import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList,
  TextInput, StyleSheet, Dimensions, StatusBar, Alert, ScrollView,
  ActivityIndicator, Platform
} from 'react-native';
import MapView, { Marker, Callout, Region, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { api, BASE_URL } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { theme } from '../theme';
import { PageHeader } from '../components/PageHeader';
import { Event } from '../models/Event';
import { Interest } from '../models/Interest';

const { width } = Dimensions.get('window');

const SearchMap = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EventDetail'>>();
  const mapRef = useRef<MapView>(null);
  const flatListRef = useRef<FlatList>(null);

  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInterests();
    fetchNearbyEvents(region.latitude, region.longitude, selectedInterest);
  }, []);

  // Bölge değiştikçe etkinlikleri yeniden getirmek için
  useEffect(() => {
    if (searchQuery.trim() === '') {
      fetchNearbyEvents(region.latitude, region.longitude, selectedInterest);
    }
  }, [region]);

  // İlgi filtresi değiştiğinde de etkinlikleri güncelle
  useEffect(() => {
    fetchNearbyEvents(region.latitude, region.longitude, selectedInterest);
  }, [selectedInterest]);

  const fetchInterests = async () => {
    try {
      const res = await api.get('/interests');
      setInterests(res.data.data);
    } catch (err) {
      console.error('Interest error:', err);
    }
  };

  const fetchNearbyEvents = async (
    latitude: number,
    longitude: number,
    interestId: number | null = selectedInterest
  ) => {
    try {
      const res = await api.post('/events/near', {
        latitude,
        longitude,
        radius: 10,
        interest_id: interestId,
      });
      setEvents(res.data.data);
    } catch (error) {
      console.error('Nearby event error:', error);
    }
  };

  const handleAddressSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const locRes = await api.post('/location-address', { address: searchQuery });
      if (locRes.data.status === 'success' && locRes.data.location) {
        const { lat, lng } = locRes.data.location;
        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);

        const eventsRes = await api.post('/events/address', {
          address: searchQuery,
          interest_id: selectedInterest,
        });
        setEvents(eventsRes.data.data || []);
      } else {
        Alert.alert('Adres bulunamadı');
      }
    } catch (error) {
      Alert.alert('Konum veya etkinlik bilgisi alınamadı');
    }
  };

  const handleMarkerPress = (event: Event) => {
    setSelectedEvent(event);
    const focusRegion = {
      latitude: event.latitude ?? region.latitude,
      longitude: event.longitude ?? region.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    mapRef.current?.animateToRegion(focusRegion, 1000);
    const index = events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const handleInterestPress = (id: number) => {
    const newId = selectedInterest === id ? null : id;
    setSelectedInterest(newId);
    fetchNearbyEvents(region.latitude, region.longitude, newId);
  };

  // Zoom işlevselliği için butonlar ekleniyor
  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 0.9,
      longitudeDelta: region.longitudeDelta * 0.9,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 1.1,
      longitudeDelta: region.longitudeDelta * 1.1,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <PageHeader title="Search on Map" />
      <View style={styles.container}>
        {/* Üstte yer alacak arama kutusu */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter an address..."
            placeholderTextColor={theme.placeholderColor.color}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleAddressSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleAddressSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Arama kutusunun hemen altında, ilgi filtreleri */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.interestScroll}>
          {interests.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleInterestPress(item.id)}
              style={[styles.interestButton, selectedInterest === item.id && styles.selectedInterest]}
            >
              <Text style={[styles.interestText, selectedInterest === item.id && styles.selectedInterestText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <MapView
          ref={mapRef}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => {
            setRegion(newRegion);
            if (searchQuery.trim() === '') {
              fetchNearbyEvents(newRegion.latitude, newRegion.longitude, selectedInterest);
            }
          }}
          onPanDrag={(e) => {
            // Sürükleme sırasında haritayı izleyebiliriz, ancak şu an bunu sadece region güncelleme için kullanıyoruz
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setRegion(prev => ({
              ...prev,
              latitude,
              longitude,
            }));
          }}
        >
          {events.map(event => {
            const lat = event.latitude ?? 0;
            const lng = event.longitude ?? 0;
            return (
              <Marker
                key={event.id}
                coordinate={{ latitude: lat, longitude: lng }}
                pinColor={selectedEvent?.id === event.id ? 'blue' : 'red'}
                onPress={() => handleMarkerPress(event)}
              >
                <Callout>
                  <Text>{event.name}</Text>
                </Callout>
              </Marker>
            );
          })}
        </MapView>

        {/* Zoom butonları */}
        <View style={styles.zoomButtonsContainer}>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
            <Text style={styles.zoomButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
            <Text style={styles.zoomButtonText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Ekranın altında, etkinlik listesini taşıyan overlay panel */}
        <View style={styles.eventListContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
          ) : events.length === 0 ? (
            <Text style={{ padding: 20, textAlign: 'center', color: '#999' }}>
              Gösterilecek etkinlik yok.
            </Text>
          ) : (
            <FlatList
              ref={flatListRef}
              data={events}
              keyExtractor={item => item.id.toString()}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleMarkerPress(item)}
                  style={[styles.eventCard, selectedEvent?.id === item.id && styles.selectedEventCard]}
                >
                  <Image source={{ uri: item.image }} style={styles.eventImage} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.eventName}>{item.name}</Text>
                    <Text style={styles.eventAddress}>{item.address}</Text>
                    <Text style={styles.eventDate}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left:16,
    right:16,
    width:width - 32,
    padding: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius:8,
    zIndex: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  interestScroll: {
    position: 'absolute',
    top: 74,
    left:16,
    right:16,
    paddingHorizontal: 20,
    zIndex:10,
  },
  interestButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
  },
  selectedInterest: {
    backgroundColor: '#007bff',
  },
  interestText: {
    fontSize: 14,
    color: '#333',
  },
  selectedInterestText: {
    color: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  zoomButtonsContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 10,
  },
  zoomButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  zoomButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  eventListContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    zIndex: 2,
  },
  eventCard: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedEventCard: {
    borderColor: '#007bff',
    backgroundColor: '#e9f7fe',
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventAddress: {
    fontSize: 14,
    color: '#555',
  },
  eventDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default SearchMap;
