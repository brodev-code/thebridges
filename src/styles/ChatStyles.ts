import { StyleSheet } from "react-native";

export const _thChat = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    messageList: {
      flex: 1,
      paddingHorizontal: 16,
    },
    messageContainer: {
      maxWidth: '75%',
      padding: 12,
      borderRadius: 16,
      marginVertical: 8,
    },
    messageReceived: {
      alignSelf: 'flex-start',
      backgroundColor: '#f0f0f0',
    },
    messageSent: {
      alignSelf: 'flex-end',
      backgroundColor: '#EBEBEB',
    },
    messageText: {
      fontSize: 14,
      color: '#003333',
    },
    timestamp: {
      fontSize: 10,
      color: '#B1B1B1',
      textAlign: 'right',
      marginTop: 4,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },
    input: {
      flex: 1,
      borderColor: '#B1B1B1',
      backgroundColor: '#FAFAFA',
      color: '#003333',
      borderWidth: 1,
      padding: 8,
      borderRadius: 8,
    },
    sendButton: {
      position:'absolute',
      right:16,
      padding: 8,
      borderRadius: 50,
    },
    menuOption: {
      padding: 10,
      fontSize: 16,
      color: '#000',
    },
  });