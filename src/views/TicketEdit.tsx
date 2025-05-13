import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../services/api';
import { _thTicketStyles } from '../styles/TicketEditStyles';
import { BroIcons } from '../components/Icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { PageHeader } from '../components/PageHeader';
import { Ticket, GenderOption, NewTicketForm } from '../models/Ticket';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../theme';

// Sabit gender seçenekleri
const genderItems = [
  { label: 'Any', value: 'any' },
  { label: 'Male Only', value: 'male' },
  { label: 'Female Only', value: 'female' },
];

// Memoize edilmiş GenderPicker alt bileşeni
const GenderPicker = memo(({
  index,
  value,
  open,
  toggleOpen,
  onChange
}: {
  index: number;
  value: string;
  open: boolean;
  toggleOpen: () => void;
  onChange: (value: string) => void;
}) => {
  return (
    <DropDownPicker
      open={open}
      setOpen={toggleOpen}
      value={value}
      setValue={(callback) => {
        const newValue = typeof callback === 'function' ? callback(value) : callback;
        onChange(newValue);
      }}
      items={genderItems}
      containerStyle={_thTicketStyles.dropdownContainer}
      style={_thTicketStyles.dropdown}
      dropDownContainerStyle={_thTicketStyles.dropdownList}
      labelStyle={_thTicketStyles.dropdownText}
    />
  );
});

// Memoize edilmiş DateInput bileşeni
const DateInput = memo(({
  label,
  date,
  onPress
}: {
  label: string;
  date: Date | null;
  onPress: () => void;
}) => {
  return (
    <View style={_thTicketStyles.row}>
      <Text style={_thTicketStyles.label}>{label}:</Text>
      <TouchableOpacity style={_thTicketStyles.dateInput} onPress={onPress}>
        <Text>{date ? date.toLocaleDateString() : `Select ${label.toLowerCase()}`}</Text>
      </TouchableOpacity>
    </View>
  );
});

