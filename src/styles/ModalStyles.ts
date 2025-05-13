import { StyleSheet } from "react-native";

export const _thModalStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#4B0082',
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 14,
      fontWeight: '500',
      color:'#003333',
    },
    modalBigTitle: {
        fontSize: 20,
        fontWeight: '700',
        color:'#4B0082',
      },
    scrollView: {
      maxHeight: 300, // Kaydırılabilir alan
    },
    modalText: {
      fontSize: 16,
      lineHeight: 22,
    },
    closeButton: {
      marginTop: 15,
      backgroundColor: '#4B0082',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });