import { StyleSheet } from "react-native";

export const _thFavorites = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    listContent: {
      paddingBottom: 16,
    },
    touchableCard: {
      marginBottom: 12,
    },
    eventCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderBottomColor:'#EBEBEB',
      borderBottomWidth:1,
      borderRadius: 0,
      marginBottom: 8,
      paddingVertical: 16,
    },
    eventImage: {
      width: 110,
      height: 110,
      borderRadius: 8,
    },
    eventInfo: {
      flex: 1,
      marginLeft: 10,
    },
    eventDate: {
      fontSize: 12,
      color: '#B1B1B1',
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#003333',
    },
    eventAddress: {
      fontSize: 12,
      color: '#B1B1B1',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    organizerWrapper:{
      flexDirection: 'column',
    },
    organizerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom:2,
    },
    organizerImage: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor:'#7B7B7BFF',
      marginRight: 2,
    },
    organizerName: {
      fontSize: 12,
      color: '#003333',
      fontWeight:'bold'
    },
    eventPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#7B1FA2',
    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  