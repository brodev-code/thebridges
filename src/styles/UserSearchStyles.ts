import { StyleSheet } from "react-native";
import { theme, width } from "../theme";

export const _thUserSearch = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'flex-start',
    },
    modalTitle: {
      fontSize: 18,
      color: theme.primary.color,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#FAFAFA',
      color: '#003333', // Black text color
    },
    userItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      width:width*0.8,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: 14,
      color: '#666',
    },
    closeButton: {
      marginTop: 10,
      backgroundColor: theme.primary.color,
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    searchButton: {
      marginTop: 10,
      marginRight: 10,
      padding: 10,
      borderRadius: 5,
      borderColor: theme.primary.color,
      borderWidth: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchButtonText: {
      color: "#4A148C",
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
