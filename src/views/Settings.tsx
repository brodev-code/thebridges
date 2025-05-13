import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Alert, FlatList, TextInput, ActivityIndicator, Switch,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { api, formatBirthday } from '../services/api';
import { _thSettings } from '../styles/SettingStyles';
import { PageHeader } from '../components/PageHeader';
import AvatarUpload from '../components/AvatarUpload';
import { ProfileData } from '../models/ProfileData';
import { BroIcons } from '../components/Icons';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import DeviceInfo from 'react-native-device-info';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Facilitator alanları
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [agreement, setAgreement] = useState(false);

  // Kullanıcı bilgilerini getir
  const fetchProfile = async () => {
    try {
      const response = await api.get('/user');
      if (response.data && response.data.user) {
        const user = response.data.user;
        if (user.birthday) {
          const parsedDate = new Date(user.birthday);
          if (!isNaN(parsedDate.getTime())) {
            setDate(parsedDate);
            user.birthday = parsedDate.toISOString().split('T')[0];
          }
        }
        setProfile(user);
      }
  
      // Eğer facilitator ise detayları getir
      if (response.data.user.role === 'facilitator') {
        try {
          const facilitatorResponse = await api.get('/facilitator-details');
          if (facilitatorResponse.data && facilitatorResponse.data.data) {
            const f = facilitatorResponse.data.data;
            setBusinessName(f.business_name || '');
            setBusinessDescription(f.business_description || '');
            setContactNumber(f.contact_number || '');
            setWebsiteUrl(f.website_url || '');
            setAgreement(f.agreement === 1);
          }
        } catch (facilitatorError: any) {
          // 404 facilitator detail not found durumunu yoksay
          if (facilitatorError.response?.status !== 404) {
            console.error('Facilitator detayları alınamadı:', facilitatorError);
          }
        }
      }
    } catch (error) {
      console.error('Profil bilgileri alınamadı:', error);
      Alert.alert('Hata', 'Profil bilgileri alınamadı.');
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [isFocused])
  );

