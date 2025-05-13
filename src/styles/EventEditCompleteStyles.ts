import { StyleSheet } from "react-native";

export const _thEventEditComplete = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 20,
  },
  eventImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 15,
  },
  separator: {
    fontSize: 132,
    textAlign: "center",
    marginVertical: 15,
  },
  ticketList: {
    marginTop: 20,
  },
  ticketCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor:'#EBEBEB',
    borderWidth:1,
    backgroundColor: "#fff",
  },
  ticketLeft: {
    flex: 1,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003333",
  },
  ticketSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B0082",
  },
  backButton: {
    backgroundColor: "#4B0082",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  available:{
    backgroundColor:'#EBEBEB',
    color:'#003333',
    fontSize:18,
    borderRadius:6,
    paddingVertical:12,
    paddingHorizontal:8,
  },
});
