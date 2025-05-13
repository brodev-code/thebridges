import { StyleSheet } from "react-native";

export const _thMyEvents = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      textAlign: 'center',
      color: 'red',
      fontSize: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      padding: 16,
      borderWidth:1,
      borderColor:'#ebebeb'
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      color:'#003333',
      fontSize: 18,
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: 14,
      color: 'gray',
    },
    heading: {
      color:'#003333',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    listContent: {
      paddingBottom: 16,
    },
    eventCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      marginBottom: 12,
      borderBottomWidth:1,
      borderColor:'#EBEBEB',
    },
    eventImage: {
      backgroundColor:'#b1b1b1',
      width: 110,
      height: 110,
      borderRadius: 8,
      marginRight: 12,
    },
    eventInfo: {
      flex: 1,
    },
    eventName: {
      fontSize: 16,
      color:'#003333',
      fontWeight: '500',
      marginBottom: 4,
    },
    eventDate: {
      fontSize: 12,
      color: '#b1b1b1',
      marginBottom: 4,
    },
    eventAddress: {
      fontSize: 12,
      color: '#b1b1b1',
      marginBottom: 4,
    },
    eventStatus: {
      fontSize: 12,
    },
    statusPublished: {
      color: '#008080',
    },
    statusPending: {
      color: '#F2860B',
    },
    statusRejected: {
      color: '#F20B45',
    },
    soldTickets: {
      fontSize: 12,
      color: '#4B0082',
    },
    editIcon: {
      width:28,
      height:28,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:28,
      backgroundColor:'#fff',
      marginLeft: 8,
      padding:16,
      shadowColor: '#000000',
      shadowOffset: {width: 0,height: 1},
      shadowOpacity: 0.25,
      shadowRadius: 28,
      elevation: 3,           
    },
    createButton: {
      backgroundColor: '#4B0082',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    createButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });