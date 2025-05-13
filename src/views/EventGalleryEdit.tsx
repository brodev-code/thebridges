import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert, TextInput, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { api, BASE_URL } from '../services/api';
import _thGalleryStyles from '../styles/EventGalleryEditStyles';
import { BroIcons } from '../components/Icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { PageHeader } from '../components/PageHeader';

const EventGalleryEdit = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { eventId } = route.params as { eventId: string };

  interface Photo {
    id: string;
    photo_name: string;
    gallery_id: string;
  }

  interface Gallery {
    id: string;
    name: string;
    description: string;
    event_id: string;
    photos: Photo[];
  }

  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [newGalleryName, setNewGalleryName] = useState<string>('');
  const [newGalleryDescription, setNewGalleryDescription] = useState<string>('');
  const [isEditingGallery, setIsEditingGallery] = useState<boolean>(false);
  const [showCreateGalleryForm, setShowCreateGalleryForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${eventId}/galleries`);
      setGalleries(response.data.data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateGallery = async () => {
    if (!newGalleryName) {
      Alert.alert('Error', 'Please enter a gallery name.');
      return;
    }

    try {
      setLoading(true);
      if (isEditingGallery && selectedGalleryId) {
        await api.put(`/galleries/${selectedGalleryId}`, {
          name: newGalleryName,
          description: newGalleryDescription,
        });
      } else {
        await api.post('/galleries', {
          name: newGalleryName,
          description: newGalleryDescription,
          event_id: eventId,
        });
      }
      fetchGalleries();
      setNewGalleryName('');
      setNewGalleryDescription('');
      setIsEditingGallery(false);
      setSelectedGalleryId(null);
      setShowCreateGalleryForm(false);
    } catch (error) {
      console.error('Error creating/updating gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    if (!selectedGalleryId) {
      Alert.alert('Error', 'Please select a gallery first.');
      return;
    }

    let result = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    });

    if (result) {
      uploadImage(result.path, selectedGalleryId);
    }
  };

  const uploadImage = async (uri: string, galleryId: string) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('photo', {
        uri,
        name: `event_${eventId}_gallery_${galleryId}.jpg`,
        type: 'image/jpeg',
      });

      await api.post(`/galleries/${galleryId}/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchGalleries();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (galleryId: string, photoId: string) => {
    try {
      setLoading(true);
      await api.delete(`/photos/${photoId}`);
      fetchGalleries();
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setLoading(false);
    }
  };

  const editGallery = (gallery: Gallery) => {
    setNewGalleryName(gallery.name);
    setNewGalleryDescription(gallery.description);
    setIsEditingGallery(true);
    setSelectedGalleryId(gallery.id);
    setShowCreateGalleryForm(true);
  };

  const renderGalleryItem = ({ item }: { item: Gallery }) => (
    <TouchableOpacity
      style={[
        _thGalleryStyles.galleryItem,
        selectedGalleryId === item.id && _thGalleryStyles.selectedGalleryItem,
      ]}
      onPress={() => {
        setSelectedGalleryId(item.id);
        editGallery(item);
      }}
    >
      <Text style={_thGalleryStyles.galleryName}>{item.name}</Text>
      <Text style={_thGalleryStyles.galleryDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderPhotoItem = ({ item }: { item: Photo }) => (
    <View style={_thGalleryStyles.imageContainer}>
      <Image source={{ uri: `${BASE_URL}/storage/gallery/${item.photo_name}` }} style={_thGalleryStyles.image} />
      <TouchableOpacity onPress={() => deleteImage(item.gallery_id, item.id)} style={_thGalleryStyles.deleteButton}>
        <Text style={_thGalleryStyles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <PageHeader title={eventId ? 'Edit Gallery' : 'Create Gallery'} />
      <View style={_thGalleryStyles.container}>
        {loading && (
          <View style={_thGalleryStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#4B0082" />
          </View>
        )}
        {showCreateGalleryForm && (
          <>
            <TextInput
              style={_thGalleryStyles.input}
              placeholder="Gallery Name"
              value={newGalleryName}
              onChangeText={setNewGalleryName}
            />
            <TextInput
              style={_thGalleryStyles.input}
              placeholder="Gallery Description"
              value={newGalleryDescription}
              onChangeText={setNewGalleryDescription}
            />
            <TouchableOpacity style={_thGalleryStyles.createButton} onPress={createOrUpdateGallery}>
              <Text style={_thGalleryStyles.createButtonText}>
                {isEditingGallery ? 'Update Gallery' : 'Create Gallery'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={_thGalleryStyles.header}>Select Gallery</Text>
        <FlatList
          data={galleries}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderGalleryItem}
          contentContainerStyle={_thGalleryStyles.flatListContentContainer}
          ListFooterComponent={
            <TouchableOpacity
              style={_thGalleryStyles.addGalleryButton}
              onPress={() => {
                setNewGalleryName('');
                setNewGalleryDescription('');
                setShowCreateGalleryForm(true);
                setIsEditingGallery(false);
                setSelectedGalleryId(null);
              }}
            >
              <BroIcons.Plus size={30} color="#003333" />
            </TouchableOpacity>
          }
        />

        {selectedGalleryId && (
          <>
            <Text style={_thGalleryStyles.header}>Photos in Selected Gallery</Text>
            <FlatList
              data={galleries.find(g => g.id === selectedGalleryId)?.photos || []}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={renderPhotoItem}
              contentContainerStyle={_thGalleryStyles.flatListContentContainer}
              ListFooterComponent={
                <TouchableOpacity onPress={pickImage} style={_thGalleryStyles.addButton}>
                  <BroIcons.Plus size={30} color="#003333" />
                </TouchableOpacity>
              }
            />
          </>
        )}

        <TouchableOpacity style={_thGalleryStyles.nextButton} onPress={() => navigation.navigate('TicketEdit', { eventId: Number(eventId) })}>
          <Text style={_thGalleryStyles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EventGalleryEdit;