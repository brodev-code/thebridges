import { StyleSheet } from "react-native";

export const _thTicketDetail = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    qrWrapper:{
      alignItems:'center',
      alignContent:'center',
      marginVertical:10
    },
    detailCard: {
      padding: 16,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#B1B1B149',
    },
    detailText: {
      textAlign:'left',
      fontSize: 16,
    },
    qrImage: {
      width: 150,
      height: 150,
    },
    detailHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    eventImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 16,
    },
  });
  