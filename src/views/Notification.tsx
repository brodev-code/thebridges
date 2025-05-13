import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Alert, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PageHeader } from '../components/PageHeader';
import { _thNotification } from '../styles/NotificationStyles';
import {api} from '../services/api';
import { Swipeable } from 'react-native-gesture-handler';
import { BroIcons } from '../components/Icons';

interface NotificationItem {
  id: number;
  title: string;
  description: string;
}

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('notifications');
      setNotifications(response.data.data);
    } catch (error) {
      console.error("Fetch Notifications Error:", error);
      Alert.alert("Error", "Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await api.delete(`notifications/${id}`);
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error("Delete Notification Error:", error);
      Alert.alert("Error", "Failed to delete notification.");
    }
  };

  const handleRemoveNotifications = () => {
    Alert.alert(
      "Remove All Notifications",
      "Are you sure you want to remove all notifications?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove All",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete('notifications');
              setNotifications([]);
            } catch (error) {
              console.error("Delete All Notifications Error:", error);
              Alert.alert("Error", "Failed to delete all notifications.");
            }
          },
        }
      ]
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, id: number) => {
    return (
      <TouchableOpacity
        onPress={() => deleteNotification(id)}
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          height: '100%',
          borderRadius: 10,
          marginVertical: 5,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
      overshootRight={false}
    >
      <TouchableOpacity
        style={_thNotification.notificationCard}
        onLongPress={() => {
          Alert.alert(
            "Delete Notification",
            "Are you sure you want to delete this notification?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", onPress: () => deleteNotification(item.id) }
            ]
          );
        }}
      >
        <Text style={_thNotification.notificationTitle}>{item.title}</Text>
        <Text style={_thNotification.notificationDescription}>{item.description}</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <PageHeader
        title="Notification"
        showRemoveNotification
        onRemoveNotification={handleRemoveNotifications}
      />
      <View style={_thNotification.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#003D33" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={_thNotification.listContainer}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text style={{ color: '#999' }}><BroIcons.Info /> No notifications</Text>
              </View>
            }
          />
        )}
      </View>
    </>
  );
};

export default NotificationScreen;
