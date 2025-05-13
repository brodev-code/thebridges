import { StyleSheet } from "react-native";

export const _thPaymentComplete = StyleSheet.create({
container: {
    backgroundColor:'#fff',
    padding: 20,
  },
  dateTime: {
    fontSize: 10,
    color: '#B1B1B1',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#003333',
  },
  location: {
    fontSize: 12,
    color: '#B1B1B1',
  },
  ticketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  ticketText: {
    fontSize: 14,
    color:'#4B0082',
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color:'#003333',
    fontWeight: 'bold',
  },
  sectionDescription:{
    fontSize: 12,
    color:'#b1b1b1',
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B0082',
  },
  backButton: {
    backgroundColor: '#4B0082',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop:16,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  congrats:{
    textAlign:'center',
    fontSize:164,
  },
  paymentBottom:{

  }
});