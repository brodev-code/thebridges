import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { api } from '../services/api'; // API bağlantısı
import { _thSettings } from '../styles/SettingStyles';
import { ProfileData } from '../models/ProfileData';
import { BroIcons } from './Icons';
import {BASE_URL} from '../services/api';


interface AvatarUploadProps {
  profile: { id: number; avatar: string };
  setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>; // Bunu ekle!
}

const AvatarUpload = ({ profile, setProfile }: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
      });

      uploadAvatar(image);
    } catch (error) {
      console.log('Image selection canceled:', error);
    }
  };

  // Avatarı API'ye Yükle
  const uploadAvatar = async (image: { path: string; mime: string }) => {
    if (!profile) return;
    setUploading(true);

    // Avatar dosyasını FormData olarak hazırlıyoruz
    const formData = new FormData();
    formData.append('avatar', {
      uri: image.path,
      type: image.mime,
      name: `avatar_${profile.id}.jpg`, // İstediğiniz formatta dosya ismi
    });

    try {
      const response = await api.post('user/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.code === 200) {
        setProfile((prev) => prev ? { ...prev, avatar: response.data.avatar } : prev);
        Alert.alert('Başarılı', 'Avatar güncellendi.');
      } else {
        Alert.alert('Hata', 'Avatar yüklenemedi.');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Error', 'Avatar yüklenirken bir sorun oluştu.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={_thSettings.avatarContainer}>
      {profile?.avatar ? (
        <Image source={{ uri: BASE_URL+'/storage/avatars/'+profile.avatar }} style={_thSettings.avatar} />
      ) : (
        <View style={_thSettings.avatarText}><BroIcons.Plus size={24} /></View>
      )}
      {uploading && <Text style={{ color: 'red' }}>Yükleniyor...</Text>}
    </TouchableOpacity>
  );
};

export default AvatarUpload;
