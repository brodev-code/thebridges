import { StyleSheet } from "react-native";

export const _thParticipantInfo = StyleSheet.create({
    container:{
        padding:16,
        backgroundColor:'#fff'
    },
    title:{
        fontSize:18,
        fontWeight:'500',
        color:"#003333",
    },
    description:{
        fontSize:14,
        fontWeight:'500',
        color:"#b1b1b1",
    },
    participantContainer:{
        marginTop:16,
    },
    userIcon:{
        width:150,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:10,
        borderColor:'#003333',
        borderWidth:1,
        backgroundColor:'#FAFAFA',
        borderRadius:10,
        marginBottom: 5,
    },
    userIconText:{
        color:'#003333',
        fontSize:14,
        fontWeight:'bold',
    },
    participantsWrapper:{
         marginBottom: 20, 
         padding: 15, 
         borderWidth: 1,
         borderColor:'#EBEBEB', 
         borderRadius: 10 
    },
    participantInfo:{
        fontSize:17,
        color:'#003333',
        fontWeight: 'bold', 
        marginBottom: 5 
    },
    input:{
        color: "#003333",
        height: 48,
        borderWidth: 1,
        borderColor: "#B1B1B1",
        marginBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        textAlignVertical: "center",
    },
    inputText:{
        color: "#003333",
        height: 48,
        textAlignVertical: "center",
    },
    saveButton:{
        backgroundColor: '#4B0082', 
        padding: 15, 
        alignItems: 'center', 
        borderRadius: 10 ,
        marginBottom:30,
    },
    saveButtonText:{ 
        color: 'white', 
        fontWeight: 'bold' 
    },
    dropdownContainer: { 
        borderWidth: 1, 
        borderColor: '#ccc', 
        backgroundColor: '#fff' 
    }, 
});