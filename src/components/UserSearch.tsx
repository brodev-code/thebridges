import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, ActivityIndicator, Alert } from 'react-native';
import { api } from '../services/api';
import { BroIcons } from './Icons';
import { theme } from '../theme';
import { _thUserSearch } from '../styles/UserSearchStyles';

interface UserSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectUser: (user: { id: number; name: string; email: string; phone:any; birthday:any,gender:any }) => void;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({ visible, onClose, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; email: string;phone:any; birthday:any,gender:any }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.length < 3) return;
    setLoading(true);
    try {
      const response = await api.get(`/users/search?query=${searchQuery}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={_thUserSearch.modalContainer}>
        <View style={_thUserSearch.modalContent}>
          <Text style={_thUserSearch.modalTitle}><BroIcons.User size={18}  color={theme.primary.color} />Search User</Text>
          <TextInput
            placeholder="Enter name"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            style={_thUserSearch.input}
            placeholderTextColor={theme.placeholderColor.color}
          />
          {loading ? <ActivityIndicator size="small" color={theme.primary.color} /> : null}
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectUser(item)} style={_thUserSearch.userItem}>
                <Text style={_thUserSearch.userName}>{item.name}</Text>
                <Text style={_thUserSearch.userEmail}>{item.email}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={_thUserSearch.buttonContainer}>
            <TouchableOpacity onPress={handleSearch} style={_thUserSearch.searchButton}>
              <BroIcons.Search size={14} color={theme.primary.color} />
              <Text style={_thUserSearch.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={_thUserSearch.closeButton}>
              <Text style={_thUserSearch.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserSearchModal;