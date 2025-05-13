import React from 'react';
import { StatusBar, Platform, LogBox, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainStack from './MainStack';

// iOS için bazı logları devre dışı bırak
if (Platform.OS === 'ios') {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar 
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Platform.OS === 'ios' ? '#ffffff' : '#4B0082'}
      />
      <NavigationContainer>
      <MainStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