// Memoize edilmiş TicketItem bileşeni
const TicketItem = memo(({
  index,
  ticket,
  onChange,
  onDelete,
  onSubmit,
  onDatePress,
  genderPicker,
}: {
  index: number;
  ticket: Ticket | (NewTicketForm & { price: string; early_bird_price?: string });
  onChange: (field: keyof NewTicketForm, value: any) => void;
  onDelete: () => void;
  onSubmit: () => void;
  onDatePress: (field: 'sale_start_date' | 'sale_end_date' | 'early_bird_end_date') => void;
  genderPicker: React.ReactNode;
}) => {
  return (
    <View key={ticket.id || `new-${index}`} style={_thTicketStyles.ticketContainer}>
      <Text style={_thTicketStyles.ticketLabel}>{ticket.name || 'New Ticket'}</Text>
      {ticket.id !== undefined && (
        <TouchableOpacity onPress={onDelete} style={_thTicketStyles.deleteButton}>
          <BroIcons.Remove size={20} color="black" />
        </TouchableOpacity>
      )}
      <View style={_thTicketStyles.row}>
        <Text style={_thTicketStyles.label}>Visible:</Text>
        <Switch
          value={ticket.is_visible}
          onValueChange={(value) => onChange('is_visible', value)}
        />
      </View>
      <TextInput
        style={_thTicketStyles.input}
        placeholderTextColor={theme.placeholderColor.color}
        value={ticket.name}
        onChangeText={(text) => onChange('name', text)}
        placeholder="Ticket Name"
      />
      <TextInput
        style={_thTicketStyles.input}
        value={ticket.description}
        placeholderTextColor={theme.placeholderColor.color}
        onChangeText={(text) => onChange('description', text)}
        placeholder="Description"
      />
      <View style={_thTicketStyles.row}>
        <Text style={_thTicketStyles.label}>Price:</Text>
        <TextInput
          style={[_thTicketStyles.input, _thTicketStyles.priceInput]}
          value={ticket.price}
          placeholderTextColor={theme.placeholderColor.color}
          keyboardType="decimal-pad"
          onChangeText={(text) => onChange('price', text)}
        />
      </View>
      <View style={_thTicketStyles.row}>
        <Text style={_thTicketStyles.label}>Available:</Text>
        <TextInput
          style={[_thTicketStyles.input, _thTicketStyles.availableInput]}
          value={(ticket.tickets_available ?? 0).toString()}
          placeholderTextColor={theme.placeholderColor.color}
          keyboardType="numeric"
          onChangeText={(text) => onChange('tickets_available', parseInt(text) || 0)}
        />
      </View>
      <View style={_thTicketStyles.section}>
        <Text style={_thTicketStyles.sectionTitle}>Sale Period</Text>
        <DateInput 
          label="Start" 
          date={ticket.sale_start_date} 
          onPress={() => onDatePress('sale_start_date')}
        />
        <DateInput 
          label="End" 
          date={ticket.sale_end_date} 
          onPress={() => onDatePress('sale_end_date')}
        />
      </View>
      <View style={_thTicketStyles.section}>
        <Text style={_thTicketStyles.sectionTitle}>Restrictions</Text>
        <View style={[_thTicketStyles.row, _thTicketStyles.mB8]}>
          <Text style={_thTicketStyles.label}>Allowed Gender:</Text>
          {genderPicker}
        </View>
        <View style={_thTicketStyles.row}>
          <Text style={_thTicketStyles.label}>Age Range:</Text>
          <TextInput
            style={[_thTicketStyles.input, _thTicketStyles.ageInput]}
            placeholder="Min Age"
            value={ticket.min_age?.toString() || ''}
            keyboardType="numeric"
            placeholderTextColor={theme.placeholderColor.color}
            onChangeText={(text) => onChange('min_age', text ? parseInt(text) : null)}
          />
          <TextInput
            style={[_thTicketStyles.input, _thTicketStyles.ageInput]}
            placeholder="Max Age"
            value={ticket.max_age?.toString() || ''}
            keyboardType="numeric"
            placeholderTextColor={theme.placeholderColor.color}
            onChangeText={(text) => onChange('max_age', text ? parseInt(text) : null)}
          />
        </View>
      </View>
      <View style={_thTicketStyles.section}>
        <View style={_thTicketStyles.row}>
          <Text style={_thTicketStyles.label}>Early Bird:</Text>
          <Switch
            value={ticket.is_early_bird}
            onValueChange={(value) => onChange('is_early_bird', value)}
          />
        </View>
        {ticket.is_early_bird && (
          <>
            <DateInput 
              label="Early Bird End" 
              date={ticket.early_bird_end_date} 
              onPress={() => onDatePress('early_bird_end_date')}
            />
            <View style={_thTicketStyles.row}>
              <Text style={_thTicketStyles.label}>Early Bird Price:</Text>
              <TextInput
                style={[_thTicketStyles.input, _thTicketStyles.priceInput]}
                value={ticket.early_bird_price || ''}
                keyboardType="decimal-pad"
                onChangeText={(text) => onChange('early_bird_price', text)}
              />
            </View>
          </>
        )}
      </View>
      <TouchableOpacity style={_thTicketStyles.saveButton} onPress={onSubmit}>
        <Text style={_thTicketStyles.saveButtonText}>
          {ticket.id !== undefined ? 'Save Changes' : 'Create Ticket'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

// Ana Bileşen: TicketEdit
const TicketEdit = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  type RouteParams = { eventId: string };
  const { eventId } = route.params as RouteParams;

  // Tüm formları tek bir state'de tutuyoruz.
  // Price ve early_bird_price alanlarını string olarak saklıyoruz.
  const [forms, setForms] = useState<(Ticket | (NewTicketForm & { price: string; early_bird_price?: string }))[]>([]);
  const [loading, setLoading] = useState(false);

  // Dropdown state'leri (her form için ayrı)
  const [dropdownOpen, setDropdownOpen] = useState<Record<number, boolean>>({});
  const [dropdownValues, setDropdownValues] = useState<Record<number, string>>({});

  // Date picker state'leri
  const [datePickerVisible, setDatePickerVisible] = useState({
    sale_start: false,
    sale_end: false,
    early_bird: false,
  });
  const [currentDateField, setCurrentDateField] = useState<{
    index: number;
    field: 'sale_start_date' | 'sale_end_date' | 'early_bird_end_date';
  } | null>(null);

  useEffect(() => {
    fetchTickets();
  }, [eventId]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/tickets/event/${eventId}`);
      const ticketsData = response.data.data || [];
      const formattedTickets = ticketsData.map((ticket: any) => ({
        ...ticket,
        sale_start_date: ticket.sale_start_date ? new Date(ticket.sale_start_date) : null,
        sale_end_date: ticket.sale_end_date ? new Date(ticket.sale_end_date) : null,
        early_bird_end_date: ticket.early_bird_end_date ? new Date(ticket.early_bird_end_date) : null,
        price: ticket.price ? ticket.price.toString() : '0',
        early_bird_price: ticket.early_bird_price ? ticket.early_bird_price.toString() : '',
        subname: ticket.subname || '',
        slug: ticket.slug || ticket.name.toLowerCase().replace(/\s+/g, '-'),
        price_old: ticket.price_old ? ticket.price_old.toString() : ticket.price ? ticket.price.toString() : '0'
      }));
      setForms(formattedTickets);
      // Dropdown değerlerini de güncelle
      const initialDropdownValues: Record<number, string> = {};
      formattedTickets.forEach((ticket: any, idx: number) => {
        initialDropdownValues[idx] = ticket.allowed_gender;
      });
      setDropdownValues(initialDropdownValues);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      Alert.alert('Error', 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const addNewTicketForm = useCallback(() => {
    const newForm: NewTicketForm & { price: string; early_bird_price?: string } = {
      name: '',
      tickets_available: 0,
      description: '',
      price: '0.00',
      event_id: Number(eventId),
      is_visible: true,
      sale_start_date: null,
      sale_end_date: null,
      min_age: null,
      max_age: null,
      is_early_bird: false,
      early_bird_end_date: null,
      early_bird_price: '',
      allowed_gender: 'male',
      price_old: '0'
    };
    setForms((prev) => [...prev, newForm]);
    setDropdownValues((prev) => ({ ...prev, [Object.keys(prev).length]: 'male' }));
  }, [eventId]);

  const handleInputChange = useCallback((index: number, field: keyof NewTicketForm, value: any) => {
    setForms((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleDateChange = useCallback((date?: Date) => {
    if (!date || !currentDateField) return;
    const { index, field } = currentDateField;
    setForms((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: date };
      return updated;
    });
    setDatePickerVisible({ sale_start: false, sale_end: false, early_bird: false });
    setCurrentDateField(null);
  }, [currentDateField]);

  const showDatePicker = useCallback((index: number, field: 'sale_start_date' | 'sale_end_date' | 'early_bird_end_date') => {
    setCurrentDateField({ index, field });
    setDatePickerVisible((prev) => ({
      ...prev,
      [field === 'sale_start_date'
        ? 'sale_start'
        : field === 'sale_end_date'
          ? 'sale_end'
          : 'early_bird']: true
    }));
  }, []);

  const toggleDropdown = useCallback((index: number) => {
    setDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const handleDropdownChange = useCallback((index: number, value: string) => {
    setDropdownValues((prev) => ({ ...prev, [index]: value }));
    handleInputChange(index, 'allowed_gender', value);
  }, [handleInputChange]);

  const submitTicketForm = useCallback(async (index: number) => {
    setLoading(true);
    const ticket = forms[index];

    // API örneğine göre formData'yı düzenliyoruz:
    const formData = {
      name: ticket.name,
      description: ticket.description,
      subname: (ticket as any).subname || '',
      slug: (ticket as any).slug || (ticket.name ?? '').toLowerCase().replace(/\s+/g, '-'),
      event_id: Number(eventId),
      price: parseFloat(ticket.price) || 0,
      price_old: ticket.price_old ? parseFloat(ticket.price_old) : parseFloat(ticket.price) || 0,
      is_early_bird: ticket.is_early_bird,
      early_bird_price: ticket.is_early_bird 
        ? parseFloat(ticket.early_bird_price || '0') || 0
        : null,
      early_bird_end_date: ticket.early_bird_end_date,
      tickets_available: ticket.tickets_available,
      is_visible: ticket.is_visible,
      sale_start_date: ticket.sale_start_date,
      sale_end_date: ticket.sale_end_date,
      min_age: ticket.min_age,
      max_age: ticket.max_age,
      allowed_gender: ticket.allowed_gender
    };

    try {
      const endpoint = ticket.id ? `/tickets/${ticket.id}` : '/tickets';
      const method = ticket.id ? 'put' : 'post';
      const response = await api[method](endpoint, formData);
      fetchTickets();
      Alert.alert('Success', `Ticket successfully submitted!`);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      Alert.alert('Error', `Failed to submit ticket. Please try again. ${(error as any)?.message || ''}`);
    } finally {
      setLoading(false);
    }
  }, [forms, eventId]);

  const deleteTicket = useCallback(async (ticketId: number) => {
    setLoading(true);
    try {
      await api.delete(`/tickets/${ticketId}`);
      fetchTickets();
      Alert.alert('Success', 'Ticket successfully deleted!');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      Alert.alert('Error', 'Failed to delete ticket');
    } finally {
      setLoading(false);
    }
  }, [fetchTickets]);
// Ana Bileşen: TicketEdit
  return (
    <>
      {loading ? (
        <View style={_thTicketStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#4B0082" />
        </View>
      ) : (
        <>
          <PageHeader title={eventId ? 'Edit Tickets' : 'Create Tickets'} />
          <ScrollView contentContainerStyle={_thTicketStyles.container}>
            {forms.map((ticket, index) => (
              <TicketItem
                key={ticket.id || `new-${index}`}
                index={index}
                ticket={ticket}
                onChange={(field, value) => handleInputChange(index, field, value)}
                onDelete={() => ticket.id !== undefined && deleteTicket(ticket.id)}
                onSubmit={() => submitTicketForm(index)}
                onDatePress={(field) => showDatePicker(index, field)}
                genderPicker={
                  <GenderPicker
                    index={index}
                    value={dropdownValues[index] || ticket.allowed_gender}
                    open={dropdownOpen[index] || false}
                    toggleOpen={() => toggleDropdown(index)}
                    onChange={(value) => handleDropdownChange(index, value)}
                  />
                }
              />
            ))}
            <TouchableOpacity style={_thTicketStyles.addButton} onPress={addNewTicketForm}>
              <Text style={_thTicketStyles.addButtonText}>Add New Ticket</Text>
            </TouchableOpacity>
            {datePickerVisible.sale_start && (
              <DateTimePicker
                value={
                  currentDateField?.field === 'sale_start_date' && forms[currentDateField.index]?.sale_start_date
                    ? forms[currentDateField.index].sale_start_date!
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={(_, date) => handleDateChange(date)}
              />
            )}
            {datePickerVisible.sale_end && (
              <DateTimePicker
                value={
                  currentDateField?.field === 'sale_end_date' && forms[currentDateField.index]?.sale_end_date
                    ? forms[currentDateField.index].sale_end_date!
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={(_, date) => handleDateChange(date)}
              />
            )}
            {datePickerVisible.early_bird && (
              <DateTimePicker
                value={
                  currentDateField?.field === 'early_bird_end_date' && forms[currentDateField.index]?.early_bird_end_date
                    ? forms[currentDateField.index].early_bird_end_date!
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={(_, date) => handleDateChange(date)}
              />
            )}
              <TouchableOpacity style={_thTicketStyles.completeButton} 
              onPress={() => navigation.navigate('EventEditComplete', { eventId: Number(eventId) })}>
                <Text style={_thTicketStyles.completeButtonText}>Complete Tickets</Text>
              </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default TicketEdit;
