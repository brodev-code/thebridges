import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import { _thHomeScreen } from '../styles/HomeStyles';
import Slider from '../components/Slider';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../components/HomeHeader';
import BottomMenu from '../components/BottomMenu';
import EventLocationList from '../components/EventLocationListCards';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const GradientBackground = () => {
  return (
    <LinearGradient
      colors={['#008080', '#FFFfF5']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={_thHomeScreen.gradient}
    />
  );
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [locationUpdated, setLocationUpdated] = useState(0);

  const handleLocationChange = () => {
    setLocationUpdated(prev => prev + 1); // EventLocationList yeniden yüklensin
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#008080" />
      <View style={_thHomeScreen.container}>
        <GradientBackground />
        <HomeHeader onLocationSelected={handleLocationChange} />
        <ScrollView style={_thHomeScreen.scrollView}>
          <Slider />
          <EventLocationList locationUpdated={locationUpdated} />
        </ScrollView>
      </View>
      <BottomMenu />
    </>
  );
};

export default HomeScreen;
