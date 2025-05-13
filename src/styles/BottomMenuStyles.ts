import { StyleSheet } from "react-native";

export const _thBottomMenu = StyleSheet.create({
    footer: {
      width: "100%",
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContainer: {
      position: 'absolute',
      flexWrap: 'wrap',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#EBEBEB',
      backgroundColor: '#ffffff',
    },
    menuItem: {
      alignItems: 'center',
    },
    menuText: {
      fontSize: 12,
      marginTop: 4,
      color: '#333',
    },
    activeText: {
      color: '#4B0082',
      fontWeight: 'bold',
    },
  });