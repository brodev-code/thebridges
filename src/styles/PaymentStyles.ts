import { StyleSheet } from "react-native";

export const _thPayment = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
      color:'#003333',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 10,
    },
    detailBox: {
      padding: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor:'#B1B1B1',
      backgroundColor: 'white',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      height: 48,
      borderColor: '#B1B1B1',
      borderWidth: 1,
      borderRadius:8,
      marginBottom: 8,
      paddingHorizontal: 16,
      backgroundColor: '#FAFAFA',
      color: '#003333',
    },
    payButton: {
      backgroundColor: '#4B0082',
      padding: 16,
      alignItems: 'center',
      borderRadius: 8,
    },
    payButtonText: {
      color: 'white',
      fontWeight: '500',
    },
    partWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',  
        alignItems: 'flex-start',  
        flex: 1,
      },
      partSide: {
        width:'48%',
      },
    mB5: {
      marginBottom: 5,
    },
    promoButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#4B0082',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      height: 48,
    },
    promoButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
  });
  