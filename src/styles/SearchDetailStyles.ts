import { StyleSheet } from "react-native";

export const _thSearchDetail = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    filterButton: {
      position: 'absolute',
      top: 5,
      right: 16,
      padding: 8,
    },
    filterIcon: {
      width: 24,
      height: 24,
      tintColor: '#333',
    },
    categoryContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
    },
    categoryButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: '#f5f5f5',
    },
    categoryText: {
      fontSize: 14,
      color: '#333',
    },
    categoryActive: {
      backgroundColor: '#5D36E8',
    },
    categoryTextActive: {
      color: '#fff',
      fontWeight: 'bold',
    },
    eventList: {
      marginTop: 10,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 10,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 10,
    },
    eventDetails: {
      flex: 1,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#003333',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: '#999',
      marginBottom: 4,
    },
    date: {
      fontSize: 12,
      color: '#999',
    },
    price: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#5D36E8',
      marginTop: 4,
    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    favoriteIcon: {
      width: 24,
      height: 24,
      tintColor: '#999',
    },
    favoriteActive: {
      tintColor: '#E53935',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
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
  });
