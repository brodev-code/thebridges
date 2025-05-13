import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Eğer ikonlar için ionicons kullanıyorsanız
import { useNavigation } from '@react-navigation/native'; // React Navigation
import { api } from '../services/api'; // API bağlantısı için
import { _thSearch } from '../styles/SearchStyles';
import { Interest } from '../models/Interest'; // Interest tipi
import { RootStackParamList } from '../routes'; // Stack parametrelerini içeren dosya
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomMenu from '../components/BottomMenu';
import { BroIcons } from '../components/Icons';
import { PageHeader } from '../components/PageHeader';
import { theme } from '../theme';


type SearchNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

const Search: React.FC = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  const [query, setQuery] = useState('');
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await api.get('/interests'); // API'den interest'leri çekiyoruz
        setInterests(response.data.data);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };

    fetchInterests();
  }, []);

  const toggleInterest = (id: number) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((interestId) => interestId !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.post('/events/search', { query, interests: selectedInterests });
      const results = response.data;
      setLoading(false);
      navigation.navigate('SearchDetail',{results}); // Sonuçları SearchDetail ekranına gönder
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <PageHeader title='Search' />
      <ScrollView style={_thSearch.container}>
        <View style={_thSearch.searchInputWrapper}>
          <View style={_thSearch.searchIcon}>
            <BroIcons.Search size={20} color="#999" />
          </View>
          <TextInput
            style={_thSearch.searchInput}
            placeholder="Search categories, retreats, location, facilitator"
            placeholderTextColor={theme.placeholderColor.color}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <Text style={_thSearch.sectionTitle}>Interests</Text>
        {interests.length > 0 ? (
          <View style={_thSearch.categoriesWrapper}>
            <FlatList
              data={interests}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    _thSearch.categoryButton,
                    selectedInterests.includes(item.id) && _thSearch.categoryButtonSelected,
                  ]}
                  onPress={() => toggleInterest(item.id)}
                >
                  <Text
                    style={[
                      _thSearch.categoryText,
                      selectedInterests.includes(item.id) && _thSearch.categoryTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              scrollEnabled={false}
            />
          </View>
        ) : (
          <ActivityIndicator size="small" color="purple" />
        )}

        {/* Harita Arama Butonu */}
        <View style={_thSearch.center}>
          <TouchableOpacity style={_thSearch.mapSearchButton} onPress={() => navigation.navigate('SearchMap', { searchQuery: query })}>
            <Text style={_thSearch.mapSearchButtonText}>
              <BroIcons.Location size={14} /> Show on Map</Text>
          </TouchableOpacity>
        </View>
        {/* Harita Arama Butonu */}
        <TouchableOpacity style={_thSearch.searchButton} onPress={handleSearch}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={_thSearch.searchButtonText}>Search</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <BottomMenu />
    </>
  );
};

export default Search;
