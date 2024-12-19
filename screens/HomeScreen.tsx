import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Text,
} from "react-native";
import CustomText from "../components/CustomText";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [username, setUsername] = useState(route.params?.username || ""); // Initialize with route or empty string
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch username from AsyncStorage if not provided via route
  useEffect(() => {
    const fetchUsernameFromStorage = async () => {
      if (!username) {
        try {
          const storedUsername = await AsyncStorage.getItem("Username");
          if (storedUsername) {
            setUsername(storedUsername);
          }
        } catch (error) {
          console.error("Error fetching username from AsyncStorage:", error);
        }
      }
    };

    fetchUsernameFromStorage();
  }, [username]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch(
          `https://my-money-mate-server.vercel.app/api/total-amount/${username}`
        );
        const data = await response.json();
        if (response.ok) {
          setTotalAmount(data.TotalAmmountofcollection);
        } else {
          console.error("Error fetching total amount:", data.message);
        }
      } catch (error) {
        console.error("Error fetching total amount:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchTotalAmount();
    }
  }, [username]);

  const Logout = async () => {
    try {
      await AsyncStorage.setItem("IsLogin", JSON.stringify(false));
      console.log("User logged out successfully");
      navigation.navigate("Verifykey");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/appIMG/HomeBG.png")}
        className="flex-1 w-screen h-screen"
      >
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <View className="items-center justify-center pt-16">
          <View className="items-center bg-[#CDE7FD] rounded-full px-10 h-72 w-72 justify-center pt-8 drop-shadow-2xl">
            <View className="flex-row gap-5">
              <View>
                <Image
                  className="w-24 h-24"
                  source={require("../assets/appIMG/profile.png")}
                />
              </View>
              <View className="items-center">
                <CustomText className="text-2xl">{username || "Guest"}</CustomText>
                <CustomText className="text-sm">Total Amount</CustomText>
                <View className="bg-[#87B2D3] p-1 flex-row gap-x-2 rounded-xl items-center">
                  <Image source={require("../assets/appIMG/Rupee.png")} />
                  {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                    <CustomText className="text-lg">
                      {totalAmount !== null ? totalAmount : "N/A"}
                    </CustomText>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              className="pt-4"
              onPress={() =>
                navigation.navigate("EditProfile", { username: username })
              }
            >
              <CustomText>Edit profile</CustomText>
              <Image
                className="h-[2px] w-16"
                source={require("../assets/appIMG/Bar.png")} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 mt-4 bg-red-700 rounded-xl"
              onPress={Logout}
            >
              <CustomText className="pt-1 text-white">Logout</CustomText>
            </TouchableOpacity>
          </View>

          <CustomText className="pt-8 text-5xl">Check your status</CustomText>
        </View>

        <View className="bg-white rounded-t-[50px] h-screen pt-5 px-7">
          <View className="items-center pt-3">
            <Image source={require("../assets/appIMG/Bar.png")} />
          </View>

          <View className="pt-8">
            <CustomText className="p-1 text-4xl">
              Choose your{" "}
              <CustomText className="text-[#004E89]">view!</CustomText>
            </CustomText>
          </View>

          <TouchableOpacity
            className="flex items-center p-4 mx-5 mt-5 border rounded-md justify-evenly h-14"
            onPress={() =>
              navigation.navigate("Viewbydate", { username: username })
            }
          >
            <CustomText className="text-2xl">View by date</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center p-4 mx-5 mt-5 border rounded-md justify-evenly h-14"
            onPress={() =>
              navigation.navigate("ViewbyName", { username: username })
            }
          >
            <CustomText className="text-2xl">View by individual</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center pt-10"
            onPress={() =>
              navigation.navigate("Addselection", { username: username })
            }
          >
            <Image source={require("../assets/appIMG/addButton.png")} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
