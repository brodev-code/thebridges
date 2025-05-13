import { StyleSheet } from "react-native";

export const _thEventListCards = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#fff'
  },
  categoryTitle:{
    fontSize: 16,
    fontWeight:'500',
    color: '#003333',
    marginBottom:8,
  },
  categoryButton: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderColor:"#EBEBEB",
    borderWidth:1,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#003333',
  },
  categoryActiveText:{
    fontSize: 14,
    color:"#4B0082",
  },
  categoryActiveButton:{
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:"#4B0082",
    borderRadius: 8,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor:'#EBEBEB',
    borderBottomWidth:1,
    borderRadius: 0,
    marginBottom: 8,
    paddingVertical: 16,
  },
  eventImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor:'#b1b1b1',
  },
  eventInfo: {
    flex: 1,
    marginLeft: 10,
  },
  eventDate: {
    fontSize: 12,
    color: '#B1B1B1',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003333',
  },
  eventAddress: {
    fontSize: 12,
    color: '#B1B1B1',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
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
    backgroundColor:'#b1b1b1',
    marginRight: 2,
  },
  organizerName: {
    fontSize: 12,
    color: '#003333',
    fontWeight:'bold'
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7B1FA2',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});