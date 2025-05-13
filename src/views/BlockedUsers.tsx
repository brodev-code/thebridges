import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import { RootStackParamList } from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { _thEventParticipant } from '../styles/EventParticipantStyles'; // geçici olarak bunu kullanabiliriz
import {PageHeader} from '../components/PageHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type BlockedUser = {
  id: number;
  name: string;
};

type BlockedUsersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BlockedUsers'>;

const BlockedUsersScreen: React.FC = () => {
  const navigation = useNavigation<BlockedUsersScreenNavigationProp>();
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);

  const fetchBlockedUsers = async () => {
    try {
      const response = await api.get('blocklist');
      setBlockedUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching blocked users:', error);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBlockedUsers();
    }, [])
  );

  const handleUnblock = async (userId: number) => {
    try {
      const response = await api.post(`unblock/${userId}`);
      if (response.data.message === 'User unblocked successfully.') {
        setBlockedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const renderItem = ({ item }: { item: BlockedUser }) => (
    <View style={_thEventParticipant.participantContainer}>
      <Image source={require('../assets/avatar.png')} style={_thEventParticipant.profileImage} />
      <Text style={_thEventParticipant.participantName}>{item.name}</Text>
      <TouchableOpacity
        style={_thEventParticipant.unfollowButton}
        onPress={() => handleUnblock(item.id)}
      >
        <Text style={_thEventParticipant.unfollowButtonText}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <PageHeader title="Blocked Users" />
      <View style={_thEventParticipant.container}>
        <FlatList
          data={blockedUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export default BlockedUsersScreen;
