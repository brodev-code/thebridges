import { StyleSheet } from "react-native";

export const _thSettings = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    avatarContainer: {
      position:'relative',
      width: 100,
      height: 100,
      alignItems: 'center',
      verticalAlign:'middle',
      marginBottom: 16,
      backgroundColor:'#b1b1b1',
      borderRadius:50,
    },
    avatar: {
      width: 100,
      height: 100,
      backgroundColor:'#b1b1b1',
      borderRadius: 100,
      marginBottom: 10,
    },
    avatarText: {
      color: '#666',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    form: {
      marginTop: 10,
    },
    label: {
      marginBottom: 5,
      fontWeight: 'bold',
      color: '#333',
    },
    picker: {
      height: 50,
      marginBottom: 15,
      borderColor:'#b1b1b1'
    },
    input: {
      height: 50,
      borderColor: '#b1b1b1',
      backgroundColor: '#FAFAFA',
      color: '#003333', 
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      justifyContent: 'center', // Metni ortalamak için
      marginBottom: 15,
    },
    locationInput: {
      paddingRight: 40,
    },
    passwordWrapper: {
      position:'relative',
    },
    icon:{
      position:'absolute',
      right:0,
      padding:16,
    },
    saveButton: {
      backgroundColor: '#4B0082',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 60,
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    switchText: {
      fontSize: 16,
      color: '#333',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
  });