import { StyleSheet } from "react-native";

export const _thOTPScreen = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color:"#B1B1B1",
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: 5,
        borderColor:'#B1B1B1',
        backgroundColor: '#FAFAFA',
        color: '#003333',
    },
    topArea:{
        flex:1,
    },
    bottomArea:{
       width:'100%'
    },
    button: {
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#4B0082',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    buttonOutline:{
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: '#4B0082',
        borderWidth:1,
    },
    buttonOutlineText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B0082',
    },
});
