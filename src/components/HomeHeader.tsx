import { Button, Text, TextInput, View, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../routes"; // Assuming you have a types file where you define your navigation types
import { _thHomeScreen } from "../styles/HomeStyles";
import LocationSelectDropdown from "./LocationSelectButton";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { BroIcons } from "./Icons";
import {theme} from "../theme";

interface Props {
  onLocationSelected?: () => void;
}

const HomeHeader: React.FC<Props> = ({ onLocationSelected }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<{ name: string } | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadUserData(); // ekran her geri geldiğinde çalışır
    }, [])
  );

  const loadUserData = async () => {
    const storedUserdata = await AsyncStorage.getItem("user_data");
    if (storedUserdata) {
      const parsedStoredUserdata = JSON.parse(storedUserdata);
      setUserData(parsedStoredUserdata);
    }
  };

  const handleLocationChange = () => {
    if (onLocationSelected) {
      onLocationSelected(); // HomeScreen'e bildir
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      loadUserData(); // ekran her geri geldiğinde çalışır
    }, [])
  );

  const handleSearch = async () => {
    try {
      const response = await api.post("events/search", { query: searchQuery });
      const results = response.data;
      navigation.navigate("SearchDetail", { results });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleChatNavigate = () => {
    navigation.navigate("ChatList");
  };
  const handleNotificationNavigate = () => {
    navigation.navigate("Notification");
  };

  return (
    <View style={_thHomeScreen.header}>
      <View style={_thHomeScreen.headerTop}>
        <View style={_thHomeScreen.cellLeft}>
          <Image source={require("../assets/logow.png")} style={_thHomeScreen.logo} />
          <Text style={_thHomeScreen.greeting}>Hi, {userData?.name.substring(0, 15)}</Text>
          <Text style={_thHomeScreen.subtitle}>a journey from heart to soul</Text>
        </View>
        <View style={_thHomeScreen.cellRight}>
          <View style={_thHomeScreen.notifyComponent}>
            <TouchableOpacity style={_thHomeScreen.roundButton} onPress={handleChatNavigate}>
              <BroIcons.Mail size={18} color={"#003333"} />
              <View style={_thHomeScreen.notificationBadge}>
                <Text style={_thHomeScreen.badgeText}></Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={_thHomeScreen.roundButton} onPress={handleNotificationNavigate}>
              <BroIcons.Bell size={18} color={"#003333"} />
              <View style={_thHomeScreen.notificationBadge}>
                <Text style={_thHomeScreen.badgeText}></Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={_thHomeScreen.locationComponent}>
            <LocationSelectDropdown onLocationSelected={handleLocationChange} />
          </View>
        </View>
      </View>
      <View style={_thHomeScreen.searchBarWrapper}>
        <TouchableOpacity onPress={handleSearch} style={_thHomeScreen.searchIconWrapper}>
          <BroIcons.Search size={18} color={"#003333"} />
        </TouchableOpacity>
        <TextInput
          style={_thHomeScreen.searchBar}
          placeholderTextColor={theme.placeholderColor.color}
          placeholder="Search categories, retreats, location, facilitator"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
    </View>
  );
};

export default HomeHeader;