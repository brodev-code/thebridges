import { StyleSheet } from "react-native";

export const _thTickets = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    ticketCard: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: '#fff',
      marginBottom: 16,
      borderColor:'#B1B1B149',
      borderBottomWidth:1,
    },
    ticketImage: {
      width: 110,
      height: 110,
      marginRight: 8,
      borderRadius:8,
    },
    ticketDetails: {
      flex: 1,
    },
    ticketName: {
      fontSize: 14,
      color:'#003333',
    },
    ticketDescription: {
      fontSize: 12,
      color: '#B1B1B1',
      marginBottom: 8,
    },
    ticketPrice: {
      flexDirection: 'row',
      fontSize: 12,
      fontWeight:'500',
      color: '#4B0082',
      verticalAlign:'middle',
    },
    ticketOldPrice: {
      fontSize: 14,
      color: 'red',
      textDecorationLine: 'line-through',
    },
    ticketReference: {
      fontSize: 12,
      color: '#4B0082',
    },
    ticketIcon:{
      flex:1,
      alignSelf:'center',
      marginTop:2,
    },
    eventName: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#003333',
    },
    eventInfo: {
      fontSize: 12,
      color: '#B1B1B1',
    },
    eventDates: {
      fontSize: 12,
      color: '#B1B1B1',
    },
  });
  