import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { PageHeader } from '../components/PageHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { api } from '../services/api';
import { ParticipantData } from '../models/ParticipantData';
import { BroIcons } from '../components/Icons';
import { _thPayment } from '../styles/PaymentStyles';
import { AxiosError } from 'axios';
import { theme } from '../theme';
import CountrySelector from '../components/CountrySelector';

type TicketType = {
  id: number;
  name: string;
  quantity: number;
  price?: number;
};

type PaymentRouteParams = {
  eventId: number;
  eventName?: string;
  eventDate?: string;
  eventLocation?: string;
  selectedTickets?: TicketType[];
  totalAmount?: number;
  participants?: ParticipantData[];
};

const Payment = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  
  // 1. Parametreler için güvenli alım
  const params = route.params as PaymentRouteParams || {};
  const {
    eventId = 0,
    eventName = '',
    eventDate = '',
    eventLocation = '',
    selectedTickets = [],
    totalAmount = 0,
    participants = []
  } = params;

  // 2. Katılımcı verilerini güvenli oluşturma
  const [safeParticipants] = useState<ParticipantData[]>(() => {
    if (!Array.isArray(selectedTickets)) return [];
    return selectedTickets.flatMap((ticket) => 
      Array.from({ length: ticket.quantity || 0 }, () => ({
        ticketId: ticket.id.toString(),
        ticketName: ticket.name || 'Unknown Ticket',
        fullName: '',
        email: '',
        phone: '',
        birthdate: new Date(),
        gender: '',
      }))
    );
  });

  // 3. Ödeme bilgileri state'leri
  const [rawCardNumber, setRawCardNumber] = useState('');
  const [rawExpiry, setRawExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [billingLine1, setBillingLine1] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: string;
    discount_type: string;
  } | null>(null);
  const [discountedAmount, setDiscountedAmount] = useState(totalAmount);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rawParticipants, setRawParticipants] = useState<ParticipantData[]>(safeParticipants);
  const [participantErrors, setParticipantErrors] = useState<string[]>([]);
  // 5. Kart numarası formatlama
  const handleCardNumberChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, '');
    setRawCardNumber(digitsOnly.slice(0, 16));
  };

  const formatCardNumberDisplay = (raw: string) => {
    return raw.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  // 6. Son kullanma tarihi formatlama
  const handleExpiryChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, '');
    setRawExpiry(digitsOnly.slice(0, 4));
  };

  const formatExpiryDisplay = (raw: string) => {
    const cleaned = raw.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  };

  // 7. Promo kodu işlemleri
  const validatePromoCode = async () => {
    if (!promoCode) {
      Alert.alert('Error', 'Please enter a promo code');
      return;
    }
  
    try {
      setValidatingPromo(true);
      const response = await api.post('/promo-codes/validate', {
        code: promoCode
      });
  
      if (response.data.data) {
        const promoData = response.data.data;
        
        // Eğer promo kodun bir event_id'si varsa ve bu mevcut event ile eşleşmiyorsa
        if (promoData.event_id && promoData.event_id !== eventId) {
          Alert.alert('Error', 'This code cannot be used with this event');
          return;
        }
  
        // Eğer event_id yoksa (null/0) veya mevcut event ile eşleşiyorsa
        setAppliedPromo(promoData);
        if (promoData.discount_type === 'percentage') {
          const discount = totalAmount * (parseFloat(promoData.discount) / 100);
          setDiscountedAmount(totalAmount - discount);
        } else {
          setDiscountedAmount(totalAmount - parseFloat(promoData.discount));
        }
        Alert.alert('Success', response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error.response?.data?.message || 'Invalid promo code');
      } else {
        Alert.alert('Error', 'Failed to validate promo code');
      }
      setAppliedPromo(null);
      setDiscountedAmount(totalAmount);
    } finally {
      setValidatingPromo(false);
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setAppliedPromo(null);
    setDiscountedAmount(totalAmount);
  };

  // 8. Ödeme işlemi
  const handlePayment = async () => {
    if (!rawCardNumber || !rawExpiry || !cvv || !cardHolderName) {
      Alert.alert('Error', 'Please fill all card details');
      return;
    }

    try {
      setLoading(true);
      const paymentData = {
        transaction: {
          amount: discountedAmount,
          currency: 'GBP',
          merchantRef: `TRX_${Date.now()}`,
          description: eventName,
          commerceType: 'ECOM',
          ...(appliedPromo && { promoCode: appliedPromo.code })
        },
        paymentMethod: {
          card: {
            pan: rawCardNumber,
            expiryDate: rawExpiry,
            cv2: cvv,
            cardHolderName
          },
          billingAddress: {
            line1: billingLine1,
            city: billingCity,
            postcode: billingPostalCode,
            countryCode: billingCountry
          }
        },
        eventId,
        tickets: selectedTickets,
        participants: safeParticipants
      };

      const response = await api.post('/payment/process', paymentData);

      if (response.data.clientRedirect?.url) {
        navigation.navigate('ThreeDSWebView', {
          redirectUrl: response.data.clientRedirect.url,
          threeDSServerTransId: response.data.clientRedirect.threeDSServerTransId,
          transactionId: response.data.clientRedirect.transactionId,
          eventName,
          eventDate,
          eventLocation,
          selectedTickets,
          totalAmount: discountedAmount,
          participants: safeParticipants
        });
      } else {
        navigation.navigate('PaymentComplete', {
          eventId,
          eventName,
          eventDate,
          eventLocation,
          selectedTickets,
          totalAmount: discountedAmount,
          participants: safeParticipants
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Payment Error', error.response?.data?.message || 'Payment failed');
      } else {
        Alert.alert('Payment Error', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Payment" />
      <ScrollView style={_thPayment.container} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Event Details */}
        <View style={_thPayment.detailBox}>
          <Text style={[_thPayment.mB5, { fontWeight: 'bold' }]}>Event: {eventName}</Text>
          <Text style={_thPayment.mB5}>Date: {eventDate}</Text>
          <Text style={_thPayment.mB5}>Location: {eventLocation}</Text>
          
          {selectedTickets?.map((ticket, index) => (
            <Text key={`ticket-${ticket.id}-${index}`} style={_thPayment.mB5}>
              <BroIcons.Ticket size={12} /> {ticket.name} - {ticket.quantity} Ticket(s)
            </Text>
          ))}

          <Text style={_thPayment.mB5}>Total Amount: ${totalAmount.toFixed(2)}</Text>
          
          {appliedPromo && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={_thPayment.mB5}>Discount Applied: {appliedPromo.code}</Text>
              <Text style={_thPayment.mB5}>
                -${(totalAmount - discountedAmount).toFixed(2)}
              </Text>
            </View>
          )}
          
          <Text style={[_thPayment.mB5, { fontWeight: 'bold' }]}>
            Final Amount: ${discountedAmount.toFixed(2)}
          </Text>
        </View>

        {/* Card Information */}
        <Text style={_thPayment.sectionTitle}>Card Information</Text>
        <View style={_thPayment.inputContainer}>
          <TextInput
            style={_thPayment.input}
            value={cardHolderName}
            onChangeText={setCardHolderName}
            placeholder="Card Holder Name"
            placeholderTextColor={theme.placeholderColor.color}
          />

          <TextInput
            style={_thPayment.input}
            value={formatCardNumberDisplay(rawCardNumber)}
            onChangeText={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={theme.placeholderColor.color}
            keyboardType="number-pad"
          />

          <View style={_thPayment.partWrapper}>
            <TextInput
              style={Object.assign({}, _thPayment.input, _thPayment.partSide)}
              value={formatExpiryDisplay(rawExpiry)}
              onChangeText={handleExpiryChange}
              placeholder="MM/YY"
              placeholderTextColor={theme.placeholderColor.color}
              keyboardType="number-pad"
            />
            <TextInput
              style={StyleSheet.flatten([_thPayment.input, _thPayment.partSide])}
              value={cvv}
              onChangeText={setCvv}
              placeholder="CVV"
              placeholderTextColor={theme.placeholderColor.color}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
            />
          </View>
        </View>

        {/* Billing Address */}
        <Text style={_thPayment.sectionTitle}>Billing Address</Text>
        <View style={_thPayment.inputContainer}>
          <TextInput
            style={_thPayment.input}
            value={billingLine1}
            onChangeText={setBillingLine1}
            placeholder="Street Address"
            placeholderTextColor={theme.placeholderColor.color}
          />
          <TextInput
            style={_thPayment.input}
            value={billingCity}
            onChangeText={setBillingCity}
            placeholder="City"
            placeholderTextColor={theme.placeholderColor.color}
          />
          <View style={_thPayment.partWrapper}>
            <TextInput
              style={StyleSheet.flatten([_thPayment.input, _thPayment.partSide])}
              value={billingPostalCode}
              onChangeText={setBillingPostalCode}
              placeholder="Postal Code"
              placeholderTextColor={theme.placeholderColor.color}
              keyboardType="number-pad"
            />
            <CountrySelector 
              selected={billingCountry} 
              onSelect={setBillingCountry}
            />
          </View>
        </View>

        {/* Promo Code */}
        <Text style={_thPayment.sectionTitle}>Promo Code</Text>
        <View style={_thPayment.inputContainer}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[_thPayment.input, { flex: 1 }]}
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Enter promo code"
              placeholderTextColor={theme.placeholderColor.color}
              editable={!appliedPromo}
            />
            {appliedPromo ? (
              <TouchableOpacity
                style={[_thPayment.promoButton, { backgroundColor: theme.secondary.color }]}
                onPress={removePromoCode}
              >
                <Text style={_thPayment.promoButtonText}>Remove</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={_thPayment.promoButton}
                onPress={validatePromoCode}
                disabled={validatingPromo}
              >
                {validatingPromo ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={_thPayment.promoButtonText}>Apply</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={[
            _thPayment.payButton, 
            { opacity: loading ? 0.7 : 1 }
          ]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={_thPayment.payButtonText}>
              Pay ${discountedAmount.toFixed(2)}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Payment;