// Kaydet
const handleSave = async () => {
  if (!profile) return;

  setLoading(true);

  const updatedProfile = {
    ...profile,
    agreement: agreement ? 1 : 0,
    birthday: profile.birthday ? new Date(profile.birthday).getTime() / 1000 : null,
  };

  try {
    const res = await api.put('/user/profile', updatedProfile);
    if (res.data.code === 200) {
      await AsyncStorage.setItem('user_data', JSON.stringify(res.data.user));
      setProfile(res.data.user);

      // Eğer facilitator rolündeyse facilitator detaylarını kaydet
      if (profile.role === 'facilitator') {
        try {
          // Facilitator detaylarının varlığını kontrol et
          const checkRes = await api.get('/facilitator-details');
          if (checkRes.data && checkRes.data.data) {
            // Kayıt varsa PUT ile güncelle
            await api.post('/facilitator-details', {
              business_name: businessName,
              business_description: businessDescription,
              contact_number: contactNumber,
              website_url: websiteUrl,
              agreement: agreement ? 1 : 0,
            });
          } else {
            // Eğer GET isteğinde data null geldiyse, POST ile oluştur
            await api.post('/facilitator-details', {
              business_name: businessName,
              business_description: businessDescription,
              contact_number: contactNumber,
              website_url: websiteUrl,
              agreement: agreement ? 1 : 0,
            });
          }
        } catch (facError: any) {
          // Eğer GET isteği 404 veriyorsa, POST ile oluştur
          if (facError.response?.status === 404) {
            await api.post('/facilitator-details', {
              business_name: businessName,
              business_description: businessDescription,
              contact_number: contactNumber,
              website_url: websiteUrl,
              agreement: agreement ? 1 : 0,
            });
          } else {
            console.error('Facilitator kayıt hatası:', facError);
            Alert.alert('Hata', 'Facilitator bilgileri kaydedilemedi.');
          }
        }
      }

      Alert.alert('Başarılı', 'Profil güncellendi.');
    } else {
      Alert.alert('Hata', 'Güncelleme başarısız.');
    }
  } catch (err) {
    console.error(err);
    Alert.alert('Hata', 'Güncellenirken sorun oluştu.');
  } finally {
    setLoading(false);
  }
};


   // Tarih seçildiğinde işle
   const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      setProfile((prev) =>
        prev ? { ...prev, birthday: selectedDate.toISOString().split('T')[0] } : prev
      );
    }
    setShowDatePicker(false);
  };

  if (!profile) {
    return <ActivityIndicator size="large" color={theme.primary.color} />;
  }

  return (
    <>
      <PageHeader title={profile.name} />
      <FlatList
        style={_thSettings.container}
        data={[{ key: 'form' }]}
        renderItem={() => (
          <View style={_thSettings.form}>
            <AvatarUpload profile={{ id: profile.id, avatar: profile.avatar || '' }} setProfile={setProfile} />

            <DropDownPicker
              open={openRole}
              value={profile.role}
              items={[
                { label: 'Guest', value: 'guest' },
                { label: 'Participant', value: 'participant' },
                { label: 'Facilitator', value: 'facilitator' },
              ]}
              setOpen={setOpenRole}
              setValue={(cb) =>
                setProfile((prev) => (prev ? { ...prev, role: cb(prev.role) } : prev))
              }
              style={_thSettings.picker}
            />

            <TextInput style={_thSettings.input} placeholder="Full Name" value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              placeholderTextColor={theme.placeholderColor.color}
            />
            <TextInput style={_thSettings.input} placeholder="Email" value={profile.email}
              onChangeText={(text) => setProfile({ ...profile, email: text })}
              placeholderTextColor={theme.placeholderColor.color}
              keyboardType="email-address"
            />
            <TouchableOpacity style={_thSettings.input} onPress={() => setShowDatePicker(true)}>
              <Text>{profile.birthday ? formatBirthday(profile.birthday) : 'Select Birthday'}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
            )}
            <View style={_thSettings.passwordWrapper}>
              <TextInput
                style={[_thSettings.input, _thSettings.locationInput]}
                placeholder="Location"
                value={profile.location}
                onChangeText={(text) => setProfile({ ...profile, location: text })}
                placeholderTextColor={theme.placeholderColor.color}
              />
              <TouchableOpacity style={_thSettings.icon} onPress={() => navigation.navigate('LocationSelect')}>
                <BroIcons.Location size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={_thSettings.passwordWrapper}>
              <TextInput
                style={_thSettings.input}
                placeholder="Password"
                value={profile.password || ''}
                onChangeText={(text) => setProfile({ ...profile, password: text })}
                secureTextEntry={!showPassword}
                placeholderTextColor={theme.placeholderColor.color}
              />
              <TouchableOpacity style={_thSettings.icon} onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <BroIcons.EyeClosed size={20} color="#666" /> : <BroIcons.Eye size={20} color="#666" />}
              </TouchableOpacity>
            </View>

            <TextInput style={_thSettings.input} placeholder="Phone" value={profile.phone || ''}
              onChangeText={(text) => setProfile({ ...profile, phone: text })}
              placeholderTextColor={theme.placeholderColor.color}
              keyboardType="phone-pad"
            />

            <DropDownPicker
              open={openGender}
              value={profile.gender}
              items={[
                { label: 'Female', value: 'female' },
                { label: 'Male', value: 'male' },
                { label: 'Other', value: 'other' },
              ]}
              setOpen={setOpenGender}
              setValue={(cb) =>
                setProfile((prev) => (prev ? { ...prev, gender: cb(prev.gender) } : prev))
              }
              style={_thSettings.picker}
            />

            {profile.role === 'facilitator' && (
              <>
                <TextInput style={_thSettings.input} placeholder="Business Name" value={businessName}
                  onChangeText={setBusinessName} placeholderTextColor={theme.placeholderColor.color} />
                <TextInput style={_thSettings.input} placeholder="Business Description" value={businessDescription}
                  onChangeText={setBusinessDescription} placeholderTextColor={theme.placeholderColor.color} />
                <TextInput style={_thSettings.input} placeholder="Contact Number" value={contactNumber}
                  onChangeText={setContactNumber} placeholderTextColor={theme.placeholderColor.color} />
                <TextInput style={_thSettings.input} placeholder="Website URL" value={websiteUrl}
                  onChangeText={setWebsiteUrl} placeholderTextColor={theme.placeholderColor.color} />
                <View style={_thSettings.switchContainer}>
                  <Text style={_thSettings.switchText}>Agreement</Text>
                  <Switch value={agreement} onValueChange={setAgreement} />
                </View>
              </>
            )}

            <TouchableOpacity style={_thSettings.saveButton} onPress={handleSave} disabled={loading}>
              <Text style={_thSettings.saveButtonText}>{loading ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </>
  );
};

export default SettingsScreen;
