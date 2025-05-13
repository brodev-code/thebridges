import { StyleSheet } from "react-native";

export const _thPageHeader = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: "#fff",
    },
    backButton: {
      marginRight: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: "#003D33",
      transform:"translate(-2%,0)"
    },
    iconButton:{

    },
    rightIcons: {
      flexDirection: "row",
      alignItems: "center",
    },
    optionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });