import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { api, BASE_URL, formatDateOnly, formatTime } from '../services/api';
import { RootStackParamList } from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { _thEventEdit } from '../styles/EventEditStyles';
import { PageHeader } from '../components/PageHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MultipleSelect from 'react-native-multiple-select';
import ImagePicker from 'react-native-image-crop-picker';
import { BroIcons } from '../components/Icons';
import { theme } from '../theme';

type EventEditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EventEdit'>;
type EventEditScreenRouteProp = RouteProp<RootStackParamList, 'EventEdit'>;

type Props = {
  navigation: EventEditScreenNavigationProp;
  route: EventEditScreenRouteProp;
};

export const EventEdit: React.FC<Props> = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    name: '',
    subname: [],
    status: '',
    language: '',
    link: '',
    sort: '0',
    description: '',
    info_1: '',
    info_2: '',
    icon: '',
    longitude: '',
    latitude: '',
    address: '',
    start_date: '',
    finish_date: '',
    image: null,
  });

  const [languages, setLanguages] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<any[]>([]);
  const [openLanguage, setOpenLanguage] = useState(false);
  
  // Date and time states
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState<{ 
    field: 'start_date' | 'start_time' | 'finish_date' | 'finish_time' | null; 
    mode: 'date' | 'time' 
  }>({ field: null, mode: 'date' });

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await api.get('/events/' + eventId);
          const eventData = response.data.data;
          
          // Parse existing dates if they exist
          if (eventData.start_date) {
            const startDateTime = new Date(eventData.start_date);
            setStartDate(startDateTime);
            setStartTime(startDateTime);
          }
          
          if (eventData.finish_date) {
            const endDateTime = new Date(eventData.finish_date);
            setEndDate(endDateTime);
            setEndTime(endDateTime);
          }
          
          setFormData(eventData);
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      };
      fetchEvent();
    }

    // Fetch languages and interests
    const fetchLanguages = async () => {
      try {
        const response = await api.get('/languages');
        const languagesData = response.data.data || [];
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setLanguages([]);
      }
    };

    const fetchInterests = async () => {
      try {
        const response = await api.get('/interests');
        const interestsData = response.data.data || [];
        setInterests(interestsData);
      } catch (error) {
        console.error('Error fetching interests:', error);
        setInterests([]);
      }
    };

    fetchLanguages();
    fetchInterests();
  }, [eventId]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateTimeChange = (event: any, selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setShowPicker({ field: null, mode: 'date' });
      return;
    }

    const { field, mode } = showPicker;
    
    if (field === 'start_date') {
      setStartDate(selectedDate);
      // Combine date with existing time
      const combinedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );
      setFormData({
        ...formData,
        start_date: combinedDateTime.toISOString().slice(0, 19).replace('T', ' ')
      });
    } 
    else if (field === 'start_time') {
      setStartTime(selectedDate);
      // Combine time with existing date
      const combinedDateTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes()
      );
      setFormData({
        ...formData,
        start_date: combinedDateTime.toISOString().slice(0, 19).replace('T', ' ')
      });
    }
    else if (field === 'finish_date') {
      setEndDate(selectedDate);
      // Combine date with existing time
      const combinedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );
      setFormData({
        ...formData,
        finish_date: combinedDateTime.toISOString().slice(0, 19).replace('T', ' ')
      });
    }
    else if (field === 'finish_time') {
      setEndTime(selectedDate);
      // Combine time with existing date
      const combinedDateTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes()
      );
      setFormData({
        ...formData,
        finish_date: combinedDateTime.toISOString().slice(0, 19).replace('T', ' ')
      });
    }

    setShowPicker({ field: null, mode: 'date' });
  };

  const formattedInterests = interests.map(interest => ({
    label: interest.name,
    value: interest.id.toString(),
  }));

  const validateForm = () => {
    const requiredFields = ['name', 'address', 'start_date', 'finish_date'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        Alert.alert('Error', `${field} is required!`);
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
      });

      setFormData(prev => ({
        ...prev,
        image: {
          uri: image.path,
          type: image.mime,
          name: `event_image_${Date.now()}.jpg`,
        },
      }));
    } catch (error) {
      console.log('Image selection canceled:', error);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    // Make sure dates are properly formatted before submission
    const submissionData: Record<string, any> = {
      ...formData,
      start_date: formData.start_date || 
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startTime.getHours(),
          startTime.getMinutes()
        ).toISOString().slice(0, 19).replace('T', ' '),
      finish_date: formData.finish_date || 
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          endTime.getHours(),
          endTime.getMinutes()
        ).toISOString().slice(0, 19).replace('T', ' ')
    };

    const headers = {
      'Content-Type': 'multipart/form-data',
    };
  
    const data = new FormData();
    Object.keys(submissionData).forEach((key) => {
      const value = submissionData[key];
      if (value != null) {
        if (key === 'image') {
          if (typeof value === 'object' && value.uri) {
            data.append(key, {
              uri: value.uri,
              type: value.type,
              name: value.name,
            });
          } else if (typeof value === 'string') {
            data.append(key, value);
          }
        } else if (Array.isArray(value)) {
          value.forEach((item) => data.append(`${key}[]`, item));
        } else {
          data.append(key, value.toString());
        }
      }
    });
  
    try {
      let response;
      if (eventId) {
        response = await api.put(`/events/${eventId}`, data);
      } else {
        response = await api.post('/events', data, { headers });
      }
  
      const newEventId = eventId || response.data.data.id;
      navigation.navigate('EventGalleryEdit', { eventId: Number(newEventId) });
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof Error) {
        Alert.alert('Error', `Error: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <PageHeader title={eventId ? 'Edit Retreat' : 'Create Retreat'} />
      <ScrollView contentContainerStyle={_thEventEdit.container}>
        <TouchableOpacity onPress={pickImage} style={_thEventEdit.imageUploadContainer}>
          {formData.image ? (
            typeof formData.image === 'string' ? (
              <Image source={{ uri: `${BASE_URL}/storage/events/${formData.image}` }} style={_thEventEdit.imagePreview} />
            ) : (
              <Image source={{ uri: formData.image.uri }} style={_thEventEdit.imagePreview} />
            )
          ) : (
            <Text style={_thEventEdit.imageUploadText}>
              {formData.image ? 'Change Event Image' : 'Select Event Image'}
            </Text>
          )}
        </TouchableOpacity>        
        <View><Text style={_thEventEdit.imageUploadText}><BroIcons.Info size={12} color='#b1b1b1'  /> Please do not use any images has text on it.</Text></View>
        
        <TextInput
          style={_thEventEdit.input}
          placeholder="Title"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        
        <View style={_thEventEdit.partWrapper}>
          {['start_date', 'start_time', 'finish_date', 'finish_time'].map(field => (
            <TouchableOpacity
              key={field}
              style={[_thEventEdit.input, _thEventEdit.partSide]}
              onPress={() => setShowPicker({
                field: field as 'start_date' | 'start_time' | 'finish_date' | 'finish_time',
                mode: field.includes('date') ? 'date' : 'time'
              })}
            >
              <Text>
                {field === 'start_date' && formatDateOnly(startDate.toISOString())}
                {field === 'start_time' && formatTime(startTime.toISOString())}
                {field === 'finish_date' && formatDateOnly(endDate.toISOString())}
                {field === 'finish_time' && formatTime(endTime.toISOString())}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showPicker.field && (
          <DateTimePicker
            value={
              showPicker.field === 'start_date' ? startDate :
              showPicker.field === 'start_time' ? startTime :
              showPicker.field === 'finish_date' ? endDate :
              endTime
            }
            mode={showPicker.mode}
            display="default"
            onChange={handleDateTimeChange}
          />
        )}

        <DropDownPicker
          open={openLanguage}
          value={formData.language}
          items={languages.map((lang: any) => ({ label: lang.title, value: lang.code }))}
          setOpen={setOpenLanguage}
          setValue={(callback) => setFormData({ ...formData, language: callback(formData.language) })}
          placeholder="Select Language"
        />
        
        <MultipleSelect
          items={formattedInterests}
          uniqueKey="value"
          onSelectedItemsChange={setSelectedInterests}
          selectedItems={selectedInterests}
          selectText="Select Interests"
          searchInputPlaceholderText="Search Interests"
          tagRemoveIconColor="#d00000"
          tagBorderColor="#B1B1B1"
          tagTextColor="#B1B1B1"
          selectedItemTextColor="#000000"
          selectedItemIconColor="#000000"
          itemTextColor="#000000"
          fixedHeight={false}
          hideTags={false}
          single={false}
          displayKey="label"
          hideSubmitButton={true}
          styleDropdownMenuSubsection={{
            borderRadius: 8,
            borderBottomWidth: 0,
          }}
          styleMainWrapper={{
            paddingHorizontal: 8,
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#B1B1B1",
          }}
        />
        
        <TextInput
          style={_thEventEdit.textArea}
          placeholder="Location"
          placeholderTextColor={theme.placeholderColor.color}
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          multiline
        />

        <TextInput
          style={_thEventEdit.input}
          placeholder="Ticket Quota"
          value={formData.sort}
          placeholderTextColor={theme.placeholderColor.color}
          onChangeText={(text) => handleInputChange('sort', text)}
        />

        <TextInput
          style={_thEventEdit.textArea}
          placeholder="About this retreat"
          value={formData.description}
          placeholderTextColor={theme.placeholderColor.color}
          onChangeText={(text) => handleInputChange('description', text)}
          multiline
        />

        <TextInput
          style={_thEventEdit.textArea}
          placeholder="First Info"
          value={formData.info_1}
          placeholderTextColor={theme.placeholderColor.color}
          onChangeText={(text) => handleInputChange('info_1', text)}
          multiline
        />

        <TextInput
          style={_thEventEdit.textArea}
          placeholder="Second Info"
          value={formData.info_2}
          placeholderTextColor={theme.placeholderColor.color}
          onChangeText={(text) => handleInputChange('info_2', text)}
          multiline
        />

        <TextInput
          style={_thEventEdit.input}
          placeholder="Video URL (YouTube only)"
          value={formData.link}
          placeholderTextColor={theme.placeholderColor.color}
          onChangeText={(text) => handleInputChange('link', text)}
        />

        <TouchableOpacity style={_thEventEdit.submitButton} onPress={handleSubmit}>
          <Text style={_thEventEdit.submitButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default EventEdit;