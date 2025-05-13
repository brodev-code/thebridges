import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import { _thSearchDetail } from '../styles/SearchDetailStyles';
import { BASE_URL } from '../services/api';
import { PageHeader } from '../components/PageHeader';
import { BroIcons } from '../components/Icons';


type SearchDetailProps = NativeStackScreenProps<RootStackParamList, 'SearchDetail'>;

const SearchDetail: React.FC<SearchDetailProps> = ({ route, navigation }) => {
  const { results } = route.params;

  const renderEvent = (event: any) => (
     <TouchableOpacity
                key={event.id}
                style={_thSearchDetail.eventCard}
                onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
              >
       {/* Etkinlik Resmi */}
      <Image 
        source={{ uri: `${BASE_URL}/storage/images/${event.image}` }} 
        style={_thSearchDetail.eventImage} 
      />
      <View style={_thSearchDetail.eventInfo}>
      <Text style={_thSearchDetail.eventDate}>{event.start_date} - {event.finish_date}</Text>
      <Text style={_thSearchDetail.eventTitle}>{event.name}</Text>
      <Text style={_thSearchDetail.eventAddress}>{event.address}</Text>
      
      {/* Alt Bilgiler */}
      <View style={_thSearchDetail.bottomRow}>
        <View style={_thSearchDetail.organizerWrapper}>
          {event.facilitators.map((facilitator: { avatar: any; name: string; }, index: React.Key | null | undefined) => (
            <View key={index} style={_thSearchDetail.organizerContainer}>
              <Image source={{ uri: `${BASE_URL}/storage/avatars/${facilitator.avatar}` }} style={_thSearchDetail.organizerImage} />
              <Text style={_thSearchDetail.organizerName}>{facilitator.name.substring(0,20)}</Text>
            </View>
          ))}
        </View>
        <Text style={_thSearchDetail.eventPrice}>{event.price}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );

  const renderUser = (user: any) => (
    <TouchableOpacity key={user.id} style={_thSearchDetail.eventCard} onPress={() => navigation.navigate('UserProfile', { userId: user.id })}>
      <Image source={user.other_user_avatar || user.avatar? { uri: user.other_user_avatar || user.avatar }: require('../assets/avatar.png')} 
      style={_thSearchDetail.avatar} />
      <View style={_thSearchDetail.eventInfo}>
        <Text style={_thSearchDetail.eventTitle}>{user.name}</Text>
        <Text style={_thSearchDetail.eventAddress}>{user.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <StatusBar backgroundColor={"#fff"} barStyle={'dark-content'} />
    <PageHeader title='Search Detail' />
    {/* Search Filter Button */}
    <TouchableOpacity
      style={_thSearchDetail.filterButton}
      onPress={() => navigation.navigate('SearchFilter', { searchQuery: '' })}
    >
      <BroIcons.Filter size={24} />
    </TouchableOpacity>
  
    <View style={_thSearchDetail.container}>
      {results.data.events.length > 0 && (
        <View style={{ marginBottom: 0 }}>
          <Text style={_thSearchDetail.sectionTitle}>Events</Text>
          <FlatList
            data={results.data.events}
            renderItem={({ item }) => renderEvent(item)}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={null}
            contentContainerStyle={{ paddingBottom: 0 }} 
          />
        </View>
      )}
  
      {results.data.users.length > 0 && (
        <View style={{ marginTop: 0 }}> 
          <Text style={_thSearchDetail.sectionTitle}>Users</Text>
          <FlatList
            data={results.data.users}
            renderItem={({ item }) => renderUser(item)}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={null}
            contentContainerStyle={{ paddingBottom: 0 }} 
          />
        </View>
      )}
    </View>
  </>
  );
};

export default SearchDetail;
