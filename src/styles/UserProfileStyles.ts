import { StyleSheet } from "react-native";

export const _thUserProfile = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 96,
      height: 96,
      borderRadius: 50,
      marginBottom: 10,
      backgroundColor:"#CCCCCCFF"
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flex: 1,
    },
    stat: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#003D33',
      alignItems: "flex-start",
      textAlign: "left",
    },
    statLabel: {
      fontSize: 12,
      color: '#b1b1b1',
      alignItems: "flex-start",
      textAlign: "left",
    },
    profileStats: {
      fontSize: 16,
      color: 'gray',
    },
    aboutTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginTop: 20,
      color: '#003333',
    },
    aboutText: {
      fontSize: 16,
      color: '#B1B1B1',
      marginVertical: 10,
    },
    readMore: {
      color: '#003333',
      fontSize: 14,
      textDecorationLine:'underline',
    },
    retreatTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginTop: 20,
      color:'#003333',
    },
    followArea:{
      padding:16,
      borderWidth:1,
      borderRadius:8,
      borderColor:'#ebebeb',
      flexDirection:'row',
    },
    followButton: {
      flex:1,
      backgroundColor: '#4B0082',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginRight:8,
      textAlign:'center',
    },
    followButtonText: {
      color: '#fff',
      fontSize: 16,
      textAlign:'center',
    },
    unfollowButton: {
      flex:1,
      borderColor: '#4B0082',
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginRight:8,
      textAlign:'center',
    },
    unfollowButtonText: {
      color: '#4B0082',
      fontSize: 16,
      textAlign:'center',
    },
    messageButton: {
      flex:1,
      borderColor: '#4B0082',
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginLeft:8,
      textAlign:'center',
    },
    messageButtonText: {
      color: '#4B0082',
      fontSize: 16,
      textAlign:'center',
    },
    eventCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderBottomColor:'#EBEBEB',
      borderBottomWidth:1,
      borderRadius: 0,
      marginBottom: 8,
      paddingVertical: 16,
    },
    eventImage: {
      width: 110,
      height: 110,
      borderRadius: 8,
    },
    eventInfo: {
      flex: 1,
      marginLeft: 10,
    },
    eventDate: {
      fontSize: 12,
      color: '#B1B1B1',
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#003333',
    },
    eventAddress: {
      fontSize: 12,
      color: '#B1B1B1',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    organizerWrapper:{
      flexDirection: 'column',
    },
    organizerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom:2,
    },
    organizerImage: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor:'#7B7B7BFF',
      marginRight: 2,
    },
    organizerName: {
      fontSize: 12,
      color: '#003333',
      fontWeight:'bold'
    },
    eventPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#7B1FA2',
    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  });
  