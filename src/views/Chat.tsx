import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { api } from '../services/api';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { Message } from '../models/MessageData';
import { _thChat } from '../styles/ChatStyles';
import { PageHeader } from '../components/PageHeader';
import { BroIcons } from '../components/Icons';
import { theme } from '../theme';

type ChatRouteProp = RouteProp<RootStackParamList, 'Chat'>;

type Props = {
  route: ChatRouteProp;
};

const Chat = ({ route }: Props) => {
  const { userId, userName } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasAcceptedChat, setHasAcceptedChat] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setRefreshing(true);
      const response = await api.get(`messages/${userId}`);
      const messageArray = Object.keys(response.data.messages).map((key) => ({
        id: key,
        ...response.data.messages[key],
      }));
      setMessages(messageArray);

      // Update read status
      await api.post(`/messages/${userId}/read`);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  // First message confirmation
  const checkPermissionAndSend = () => {
    if (!hasAcceptedChat) {
      Alert.alert(
        'Did you want begin chating with ' + userName,
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: () => {
              setHasAcceptedChat(true);
              handleSendMessage();
            },
          },
        ],
      );
    } else {
      handleSendMessage();
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
      const response = await api.post('/message/send', {
        recipient_id: userId,
        message: newMessage,
      });
      if (response.data.message === 'Message sent successfully.') {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: String(new Date().getTime()),
            message: newMessage,
            recipient_id: String(userId),
            sender_id: response.data.sender_id,
            timestamp: new Date().getTime() / 1000,
          },
        ]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Block/unblock user
  const toggleBlockUser = async () => {
    try {
      if (isBlocked) {
        await api.post(`/unblock/${userId}`);
        Alert.alert('Başarılı', 'Kullanıcının engeli kaldırıldı.');
      } else {
        await api.post(`/block/${userId}`);
        Alert.alert('Başarılı', 'Kullanıcı engellendi.');
      }
      setIsBlocked(!isBlocked);
      setModalVisible(false);
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    }
  };

  // Report user
  const reportUser = async () => {
    try {
      await api.post(`/report/${userId}`);
      Alert.alert('Raporlandı', 'Kullanıcı raporlandı. İnceleme yapılacak.');
      setModalVisible(false);
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };

  // Render messages with different styles
  const renderMessage = ({ item }: { item: Message }) => {
    const isReceived = item.sender_id === userId;
    const time = new Date(item.timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View
        style={[
          styles.messageContainer,
          isReceived ? styles.receivedContainer : styles.sentContainer,
        ]}
      >
        <Text style={isReceived ? styles.receivedText : styles.sentText}>
          {item.message}
        </Text>
        <Text style={isReceived ? styles.receivedTime : styles.sentTime}>
          {time}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={_thChat.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <PageHeader
        title={userName}
        renderRightComponent={() => (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <BroIcons.Info size={24} color={theme.secondary.color} />
          </TouchableOpacity>
        )}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#4B0082" />
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={_thChat.messageList}
          contentContainerStyle={{ paddingBottom: 16 }}
          refreshing={refreshing}
          onRefresh={fetchMessages}
        />
      )}

      {/* Updated Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Block / Report</Text>              
              
              <TouchableOpacity 
                style={styles.modalDangerButton} 
                onPress={reportUser}
              >
                <Text style={styles.modalButtonText}>Report User</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalDangerButton} 
                onPress={toggleBlockUser}
              >
                <Text style={styles.modalButtonText}>
                  {isBlocked ? 'Unblock User' : 'Block User'}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.modalButtonRow}>
                <TouchableOpacity 
                  style={styles.modalCancelButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={_thChat.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Start typing..."
          style={_thChat.input}
          placeholderTextColor={theme.placeholderColor.color}
          editable={!isBlocked}
        />
        <TouchableOpacity
          onPress={checkPermissionAndSend}
          style={_thChat.sendButton}
          disabled={isBlocked}
        >
          <BroIcons.Send size={18} color="#4B0082" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Message styles
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  receivedContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 0,
  },
  sentContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#4B0082',
    borderBottomRightRadius: 0,
  },
  receivedText: {
    color: '#333',
    fontSize: 16,
  },
  sentText: {
    color: 'white',
    fontSize: 16,
  },
  receivedTime: {
    color: '#666',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  sentTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalDangerButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancelButton: {
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default Chat;