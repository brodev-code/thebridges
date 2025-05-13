import { StyleSheet } from "react-native";

export const _thloginScreen = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // White background
    },
    bottomPart: {
        position: 'absolute', // En alta sabitlemek için
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        marginBottom:36,
    },
    logo: {
        width: 242, // Adjusted width
        marginBottom: 20,
        marginTop:'30%',
    },
    label: {
      textAlign:'left',
      alignSelf:'flex-start',
      alignItems:'flex-start',
      fontWeight:'bold',
      fontSize: 16,
      marginBottom: 10,
      color: '#003333', // Dark teal color
    },
    input: {
        width: '100%',
        borderColor: '#E0E0E0',
        backgroundColor: '#FAFAFA',
        color: '#003333', // Black text color
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    forgotPassword: {
        textAlign:'right',
        alignSelf: 'flex-end',
        alignItems:'flex-end',
        color: '#6A1B9A', // Purple color
    },
    button: {
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#6A1B9A', // Purple background color
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text color
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal:16
    },
    socialButton: {
        flex: 1,
        height: 48,
        width: 48,
        maxWidth:48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#000000', // Default background color for social buttons
    },
    socialButtonText: {
        fontSize: 20,
        color: '#FFFFFF', // White text color
    },
    guestText: {
        fontSize: 16,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#6A1B9A', // Purple color
    },
});