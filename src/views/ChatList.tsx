import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { api, BASE_URL } from '../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Conversation } from '../models/Conversation';
import { _thChatList } from '../styles/ChatListStyles';
import {PageHeader} from '../components/PageHeader';
import { BroIcons } from '../components/Icons';
import { RootStackParamList } from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../theme';

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

const ChatList: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchResults, setUserSearchResults] = useState<any[]>([]);

  const navigation = useNavigation<ChatListScreenNavigationProp>();

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      setRefreshing(true);
      const response = await api.get('message/list');
      setConversations(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch user search results
  const fetchUserSearchResults = async (query: string) => {
    try {
      if (query.length === 0) {
        setUserSearchResults([]);
        return;
      }
      const response = await api.get(`users/search?query=${query}`);
      const allUsers = response.data.data.data;

      const existingUserIds = new Set(conversations.map((conv) => conv.other_user_id));
      const filteredUsers = allUsers.filter((user: { id: string }) => !existingUserIds.has(user.id));

      setUserSearchResults(filteredUsers);
    } catch (error) {
      console.error('Error fetching user search results:', error);
    }
  };

  // Fetch conversations when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchConversations();
    }, [])
  );

  // Update search results when search query changes
  useEffect(() => {
    fetchUserSearchResults(searchQuery);
  }, [searchQuery]);

  // Merge conversations and search results
  const mergedList = [
    ...conversations.filter((conv) =>
      conv.other_user_name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    ...userSearchResults,
  ];

  // Reset search when user navigates to a conversation
  const handleConversationPress = (item: any) => {
    // Reset search query and search results before navigating
    setSearchQuery('');
    setUserSearchResults([]);
    navigation.navigate('Chat', {
      userId: Number(item.other_user_id || item.id),
      userName: item.other_user_name || item.name,
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleConversationPress(item)}>
      <View style={_thChatList.conversationContainer}>
        <Image
          source={
            item.other_user_avatar || item.avatar
              ? { uri: BASE_URL + '/storage/avatars/' + (item.other_user_avatar || item.avatar) }
              : require('../assets/avatar.png')
          }
          style={_thChatList.avatar}
        />
        <View style={_thChatList.conversationDetails}>
          <Text style={_thChatList.userName}>{item.other_user_name || item.name}</Text>
          <Text style={_thChatList.lastMessage}>{item.last_message || item.email}</Text>
          <Text style={_thChatList.timestamp}>{item.timestamp || item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <PageHeader title="Messages" showAddMessage />
      <View style={_thChatList.container}>
        <View style={_thChatList.header}>
          <View style={_thChatList.searchIcon}>
            <BroIcons.Search size={16} color="#003333" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search users..."
            style={_thChatList.searchBar}
            placeholderTextColor={theme.placeholderColor.color}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4B0082" />
        ) : (
          <FlatList
            data={mergedList}
            renderItem={renderItem}
            keyExtractor={(item) =>
              item.conversation_id
                ? item.conversation_id.toString()
                : item.id.toString()
            }
            refreshing={refreshing}
            onRefresh={fetchConversations}
          />
        )}
      </View>
    </>
  );
};

export default ChatList;
