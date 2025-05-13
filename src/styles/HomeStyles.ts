import { StyleSheet } from "react-native";

export const _thHomeScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      cellLeft:{
        position:'relative',
        width:'70%',
      },
      cellRight:{
        position:'relative',
        flexDirection:'column',
        alignItems: 'flex-end',
        verticalAlign:'top',
        flexWrap:'wrap',
      },
      notifyComponent:{
        flexDirection:'row',
      },
      locationComponent:{
        flexDirection:'row',
      },
      header: {
        position: 'relative',
        paddingHorizontal: 24,
        paddingBottom:16,
      },
      gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
      greeting: {
        fontSize: 24,
        color: '#003333',
        fontWeight:'700'
      },
      subtitle: {
        fontSize: 16,
        color: '#006666',
      },
      logo: {
        width: 130,
        height:25,
        resizeMode: "contain",
      },
      scrollView: {
        paddingHorizontal: 24,
        paddingBottom:16,
        width: '100%',
      },
      categoryTitle: {
        fontSize: 18,
        marginBottom: 10,
      },
      categories: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      categoryButton: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
      },
      headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      roundButton: {
        position: "relative",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        elevation: 4, // Gölgeyi belirginleştir
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 }, // Daha doğal bir düşme efekti
        shadowRadius: 5,
        marginLeft: 8,
      },      
      chatIcon: {
        fontSize: 24,
        tintColor: "#000",
      },
      notificationBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      },
      badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
      },
      searchBarWrapper:{
        position:'relative',
      },
      searchBar: {
        marginTop: 10,
        padding: 10,
        paddingLeft:30,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 2,
        color: '#003333',
      },
      searchIconWrapper:{
        position: 'absolute',
        width:40,
        padding:8,
        left:0,
        top:13,
        zIndex:1
      },
      searchIcon:{
        fontSize:16,
      },
    });
