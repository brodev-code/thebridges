import { StyleSheet } from "react-native";

export const _thEventDetail = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff' },
    header: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 0,
      borderBottomColor:'#ebebeb',
      borderBottomWidth:1,
      paddingBottom:8,
      paddingTop:8,
    },
    imageStyle: {
      borderRadius: 16,
    },
    imageContainer:{
      position:'relative',
      height: 200,
      marginBottom:8,
      borderRadius: 16,
      overflow:'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 16,
    },
    blurContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '40%', // Daha geniş bir alan kaplasın
      overflow: 'hidden',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      filter: 'blur(5px)',
    },
    blurOverlay: {
      ...StyleSheet.absoluteFillObject,
      top: '-40%', // Üst kısımdan taşacak şekilde ayarla
      height: '140%', // Orjinal resmin üzerine binecek şekilde
      borderRadius: 16,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      flexDirection: 'column-reverse',
      borderRadius: 16,
    },
    rightContent: {
      position: 'absolute',
      bottom: 16,
      right: 16,
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
      color: '#fff',
      fontWeight:'bold'
    },
    eventName: { fontSize: 24, fontWeight: '500', flex: 1,color:'#003333' },
    eventAddress: { fontSize: 14, color: '#B1B1B1' },
    eventDates: { fontSize: 12,color:'#B1B1B1' },
    eventDescription: { fontSize: 14,color:'#B1B1B1' },
    section: { marginVertical: 10 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8,color:'#003333' },
    videoPlaceholder: {
      backgroundColor: '#008080',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    videoText: { fontSize: 18, color: '#fff' },
    ticketRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    ticketType: { fontSize: 16, flex: 1 },
    ticketPrice: { fontSize: 16, fontWeight: 'bold' },
    ticketQuantity: { flexDirection: 'row', alignItems: 'center' },
    ticketButton: {
      backgroundColor: '#003333',
      padding: 5,
      borderRadius: 5,
    },
    ticketButtonText: { color: '#fff', fontSize: 16 },
    quantityText: { marginHorizontal: 10, fontSize: 16 },
    similarCard: {
      marginRight: 15,
      width: 150,
    },
    similarImage: {
      width: '100%',
      height: 100,
      borderRadius: 10,
    },
    similarName: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
    similarPrice: { fontSize: 14, color: '#888' },
    buyButton: {
      backgroundColor: '#003333',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    buyButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
    readMore:{
      color:'#003333',
      textDecorationLine:'underline',
      fontWeight:'500',
      marginVertical:8,
    },
    divider:{
      marginTop:8,
      borderBottomColor:'#EBEBEB',
      borderBottomWidth:1
    },
    eventLanguage:{
      borderWidth:1,
      borderColor:'#B1B1B1',
      borderRadius:8,
      width:30
    },
    eventLanguageText:{
      textTransform:'uppercase',
      color:'#B1B1B1',
      fontSize:12,
      textAlign:'center',
    }
  });