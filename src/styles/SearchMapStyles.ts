import { StyleSheet } from "react-native";

export const _thSearchMap = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    searchWrapper: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#f8f8f8',
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
      backgroundColor: '#FAFAFA',
      color: '#003333', // Black text color
    },
    searchButton: {
      backgroundColor: '#6200ea',
      paddingHorizontal: 15,
      justifyContent: 'center',
      borderRadius: 5,
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    map: {
      flex: 1,
      margin: 10,
    },
    coordinatesSearchButton: {
      backgroundColor: '#03a9f4',
      padding: 15,
      marginHorizontal: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    coordinatesSearchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    eventsList: {
      paddingBottom: 20,
    },
    eventCard: {
      flexDirection: 'row',
      padding: 10,
      margin: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    eventImage: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    eventInfo: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center',
    },
    eventName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    eventAddress: {
      fontSize: 14,
      color: '#666',
    },
    eventDescription: {
      fontSize: 12,
      color: '#888',
    },
  });
  