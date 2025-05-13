import React, { useState, useRef, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, Text, TouchableOpacity, StatusBar } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { api, API_BASE_URL } from '../services/api';
import { PageHeader } from '../components/PageHeader';

type ThreeDSRouteProp = RouteProp<RootStackParamList, 'ThreeDSWebView'>;

const ThreeDSNative: React.FC = () => {
  const route = useRoute<ThreeDSRouteProp>();
  const navigation = useNavigation();
  const { redirectUrl, threeDSServerTransId, transactionId } = route.params;
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);
  
  // Dokümanda belirtilen tüm parametreler
  const formHtml = `
    <html>
      <body onload="document.forms[0].submit()">
        <form action="${redirectUrl}" method="POST">
          <input type="hidden" name="transactionId" value="${threeDSServerTransId}">
          <input type="hidden" name="notificationUrl" value="${API_BASE_URL}/payment/3ds-callback">
          <input type="hidden" name="MD" value="${transactionId}">
        </form>
      </body>
    </html>
  `;

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    // 3DS tamamlama kontrolü
    if (navState.url.startsWith(API_BASE_URL+'/payment/3ds-callback')) {
      handle3DSResult();
    }
  };

  const handle3DSResult = async () => {
    try {
      const result = await api.get(`/transactions/${transactionId}`);
      
      if (result.data.status === 'SUCCESS') {
        Alert.alert('Payment Successful', 'Your payment was successful!');
        //navigation.navigate('PaymentSuccess', { transactionId });
      } else {
        Alert.alert('Payment Failed', result.data.reasonMessage);
        // navigation.navigate('PaymentFailed', { reason: result.data.reasonMessage });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not verify transaction status');
    }
  };

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <PageHeader title="3D Secure Payment" onBackPress={() => navigation.goBack()} />
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: formHtml }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
        onNavigationStateChange={handleNavigationStateChange}
        onError={(syntheticEvent) => {
          console.error('WebView error:', syntheticEvent.nativeEvent);
          Alert.alert('Error', '3D Secure process failed to load');
        }}
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
          </View>
        )}
        startInLoadingState={true}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  }
});

export default ThreeDSNative;