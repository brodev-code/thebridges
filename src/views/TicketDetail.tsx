import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { api, BASE_URL, formatDateOnly } from '../services/api';
import { TicketDetailData, TicketQrData } from '../models/TicketData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import { PageHeader } from '../components/PageHeader';
import {BroIcons} from '../components/Icons';

const TicketDetail: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { referenceNumber } = route.params;

  const [ticketDetails, setTicketDetails] = useState<TicketDetailData[]>([]);
  const [qr, setQr] = useState<TicketQrData>();
  const [loading, setLoading] = useState(true);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`tickets/buyers/${referenceNumber}`);
      const responseQr = await api.get(`tickets/qr/${referenceNumber}`);
      setTicketDetails(response.data.data || []);
      setQr(responseQr.data.data);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Hata', 'Bilet bilgileri alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!referenceNumber) {
      Alert.alert('Hata', 'Referans numarası eksik');
      navigation.goBack();
      return;
    }
    fetchTicketDetails();
  }, [referenceNumber]);

  const handleCancelBuyer = async (buyerId: number) => {
    try {
      const ticketId = ticketDetails[0]?.ticket?.id;
      await api.post(`/tickets/${ticketId}/cancel`, { buyer_id: buyerId });
      Alert.alert('Başarılı', 'Bilet iptal edildi');
      fetchTicketDetails(); // Listeyi yenile
    } catch (error) {
      console.error('Cancel buyer error:', error);
      Alert.alert('Hata', 'Bilet iptal edilemedi.');
    }
  };

  const handleCancelAll = async () => {
    try {
      const ticketId = ticketDetails[0]?.ticket?.id;
      await api.post(`/tickets/${ticketId}/cancel-all`);
      Alert.alert('Başarılı', 'Tüm biletler iptal edildi');
      fetchTicketDetails();
    } catch (error) {
      console.error('Cancel all error:', error);
      Alert.alert('Hata', 'Biletler iptal edilemedi.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!ticketDetails || ticketDetails.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Bilet bulunamadı.</Text>
      </View>
    );
  }

  const event = ticketDetails[0]?.ticket?.event;
  const ticket = ticketDetails[0]?.ticket;

  return (
    <ScrollView>
      {qr && <PageHeader title={qr.reference_number} />}

      <View style={styles.qrWrapper}>
        {qr && <Image source={{ uri: qr.qr_code_url }} style={styles.qrImage} />}
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Event Info</Text>
        {event && (
          <View style={styles.card}>
            <Image source={{ uri: BASE_URL + '/storage/images/' + event.image }} style={styles.eventImage} />
            <Text style={styles.text}>Event: {event.name}</Text>
            <Text style={styles.text}>Location: {event.address}</Text>
            <Text style={styles.text}>
              Tarihler: {formatDateOnly(event.start_date)} - {formatDateOnly(event.finish_date)}
            </Text>
          </View>
        )}

        <Text style={styles.header}>Tickets And Participants</Text>
        {ticketDetails.map((detail, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => handleCancelBuyer(detail.id)}
            >
              <BroIcons.Remove size={20} color="red" />
            </TouchableOpacity>

            <Text style={styles.text}>Name: {detail.name}</Text>
            <Text style={styles.text}>E-mail: {detail.email}</Text>
            <Text style={styles.text}>Gender: {detail.gender}</Text>
            <Text style={styles.text}>Birthday: {formatDateOnly(detail.birthdate)}</Text>
            <Text style={styles.text}>Quantity: {detail.quantity}</Text>
            <Text style={styles.text}>Price: $ {detail.price ?? ticket.price}</Text>
            <Text style={styles.text}>Payment Status: {detail.payment_status}</Text>
          </View>
        ))}

        <View style={styles.cancelAllWrapper}>
          <TouchableOpacity onPress={handleCancelAll} style={styles.cancelAllButton}>
            <BroIcons.Remove size={18} color="#fff" />
            <Text style={styles.cancelAllText}>Tümünü İptal Et</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  qrWrapper: { alignItems: 'center', marginVertical: 16 },
  qrImage: { width: 200, height: 200 },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    position: 'relative',
  },
  eventImage: { width: '100%', height: 180, borderRadius: 8, marginBottom: 12 },
  text: { fontSize: 14, marginBottom: 4 },
  removeIcon: { position: 'absolute', top: 8, right: 8 },
  cancelAllWrapper: { marginTop: 24 },
  cancelAllButton: {
    backgroundColor: '#ff3b30',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelAllText: { color: '#fff', marginLeft: 8, fontWeight: 'bold' },
  noDataText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
});

export default TicketDetail;
