import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { _thFacilitatorDetails } from '../styles/FacilitatorDetailStyles';
import { AuthController } from '../controllers/AuthController';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FacilitatorDetailsScreen: React.FC = ({ route, navigation }: any) => {
  const { token } = route.params;
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveDetails = async () => {
    try {
      setLoading(true);

      // Facilitator detaylarını kaydet
      const { success, message } = await AuthController.saveFacilitatorDetails(
        token,
        {
          businessName,
          businessDescription,
          contactNumber,
          websiteUrl,
          agreement,
        }
      );

      if (success) {
        Alert.alert('Success', 'Facilitator details saved successfully.');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', message || 'Failed to save facilitator details.');
      }
    } catch (error) {
      console.error('Save details failed:', error);
      Alert.alert('Error', 'Failed to save facilitator details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={_thFacilitatorDetails.container}>
      <Text style={_thFacilitatorDetails.title}>Facilitator Details</Text>

      <TextInput
        style={_thFacilitatorDetails.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <TextInput
        style={_thFacilitatorDetails.input}
        placeholder="Business Description"
        value={businessDescription}
        onChangeText={setBusinessDescription}
      />

      <TextInput
        style={_thFacilitatorDetails.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
      />

      <TextInput
        style={_thFacilitatorDetails.input}
        placeholder="Website URL"
        value={websiteUrl}
        onChangeText={setWebsiteUrl}
      />

      <TouchableOpacity
        style={_thFacilitatorDetails.saveButton}
        onPress={handleSaveDetails}
        disabled={loading}>
        <Text style={_thFacilitatorDetails.saveButtonText}>
          {loading ? 'Saving...' : 'Save Details'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FacilitatorDetailsScreen;