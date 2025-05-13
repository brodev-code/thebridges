import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api, BASE_URL } from '../services/api';
import { ProfileData } from '../models/Profile';
import FavoriteButton from '../components/FavoriteButton';
import { RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { _thUserProfile } from '../styles/UserProfileStyles';
import { PageHeader } from '../components/PageHeader';

type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;
type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

type Props = {
  route: UserProfileRouteProp;
};

const UserProfile = ({ route }: Props) => {
  const { userId } = route.params;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigation = useNavigation<UserProfileNavigationProp>();

  const fetchProfileData = async () => {
    try {
      const response = await api.get(`/user/${userId}`);
      setProfileData(response.data.profile);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const response = await api.get(`/follow-check/${userId}`);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    checkFollowStatus();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      checkFollowStatus();
    }, [userId])
  );

  const handleFollow = async () => {
    try {
      const response = await api.post(`follow/${userId}`);
      if (response.data.message === 'User followed successfully.') {
        setIsFollowing(true);
        fetchProfileData();
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await api.post(`unfollow/${userId}`);
      if (response.data.message === 'User unfollowed successfully.') {
        setIsFollowing(false);
        fetchProfileData();
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleMessage = () => {
    if (profileData) {
      navigation.navigate('Chat', { userId, userName: profileData.name });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!profileData) {
    return <Text>Error loading profile data.</Text>;
  }

  const renderRetreat = ({ item }: { item: any }) => (
    <TouchableOpacity
            key={item.id}
            style={_thUserProfile.eventCard}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
          >
            {/* Etkinlik Resmi */}
            <Image 
              source={{ uri: `${BASE_URL}/storage/images/${item.image}` }} 
              style={_thUserProfile.eventImage} 
            />
            
            {/* İçerik Bilgileri */}
            <View style={_thUserProfile.eventInfo}>
              <Text style={_thUserProfile.eventDate}>{item.start_date} - {item.finish_date}</Text>
              <Text style={_thUserProfile.eventTitle}>{item.name}</Text>
              <Text style={_thUserProfile.eventAddress}>{item.address}</Text>
              
              {/* Alt Bilgiler */}
              <View style={_thUserProfile.bottomRow}>
                <View style={_thUserProfile.organizerWrapper}>
                  {item.facilitators.map((facilitator: { avatar: any; name: string; }, index: React.Key | null | undefined) => (
                    <View key={index} style={_thUserProfile.organizerContainer}>
                      <Image source={{ uri: `${BASE_URL}/storage/images/${facilitator.avatar}` }} style={_thUserProfile.organizerImage} />
                      <Text style={_thUserProfile.organizerName}>{facilitator.name.substring(0,20)}</Text>
                    </View>
                  ))}
                </View>
                <Text style={_thUserProfile.eventPrice}>{item.price}</Text>
              </View>
            </View>
            {/* Favori Butonu */}
            <FavoriteButton eventId={item.id} />
          </TouchableOpacity>
  );

  return (
    <>
     <PageHeader title={profileData.name} />
     <View style={_thUserProfile.container}>
      {/* Header */}
            <View style={_thUserProfile.header}>
              <Image source={{uri: profileData.avatar || '../assets/avatar.png'}} style={_thUserProfile.profileImage} />
              <View style={_thUserProfile.statsContainer}>
                <View style={_thUserProfile.stat}>
                  <Text style={_thUserProfile.statNumber}>{profileData.followers}</Text>
                  <Text style={_thUserProfile.statLabel}>Followers</Text>
                </View>
                <View style={_thUserProfile.stat}>
                  <Text style={_thUserProfile.statNumber}>{profileData.following}</Text>
                  <Text style={_thUserProfile.statLabel}>Following</Text>
                </View>
                <View style={_thUserProfile.stat}>
                  <Text style={_thUserProfile.statNumber}>{profileData.events}</Text>
                  <Text style={_thUserProfile.statLabel}>Events</Text>
                </View>
              </View>
            </View>
            <View style={_thUserProfile.followArea}>
            <TouchableOpacity style={isFollowing ? _thUserProfile.unfollowButton : _thUserProfile.followButton} onPress={() => (isFollowing ? handleUnfollow() : handleFollow())} >
              <Text style={isFollowing ? _thUserProfile.unfollowButtonText : _thUserProfile.followButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={_thUserProfile.messageButton} onPress={handleMessage} >
              <Text style={ _thUserProfile.messageButtonText}>Message</Text>
            </TouchableOpacity>
            </View>
      <View>
        {/* About Areas */}
        <Text style={_thUserProfile.aboutTitle}>About me</Text>
          <Text style={_thUserProfile.aboutText}>
            {profileData.about}
          </Text>
          <TouchableOpacity>
            <Text style={_thUserProfile.readMore}>Read more</Text>
          </TouchableOpacity>
      </View>
      <View>
      <Text style={_thUserProfile.retreatTitle}>My Retreats</Text>
      <FlatList
        data={profileData.retreats}
        renderItem={renderRetreat}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
    </View>
  </>
  );
};

export default UserProfile;
