import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { api, formatBirthday } from '../services/api';
import { BroIcons } from '../components/Icons';
import { _thParticipantInfo } from '../styles/ParticipantInfoStyles';
import { theme } from '../theme';
import UserSearchModal from '../components/UserSearch';
import { PageHeader } from '../components/PageHeader';

type TicketType = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

const ParticipantsInfo = ({ route, navigation }: { route: any; navigation: StackNavigationProp<any> }) => {
  // Route params'dan gelen veriler
  const { 
    eventId,
    eventName,
    eventDate,
    eventLocation,
    totalAmount,
    selectedTickets 
  } = route.params as {
    eventId: number;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    totalAmount: number;
    selectedTickets: TicketType[];
  };

  // Katılımcı state'i (her bilet türü için ayrı)
  const [participants, setParticipants] = useState(
    selectedTickets.flatMap(ticket => 
      Array.from({ length: ticket.quantity }, () => ({
        ticketId: ticket.id,
        ticketName: ticket.name,
        fullName: '',
        email: '',
        phone: '',
        birthdate: new Date(),
        gender: '',
      }))
    )
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [ticketLoading, setTicketLoading] = useState<Record<number, boolean>>({});
  const [showPicker, setShowPicker] = useState<Record<number, boolean>>({});
  const [openGender, setOpenGender] = useState<Record<number, boolean>>({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedParticipantIndex, setSelectedParticipantIndex] = useState<number | null>(null);

  // Kullanıcı seçme modal'ı
  const openUserSearch = (index: number) => {
    setSelectedParticipantIndex(index);
    setModalVisible(true);
  };

  const handleUserSelect = (user: { id: number; name: string; email: string; phone:any; birthday:any,gender:any }) => {
      if (selectedParticipantIndex !== null) {
        handleInputChange(selectedParticipantIndex, 'fullName', user.name);
        handleInputChange(selectedParticipantIndex, 'email', user.email);
        handleInputChange(selectedParticipantIndex, 'phone', user.phone);
        handleInputChange(selectedParticipantIndex, 'birthdate', user.birthday ? new Date(user.birthday) : new Date());
        handleInputChange(selectedParticipantIndex, 'gender', user.gender);
      }
      setModalVisible(false);
    };

  // Input değişikliklerini işle
  const handleInputChange = (index: number, field: keyof typeof participants[0], value: any) => {
    setParticipants(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Doğum tarihi seçimi
  const handleDateChange = (index: number, event: any, selectedDate?: Date) => {
    setShowPicker(prev => ({ ...prev, [index]: false }));
    if (selectedDate) {
      handleInputChange(index, 'birthdate', selectedDate);
    }
  };

  // Form gönderimi
  const handleSubmit = async () => {
    // Validasyon
    const isFormValid = participants.every(p => 
      p.fullName && 
      p.email && 
      p.phone && 
      p.gender &&
      p.birthdate
    );

    if (!isFormValid) {
      Alert.alert('Error', 'Please fill all required fields for all participants');
      return;
    }

    setLoading(true);

    try {
      // Bilet türlerine göre grupla
      const ticketGroups = selectedTickets.map(ticket => ({
        ticketId: ticket.id,
        participants: participants
          .filter(p => p.ticketId === ticket.id)
          .map(({ fullName, email, phone, birthdate, gender }) => ({
            name: fullName,
            email,
            phone,
            birthdate: birthdate.toISOString().split('T')[0],
            gender
          }))
      }));

      // Her bilet türü için ayrı istek
      const responses = await Promise.all(
        ticketGroups.map(async ({ ticketId, participants }) => {
          setTicketLoading(prev => ({ ...prev, [ticketId]: true }));
          try {
            const response = await api.post(`/tickets/${ticketId}/sell`, {
              quantity: participants.length,
              buyers: participants
            });
            return response.data;
          } finally {
            setTicketLoading(prev => ({ ...prev, [ticketId]: false }));
          }
        })
      );

      // Ödeme sayfasına iletilcek veri
      const paymentData = {
        eventId,
        eventName,
        eventDate,
        eventLocation,
        totalAmount,
        tickets: responses.map(res => ({
          ticketId: res.data.ticket.id,
          referenceNumber: res.data.reference_number,
          price: res.data.total_price,
          buyers: res.data.buyers
        })),
        participants: participants.map(p => ({
          ...p,
          birthdate: p.birthdate.toISOString().split('T')[0]
        }))
      };

      navigation.navigate('Payment', paymentData);

    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || 
        error.response?.data?.errors?.join('\n') || 
        'Failed to process tickets'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Participants Info" />
      <ScrollView style={_thParticipantInfo.container}>
        <Text style={_thParticipantInfo.title}>Selected Tickets</Text>
        
        {selectedTickets.map((ticket, index) => (
          <View key={ticket.id} style={{ marginBottom: 10 }}>
            <Text style={_thParticipantInfo.description}>
              <BroIcons.Ticket size={12} /> 
              {ticket.name} - {ticket.quantity} Ticket(s)
              {ticketLoading[ticket.id] && (
                <ActivityIndicator size="small" style={{ marginLeft: 10 }} />
              )}
            </Text>
          </View>
        ))}

        <View style={_thParticipantInfo.participantContainer}>
          {participants.map((participant, index) => (
            <View key={index} style={_thParticipantInfo.participantsWrapper}>
              <Text style={_thParticipantInfo.participantInfo}>
                {participant.ticketName} (Participant {index + 1})
              </Text>

              <TouchableOpacity 
                style={_thParticipantInfo.userIcon} 
                onPress={() => openUserSearch(index)}
              >
                <BroIcons.User size={14} color={theme.placeholderColor.color} />
                <Text style={_thParticipantInfo.userIconText}>Select User</Text>
              </TouchableOpacity>

              <TextInput
                placeholder="Full Name*"
                value={participant.fullName}
                onChangeText={(text) => handleInputChange(index, 'fullName', text)}
                style={_thParticipantInfo.input}
                placeholderTextColor={theme.placeholderColor.color}
              />

              <TextInput
                placeholder="Email*"
                value={participant.email}
                onChangeText={(text) => handleInputChange(index, 'email', text)}
                keyboardType="email-address"
                style={_thParticipantInfo.input}
                placeholderTextColor={theme.placeholderColor.color}
              />

              <TextInput
                placeholder="Phone*"
                value={participant.phone}
                onChangeText={(text) => handleInputChange(index, 'phone', text)}
                keyboardType="phone-pad"
                style={_thParticipantInfo.input}
                placeholderTextColor={theme.placeholderColor.color}
              />

              <TouchableOpacity
                onPress={() => setShowPicker(prev => ({ ...prev, [index]: true }))}
                style={_thParticipantInfo.input}
              >
                <Text style={_thParticipantInfo.inputText}>
                  {formatBirthday(participant.birthdate.toISOString().split('T')[0]) || 'Select Birthdate*'}
                </Text>
              </TouchableOpacity>

              {showPicker[index] && (
                <DateTimePicker
                  value={participant.birthdate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleDateChange(index, event, date)}
                  maximumDate={new Date()}
                />
              )}

              <DropDownPicker
                open={openGender[index] || false}
                value={participant.gender}
                items={[
                  { label: 'Female', value: 'female' },
                  { label: 'Male', value: 'male' },
                  { label: 'Other', value: 'other' },
                ]}
                setOpen={(isOpen) => setOpenGender(prev => ({ ...prev, [index]: !!isOpen }))}
                setValue={(callback) => {
                  const value = callback(participant.gender);
                  handleInputChange(index, 'gender', value);
                }}
                placeholder="Select Gender*"
                placeholderStyle={{ color: theme.placeholderColor.color }}
                style={_thParticipantInfo.input}
                dropDownContainerStyle={_thParticipantInfo.dropdownContainer}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          onPress={handleSubmit}
          style={_thParticipantInfo.saveButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={_thParticipantInfo.saveButtonText}>Complete Purchase</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <UserSearchModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectUser={handleUserSelect}
      />
    </>
  );
};

export default ParticipantsInfo;