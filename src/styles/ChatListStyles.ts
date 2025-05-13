import { StyleSheet } from "react-native";

export const _thChatList = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    searchIcon:{
      position:'absolute',
      left:8,
      zIndex:1,
    },
    searchBar: {
      flex: 1,
      position:'relative',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 8,
      borderRadius: 4,
      paddingLeft:28,
      backgroundColor: '#FAFAFA',
      color: '#003333',
    },
    addButton: {
      marginLeft: 8,
      padding: 4,
    },
    conversationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    conversationDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    lastMessage: {
      fontSize: 16,
      color: 'gray',
    },
    timestamp: {
      fontSize: 14,
      color: 'gray',
      textAlign: 'right',
    },
  });