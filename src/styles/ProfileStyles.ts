import { StyleSheet } from "react-native";

export const _thProfile = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 20,
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
    button: {
      backgroundColor: '#4B0082',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    secondaryButton: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#4B0082',
    },
    secondaryButtonText: {
      color: '#4B0082',
    },
    deleteText: {
      color: '#4B0082',
      fontSize: 16,
      textAlign: 'center',
      marginTop: -40,
    },
    errorText: {
      color: '#003300',
      textAlign: 'center',
      fontSize: 16,
    },
  });