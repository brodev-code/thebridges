import { StyleSheet } from "react-native";

export const _thRegister = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
      },
      tabButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        marginRight: 4,
        borderRadius: 8,
      },
      tabButtonActive: {
        backgroundColor: '#4B0082',
      },
      tabButtonText: {
        color: '#333',
        fontWeight: '500',
      },
      tabButtonTextActive: {
        color: '#fff',
      },
      infoText: {
        marginBottom: 16,
        fontSize: 14,
        color: '#666',
      },
      input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center', // Metni ortalamak için
        marginBottom: 15,
        backgroundColor: '#FAFAFA',
        color: '#003333', // Black text color
      },
      picker: {
        height: 50,
        marginBottom: 15,
        borderColor:'#ddd'
      },
      passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      showHideButton: {
        position:'absolute',
        right:0,
        top:0,
        padding: 12,
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
      saveButton: {
        backgroundColor: '#4B0082',
        padding: 15,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
        marginBottom:60,
      },
      saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
  });