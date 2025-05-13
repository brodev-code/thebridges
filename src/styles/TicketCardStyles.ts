import { StyleSheet } from "react-native";

export const _thTicketCard = StyleSheet.create({
ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth:1,
    borderColor: '#EBEBEB',
    padding: 16,
    marginBottom: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003333',
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A148C',
  },
  ticketDetails: {
    fontSize: 10,
    color: '#B1B1B1',
    marginTop: 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderWidth:1,
    borderColor:"#EBEBEB",
    borderRadius:8,
  },
  counterButton: {
    padding: 8,
  },
  counterValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003333',
    backgroundColor:'#EBEBEB',
    padding:8,
    borderRadius:8,
  },
  purchaseButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  ticketAge: {
    fontSize: 10,
    color: '#B1B1B1',
    marginTop: 4,
  },
  saleNot: {
    color: '#003333',
    fontWeight:'500', 
    fontSize: 10, 
    padding:10
  },
});