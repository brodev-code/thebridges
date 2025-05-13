import { StyleSheet } from 'react-native';

const _thAgreementScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 20,
    },
    agreementText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginTop: 20,
    }
});

export default _thAgreementScreen;
