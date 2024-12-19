import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import CustomText from "../components/CustomText";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Verifykey() {
  const navigation = useNavigation();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "https://my-money-mate-server.vercel.app/fetch-username"
        );
        setUserName(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const setLoginExpiration = async () => {
    const expirationTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
    await AsyncStorage.setItem("LoginExpiration", JSON.stringify(expirationTime));
    await AsyncStorage.setItem("IsLogin", JSON.stringify(true));
    await AsyncStorage.setItem("Username", username); 
  };

  const verifyUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://my-money-mate-server.vercel.app/verify-user",
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        await setLoginExpiration();
        (navigation as any).navigate("Home", { username: username });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert("Error", "Invalid username or password");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView>
        <ImageBackground
          source={require("../assets/appIMG/verifyBG.png")}
          className="flex-1 w-screen h-screen"
        >
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            backgroundColor="transparent"
          />

          <View className="items-center justify-center pt-56">
            <Image source={require("../assets/appIMG/profile.png")} />
            <CustomText className="pt-8 text-5xl" style={{}} >
              {username || "Loading..."}
            </CustomText>
          </View>

          <View className="bg-white rounded-t-[50px] h-screen pt-5 px-7">
            <View className="items-center">
              <Image source={require("../assets/appIMG/Bar.png")} />
            </View>

            <View className="pt-8">
              <CustomText style={{}} className="p-1 text-4xl">
                Enter to your{" "}
                <CustomText style={{}} className="text-[#004E89]">account</CustomText>
              </CustomText>
              <CustomText style={{}} className="p-1 text-4xl text-[#004E89]">
                Password
              </CustomText>
            </View>

            <View className="flex-row items-center px-2 py-2 border-2 rounded-md">
              <Image
                className="px-2"
                source={require("../assets/appIMG/Lock.png")}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={(text) => setPassword(text)}
                className="flex-1"
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-3"
              >
                <Image
                  source={
                    passwordVisible
                      ? require("../assets/appIMG/Eye.png")
                      : require("../assets/appIMG/Eye off.png")
                  }
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#004E89" />
            ) : (
              <TouchableOpacity
                className="items-center pt-10"
                onPress={verifyUser}
              >
                <Image
                  className="h-16 w-60 rounded-2xl"
                  source={require("../assets/appIMG/VerifyButton.png")}
                />
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
