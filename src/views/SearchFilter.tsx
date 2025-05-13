import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FilterData } from '../models/FilterData';
import { _thSearchFilter } from '../styles/SearchFilterStyles';
import { PageHeader } from '../components/PageHeader';
import { theme } from '../theme';

const SearchFilter: React.FunctionComponent = () => {
  const [filterData, setFilterData] = useState<FilterData>({
    price: '',
    categories: [],
    start_date: '',
    finish_date: '',
    language: '',
    facilitator: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleInputChange = (name: keyof FilterData, value: any) => {
    setFilterData({ ...filterData, [name]: value });
  };

  const onStartDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date(filterData.start_date);
    setShowStartDatePicker(false);
    handleInputChange('start_date', currentDate.toISOString().split('T')[0]);
  };

  const onFinishDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date(filterData.finish_date);
    setShowFinishDatePicker(false);
    handleInputChange('finish_date', currentDate.toISOString().split('T')[0]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6C63FF" />;
  }

  return (
    <>
    <PageHeader title='Filter' />
    <ScrollView style={_thSearchFilter.container}>
      <View style={_thSearchFilter.inputWrapper}>
        <TextInput
          style={_thSearchFilter.input}
          placeholder="Select Price"
          placeholderTextColor={theme.placeholderColor.color}
          value={filterData.price}
          onChangeText={(text) => handleInputChange('price', text)}
        />
      </View>

      <View style={_thSearchFilter.inputWrapper}>
        <TextInput
          style={_thSearchFilter.input}
          placeholder="Select Categories"
          placeholderTextColor={theme.placeholderColor.color}
          value={filterData.categories.join(', ')}
          onChangeText={(text) => handleInputChange('categories', text.split(','))}
        />
      </View>

      <View style={[_thSearchFilter.partWrapper,_thSearchFilter.mB8]}>
        <View style={_thSearchFilter.partSide}>
          <TouchableOpacity style={_thSearchFilter.input} onPress={() => setShowStartDatePicker(true)}>
            <Text>{filterData.start_date || 'Select Start Date'}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={new Date(filterData.start_date || Date.now())}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
           </View>
           <View style={_thSearchFilter.partSide}>
          <TouchableOpacity style={_thSearchFilter.input} onPress={() => setShowFinishDatePicker(true)}>
            <Text>{filterData.finish_date || 'Select Finish Date'}</Text>
          </TouchableOpacity>
          {showFinishDatePicker && (
            <DateTimePicker
              value={new Date(filterData.finish_date || Date.now())}
              mode="date"
              display="default"
              onChange={onFinishDateChange}
            />
          )}
        </View>
      </View>
      <View style={_thSearchFilter.inputWrapper}>
        <TextInput
          style={_thSearchFilter.input}
          placeholder="Select Facilitator"
          placeholderTextColor={theme.placeholderColor.color}
          value={filterData.facilitator}
          onChangeText={(text) => handleInputChange('facilitator', text)}
        />
      </View>

      <View style={_thSearchFilter.inputWrapper}>
        <TextInput
          style={_thSearchFilter.input}
          placeholder="Select Language"
          placeholderTextColor={theme.placeholderColor.color}
          value={filterData.language}
          onChangeText={(text) => handleInputChange('language', text)}
        />
      </View>

      <View style={_thSearchFilter.inputWrapper}>
        <TextInput
          style={_thSearchFilter.input}
          placeholder="Select Location"
          placeholderTextColor={theme.placeholderColor.color}
          value={filterData.location}
          onChangeText={(text) => handleInputChange('location', text)}
        />
      </View>

      <TouchableOpacity style={_thSearchFilter.saveButton}>
        <Text style={_thSearchFilter.saveButtonText}>Save Filter</Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  );
};

export default SearchFilter;
