import { StyleSheet } from "react-native";

export const _thSearch = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    center:{
      alignContent:'center',
      alignItems:'center',
      marginBottom:16,
    },
    header: {
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
    },
    searchInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#FAFAFA',
      color: '#003333', // Black text color
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    mapSearchButton: {
      backgroundColor: '#fff',
      padding: 8,
      width:150,
      borderRadius: 32,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
    mapSearchButtonText: {
      color: '#003333',
      fontSize: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    categoriesWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    categoryButton: {
      borderWidth: 1,
      borderColor: 'purple',
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
      margin: 4,
    },
    categoryButtonSelected: {
      backgroundColor: 'purple',
    },
    categoryText: {
      color: 'purple',
      fontSize: 14,
      textAlign: 'center',
    },
    categoryTextSelected: {
      color: '#fff',
    },
    searchOnMapButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 16,
    },
    searchOnMapText: {
      color: '#4B0082',
      fontSize: 16,
      marginLeft: 8,
    },
    searchButton: {
      backgroundColor: '#4B0082',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    resultsWrapper: {
      marginTop: 16,
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    resultItem: {
      padding: 12,
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
      marginBottom: 8,
    },
    resultText: {
      fontSize: 16,
    },
  });
  