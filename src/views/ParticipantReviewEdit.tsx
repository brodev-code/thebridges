import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { BroIcons } from '../components/Icons';
import { api } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { PageHeader } from '../components/PageHeader';
import { _thParticipantReviewEdit } from '../styles/ParticipantReviewEditStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../theme';

type Facilitator = {
  user_id: number;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  pivot: {
    event_id: number;
    user_id: number;
  };
};

type ReviewFormData = {
  review: string;
  event_rating: number;
  is_public: boolean;
  facilitator_ratings: { facilitator_id: number; rating: number }[]; // API'nin beklediği format
};

const AddEditReviewScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { eventId, review } = route.params as any;

  const [formData, setFormData] = useState<ReviewFormData>({
    review: review?.review || '',
    event_rating: review?.event_rating || 0,
    is_public: review?.is_public ?? true,
    facilitator_ratings: review?.facilitator_ratings || [],
  });

  const [facilitators, setFacilitators] = useState<Facilitator[]>([]);
  const [loading, setLoading] = useState(false);
  const [openVisibility, setOpenVisibility] = useState(false);
  const [visibilityItems] = useState([
    { label: 'Add your public review', value: true },
    { label: 'Send private feedback', value: false }
  ]);

  useEffect(() => {
    const fetchFacilitators = async () => {
      try {
        const response = await api.get(`/events/${eventId}/facilitators`);
        setFacilitators(response.data.data);
        
        // Eğer mevcut review yoksa başlangıç değerlerini ayarla
        if (!review?.facilitator_ratings || review.facilitator_ratings.length === 0) {
          const initialRatings = response.data.data.map((f: Facilitator) => ({
            facilitator_id: f.user_id, // user_id'yi facilitator_id olarak kullanıyoruz
            rating: 0
          }));
          setFormData(prev => ({
            ...prev,
            facilitator_ratings: initialRatings
          }));
        }
      } catch (error) {
        console.error('Error fetching facilitators:', error);
        Alert.alert('Error', 'Could not fetch facilitators. Please try again later.');
      }
    };
    fetchFacilitators();
  }, [eventId]);

  const handleFacilitatorRating = (userId: number, newRating: number) => {
    setFormData(prev => {
      const existingIndex = prev.facilitator_ratings.findIndex(
        fr => fr.facilitator_id === userId
      );
      
      if (existingIndex >= 0) {
        const updatedRatings = [...prev.facilitator_ratings];
        updatedRatings[existingIndex] = {
          ...updatedRatings[existingIndex],
          rating: newRating
        };
        return {
          ...prev,
          facilitator_ratings: updatedRatings
        };
      } else {
        return {
          ...prev,
          facilitator_ratings: [
            ...prev.facilitator_ratings,
            { facilitator_id: userId, rating: newRating }
          ]
        };
      }
    });
  };

  const getFacilitatorRating = (userId: number) => {
    const ratingObj = formData.facilitator_ratings.find(
      fr => fr.facilitator_id === userId
    );
    return ratingObj ? ratingObj.rating : 0;
  };

  const handleEventRating = (rating: number) => {
    setFormData(prev => ({ ...prev, event_rating: rating }));
  };

  const handleSubmit = async () => {
    const ratedFacilitators = formData.facilitator_ratings.filter(fr => fr.rating > 0);
    
    if (!formData.review || formData.event_rating === 0 || ratedFacilitators.length === 0) {
      Alert.alert('Error', 'Please fill all required fields and rate at least one facilitator');
      return;
    }
  
    setLoading(true);
    try {
      const payload = {
        event_id: eventId,
        review: formData.review,
        event_rating: formData.event_rating,
        is_public: formData.is_public,
        facilitator_ratings: ratedFacilitators
      };
  
      console.log('Gönderilen Veri:', JSON.stringify(payload, null, 2));
  
      const endpoint = review ? `/reviews/${review.id}` : '/reviews';
      const method = review ? 'put' : 'post';
      
      const response = await api[method](endpoint, payload);
      
      // Başarı durumunda kontrol
      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Success', review ? 'Review updated!' : 'Review added!');
        navigation.goBack();
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Full Error Object:', error);
      
      // Detaylı hata mesajı
      let errorMessage = 'Unknown error';
      if (error.response) {
        // Sunucudan gelen hata
        errorMessage = JSON.stringify({
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        }, null, 2);
      } else if (error.request) {
        // İstek yapıldı ama yanıt alınamadı
        errorMessage = "No response received";
      } else {
        // İstek gönderilmeden önce hata
        errorMessage = error.message;
      }
      
      Alert.alert('Error',`Failed to submit review.\n${error.response.data.message || errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title='Reviews' />
      <ScrollView style={_thParticipantReviewEdit.container}>
        {/* Visibility Dropdown */}
        <DropDownPicker
          open={openVisibility}
          value={formData.is_public}
          items={visibilityItems}
          setOpen={setOpenVisibility}
          setValue={(callback) => {
            const value = callback(formData.is_public);
            setFormData(prev => ({ ...prev, is_public: value }));
          }}
          placeholder="Select visibility"
          style={[_thParticipantReviewEdit.dropdown, { marginBottom: 16 }]}
          dropDownContainerStyle={_thParticipantReviewEdit.dropdownContainer}
          textStyle={_thParticipantReviewEdit.dropdownText}
          ArrowUpIconComponent={() => <BroIcons.ArrowUp color="#4B0082" />}
          ArrowDownIconComponent={() => <BroIcons.ArrowDown color="#4B0082" />}
        />

        {/* Write Review Input */}
        <TextInput
          multiline
          style={_thParticipantReviewEdit.input}
          placeholder="Write Your Review..."
          placeholderTextColor={theme.placeholderColor.color}
          value={formData.review}
          onChangeText={(text) => setFormData(prev => ({ ...prev, review: text }))}
        />

        {/* Event Rating Section */}
        <Text style={_thParticipantReviewEdit.sectionHeader}>Rate the Event</Text>
        <View style={_thParticipantReviewEdit.starContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={`event-${num}`}
              onPress={() => handleEventRating(num)}
            >
              {num <= formData.event_rating ?
                <BroIcons.StarFilled color="#4B0082" size={20} /> :
                <BroIcons.StarOutline color="#B1B1B1" size={20} />
              }
            </TouchableOpacity>
          ))}
        </View>

        {/* Facilitators Rating Section */}
        <Text style={[_thParticipantReviewEdit.sectionHeader, { marginTop: 24 }]}>Rate Facilitators</Text>
        
        {facilitators.map((facilitator) => (
          <View key={`fac-${facilitator.user_id}`} style={_thParticipantReviewEdit.facilitatorItem}>
            <Text style={_thParticipantReviewEdit.facilitatorName}>
              {facilitator.name}
            </Text>
            <View style={_thParticipantReviewEdit.starContainer}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={`fac-rating-${facilitator.user_id}-${num}`}
                  onPress={() => handleFacilitatorRating(facilitator.user_id, num)}
                >
                  {num <= getFacilitatorRating(facilitator.user_id) ?
                    <BroIcons.StarFilled color="#4B0082" size={20} /> :
                    <BroIcons.StarOutline color="#B1B1B1" size={20} />
                  }
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            _thParticipantReviewEdit.button,
            loading && { opacity: 0.7 }
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={_thParticipantReviewEdit.buttonText}>
              {review ? 'Update Review' : 'Add Review'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default AddEditReviewScreen;