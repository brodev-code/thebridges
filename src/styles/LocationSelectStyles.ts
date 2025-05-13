import { StyleSheet } from 'react-native';

export const _thLocationSelect = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#0A2F35',
            textAlign: 'center',
            flex: 1,
        },
        locationContainer: {
            marginTop: 20,
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
            color: '#0A2F35',
            marginBottom: 8,
        },
        description: {
            fontSize: 14,
            color: '#B1B1B1',
            marginBottom: 16,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#B1B1B1',
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 12,
            backgroundColor: '#fff',
        },
        input: {
            flex: 1,
            fontSize: 14,
            backgroundColor: '#fff',
            color: '#003333',
        },
        dropdownIcon: {
            marginLeft: 10,
            color: '#B1B1B1',
        },
        button: {
            marginTop: 16,
            backgroundColor: '#4B0082',
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
        },
        locationButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            borderRadius: 8,
            padding: 12,
            marginTop: 10,
        },
        locationButtonText: {
            fontSize: 14,
            color: '#B1B1B1',
            marginLeft: 8,
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#003333',
            textAlign: 'center',
            marginBottom: 20,
        },
    
});