import { StyleSheet } from "react-native";

export const _thEventParticipant = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    participantContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    participantName: {
      flex: 1,
      fontSize: 18,
    },
    followButton: {
      backgroundColor: '#6200ee',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    followButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    unfollowButton: {
      borderColor: '#6200ee',
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    unfollowButtonText: {
      color: '#6200ee',
      fontSize: 16,
    },
  });