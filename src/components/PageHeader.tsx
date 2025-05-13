import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BroIcons } from "./Icons";
import { _thPageHeader } from "../styles/PageHeaderStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoriteButton from "./FavoriteButton";
import { RootStackParamList } from "../routes";
import { JSX } from "react/jsx-runtime";

interface PageHeaderProps {
  title: string;
  eventId?: number;
  onBackPress?: () => void;
  onSharePress?: () => void;
  onFavoritePress?: () => void;
  onLogoutPress?: () => void;
  onAddMessage?: () => void;
  onRemoveNotification?: () => void;
  onEmailLogin?: () => void;
  showShare?: boolean;
  showFavorite?: boolean;
  showLogout?: boolean;
  showAddMessage?: boolean;
  showRemoveNotification?: boolean;
  showEmailLogin?: boolean;
  renderRightComponent?: () => JSX.Element; // ✅ Buraya ekledik
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  eventId,
  onBackPress,
  onSharePress,
  onFavoritePress,
  onLogoutPress,
  onAddMessage,
  onRemoveNotification,
  onEmailLogin,
  showShare = false,
  showFavorite = false,
  showLogout = false,
  showAddMessage = false,
  showRemoveNotification = false,
  showEmailLogin = false,
  renderRightComponent,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleEmailLogin = async () => {
    navigation.navigate("EmailLogin");
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("Logged Out", "You have been logged out successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]);
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={_thPageHeader.container}>
      {/* Geri Dön Butonu */}
      <TouchableOpacity onPress={handleBackPress} style={_thPageHeader.backButton}>
        <BroIcons.ChevronLeft size={24} color="#003D33" />
      </TouchableOpacity>

      <Text style={_thPageHeader.title}>{title}</Text>

      {/* Sağ Taraftaki Butonlar */}
      <View style={_thPageHeader.rightIcons}>
        {renderRightComponent ? (
          renderRightComponent()
        ) : (
          <>
            {showShare && (
              <TouchableOpacity onPress={onSharePress} style={_thPageHeader.iconButton}>
                <BroIcons.Share size={24} color="#003D33" />
              </TouchableOpacity>
            )}
            {showFavorite && <FavoriteButton eventId={eventId} />}
            {showLogout && (
              <TouchableOpacity onPress={onLogoutPress ? onLogoutPress : logout} style={_thPageHeader.iconButton}>
                <BroIcons.PowerOn size={24} color="#003D33" />
              </TouchableOpacity>
            )}
            {showAddMessage && (
              <TouchableOpacity onPress={onAddMessage} style={_thPageHeader.iconButton}>
                <BroIcons.Chat size={24} color='#003333' />
              </TouchableOpacity>
            )}
            {showRemoveNotification && (
              <TouchableOpacity onPress={onRemoveNotification} style={_thPageHeader.iconButton}>
                <BroIcons.Remove size={24} color='#003333' />
              </TouchableOpacity>
            )}
            {showEmailLogin && (
              <TouchableOpacity onPress={handleEmailLogin} style={_thPageHeader.iconButton}>
                <Text><BroIcons.User size={24} color='#003333' /> Login</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};