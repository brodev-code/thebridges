import { StyleSheet } from "react-native";

export const _thNotification = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    notificationCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    notificationTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#666',
    },
});