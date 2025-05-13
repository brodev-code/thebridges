import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import { Participant } from '../models/Participant';
import { RootStackParamList } from '../routes';
import { RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { _thEventParticipant } from '../styles/EventParticipantStyles';
import { PageHeader } from '../components/PageHeader';

type EventParticipantsScreenRouteProp = RouteProp<RootStackParamList, 'EventParticipants'>;
type UserProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;

interface EventParticipantsProps {
  route: EventParticipantsScreenRouteProp;
}

const EventParticipants: React.FC<EventParticipantsProps> = ({ route }) => {
  const navigation = useNavigation<UserProfileScreenNavigationProp>();
  const { eventId } = route.params;
  const [participants, setParticipants] = useState<Participant[]>([]);

  const fetchParticipants = async () => {
    try {
      const response = await api.get(`tickets/${eventId}/paid-participants`);
      const participantsWithFollowStatus = await Promise.all(
        response.data.data.map(async (participant: Participant) => {
          const followCheckResponse = await api.get(`follow-check/${participant.id}`);
          return {
            ...participant,
            isFollowing: followCheckResponse.data.isFollowing,
          };
        })
      );
      setParticipants(participantsWithFollowStatus);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [eventId]);

  useFocusEffect(
    useCallback(() => {
      fetchParticipants();
    }, [eventId])
  );

  const handleFollow = async (userId: number) => {
    try {
      const response = await api.post(`follow/${userId}`);
      if (response.data.message === 'User followed successfully.') {
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.id === userId ? { ...participant, isFollowing: true } : participant
          )
        );
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId: number) => {
    try {
      const response = await api.post(`unfollow/${userId}`);
      if (response.data.message === 'User unfollowed successfully.') {
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.id === userId ? { ...participant, isFollowing: false } : participant
          )
        );
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const renderItem = ({ item }: { item: Participant }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: item.id })}>
      <View style={_thEventParticipant.participantContainer}>
        <Image source={require('../assets/avatar.png')} style={_thEventParticipant.profileImage} />
        <Text style={_thEventParticipant.participantName}>{item.name}</Text>
        <TouchableOpacity
          style={item.isFollowing ? _thEventParticipant.unfollowButton : _thEventParticipant.followButton}
          onPress={() => (item.isFollowing ? handleUnfollow(item.id) : handleFollow(item.id))}
        >
          <Text style={item.isFollowing ? _thEventParticipant.unfollowButtonText : _thEventParticipant.followButtonText}>
            {item.isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <PageHeader title='Participants' />
    <View style={_thEventParticipant.container}>
      <FlatList
        data={participants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    </>
  );
};


export default EventParticipants;
