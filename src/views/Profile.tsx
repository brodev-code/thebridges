import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { api, BASE_URL } from '../services/api';
import { StackActions, useNavigation } from '@react-navigation/native';
import BottomMenu from '../components/BottomMenu';
import {RootStackParamList} from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { _thProfile } from '../styles/ProfileStyles';
import { PageHeader } from '../components/PageHeader';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFacilitator, setIsFacilitator] = useState<boolean | null>(null); // Facilitator olup olmadığını kontrol edeceğiz

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('user/');
        setProfileData(response.data.user);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };
     // Facilitator kontrolünü API ile yapıyoruz
     const facilitatorCheck = async () => {
      try {
        const response = await api.get('facilitator/check');
        if (response.data.isFacilitator === true) {
          setIsFacilitator(true);  // Eğer facilitator ise
        } else {
          setIsFacilitator(false); // Eğer değilse
        }
        setLoading(false);
      } catch (error) {
        //console.error(error);
      setIsFacilitator(false);  // Eğer bir hata olursa, facilitator değil olarak kabul edebiliriz
      setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
      facilitatorCheck();
    });
  
    return unsubscribe; // Temizleme fonksiyonu
  }, [navigation]);

  const deleteProfile = async () => {
    try {
      const response = await api.delete('user/soft-delete');
      setLoading(false);
      await AsyncStorage.clear();
      return Alert.alert("Logged Out", "User Profile Deleted successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Your profile is not deleted!');
      console.error('Error Deleting:', error);
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteProfile()},
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color={theme.primary.color} />;
  }

  if (!profileData) {
    return <ActivityIndicator size="large" color={theme.primary.color} />;
  }

  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <PageHeader title={profileData.name} showLogout />
    <View style={_thProfile.container}>
      {/* Header */}
      <View style={_thProfile.header}>      
        <Image source={{ uri: BASE_URL+'/storage/avatars/'+profileData.avatar}} style={_thProfile.profileImage} />
        <View style={_thProfile.statsContainer}>
          <View style={_thProfile.stat}>
            <Text style={_thProfile.statNumber}>{profileData.followers}</Text>
            <Text style={_thProfile.statLabel}>Followers </Text>
          </View>
          <View style={_thProfile.stat}>
            <Text style={_thProfile.statNumber}>{profileData.following}</Text>
            <Text style={_thProfile.statLabel}>Following</Text>
          </View>
          <View style={_thProfile.stat}>
            <Text style={_thProfile.statNumber}>{profileData.events}</Text>
            <Text style={_thProfile.statLabel}>Events</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      {isFacilitator===true&&
        <TouchableOpacity style={_thProfile.button} onPress={() => navigation.navigate('MyEvents')}>
           <Text style={_thProfile.buttonText}>My Retreats</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity
        style={[_thProfile.button, _thProfile.secondaryButton]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={[_thProfile.buttonText, _thProfile.secondaryButtonText]}>Profile Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[_thProfile.button, _thProfile.secondaryButton]}
        onPress={() => console.log('GDPR & Privacy')}
      >
        <Text style={[_thProfile.buttonText, _thProfile.secondaryButtonText]}>GDPR & Privacy</Text>
      </TouchableOpacity>
      {/* Boşluğu İtme */}
      <View style={{ flex: 1 }} />
      {/* Delete Account */}
      <TouchableOpacity onPress={handleDeleteAccount}>
        <Text style={_thProfile.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
      <BottomMenu />
    </>
  );
};

export default Profile;