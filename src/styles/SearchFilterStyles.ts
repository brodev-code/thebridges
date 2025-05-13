import { StyleSheet } from "react-native";

export const _thSearchFilter = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    backButton: {
      marginRight: 8,
    },
    backButtonText: {
      fontSize: 20,
      color: '#000',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    },
    inputWrapper: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#B1B1B1',
      borderRadius: 8,
      paddingHorizontal: 16,
      justifyContent: 'center',
      backgroundColor: '#FAFAFA',
      color: '#003333',
    },
    saveButton: {
      backgroundColor: '#4B0082',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 24,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    partWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Elemanları baştan hizalar
      alignItems: 'center', // Dikey hizalama
      padding: 0,
      margin: 0,
    },
  
    partSide: {
      width: '48%',
    },
    mB8:{
      marginBottom:12
    }  
  });