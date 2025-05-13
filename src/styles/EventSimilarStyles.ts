import { StyleSheet } from "react-native";
import { width } from "../theme";

export const _thEventSimilar = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color:'#003333',
    },
    eventContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      marginRight:8,
      padding: 10,
      borderBottomColor: '#EBEBEB',
      borderBottomWidth: 1,
      width:width - 48,
      overflow:'hidden',
    },
    eventImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor:"#B1B1B1",
    },
    infoContainer: {
      width:width-180,
    },
    eventName: {
      fontSize: 16,
      fontWeight: '700',
      color:'#003333',
    },
    eventDescription: {
      fontSize: 14,
      color: '#B1B1B1',
      marginVertical: 4,
    },
    eventAddress: {
      fontSize: 12,
      fontWeight:'500',
      color: '#B1B1B1',
    },
    eventDates: {
      fontSize: 10,
      color: '#B1B1B1',
      fontWeight:'500',
    },
    eventFavorite:{
        position:'absolute',
        right:10,
        top:10,
    }
  });
  