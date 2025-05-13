import React, { useEffect, useState } from "react";
import { View, Image, FlatList, ActivityIndicator, Text, StyleSheet, ScrollView } from "react-native";
import { api, BASE_URL } from "../services/api";
import { _thEventGallery } from "../theme";

interface Photo {
  id: number;
  photo_name: string;
  gallery_id: number;
}

interface Gallery {
  id: number;
  name: string;
  description: string;
  event_id: number;
  photos: Photo[];
}

interface GalleryComponentProps {
  eventId: number;
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({ eventId }) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGalleries = async () => {
    try {
      setLoading(true);

      // API'den event'a ait galerileri çek
      const response = await api.get(`events/${eventId}/galleries`);
      setGalleries(response.data.data);
      console.log("Success", "Galleries loaded successfully.");
    } catch (error) {
      console.log("Error", "Failed to load galleries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [eventId]);

  const renderGallery = ({ item }: { item: Gallery }) => (
    <>
    <View style={_thEventGallery.galleryContainer}>
      <Text style={_thEventGallery.galleryName}>{item.name}</Text>
      <Text style={_thEventGallery.galleryDescription}>{item.description}</Text>
      {item.photos.length > 0 ? (
        <FlatList
          data={item.photos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderPhoto}
          keyExtractor={(photo) => photo.id.toString()}
        />
      ) : (
        <Text style={_thEventGallery.noPhotosText}>No photos available.</Text>
      )}
    </View>
    <View style={_thEventGallery.divider}></View>
   </>
  );

  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={_thEventGallery.imageCard}>
      <Image
        source={{ uri: `${BASE_URL}/storage/gallery/${item.photo_name}` }}
        style={_thEventGallery.image}
      />
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={_thEventGallery.loader} />;
  }

  if (galleries.length === 0) {
    return <Text style={_thEventGallery.noGalleriesText}>No galleries available.</Text>;
  }

  return (
    <ScrollView>
      <FlatList
        data={galleries}
        renderItem={renderGallery}
        keyExtractor={(gallery) => gallery.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 
});

export default GalleryComponent;