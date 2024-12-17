import React, { useState } from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomText from "../components/CustomText";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params || {};

  const [newUsername, setNewUsername] = useState(username || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://my-money-mate-server.vercel.app/edit-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUsername: username,
            newUsername,
            newPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");
        navigation.navigate("Home", { username: newUsername });
      } else {
        Alert.alert("Error", result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/appIMG/editBG.png")}
        className="flex-1 p-5 pt-14"
      >
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity
            className="absolute top-4 left-4"
            onPress={() => navigation.goBack()}
          >
            <Image source={require("../assets/appIMG/back.png")} />
          </TouchableOpacity>

          <View className="items-center p-1 text-3xl mt-[14px]">
            <CustomText className="items-center p-1 text-3xl">
              Edit Profile
            </CustomText>
          </View>

          {/* Profile Header */}
          <View className="items-center mt-10">
            <Image source={require("../assets/appIMG/profile.png")} />
          </View>

          {/* Name Input */}
          <CustomText className="p-1 mt-8 text-3xl">Name</CustomText>
          <View className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg">
            <TextInput
              value={newUsername}
              onChangeText={setNewUsername}
              className="flex-1 text-xl"
              placeholder="Enter your name"
            />
          </View>

          {/* Reset Password Section */}
          <CustomText className="mt-6 text-3xl">Reset Password</CustomText>
          <TextInput
            placeholder="Enter New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            className="p-3 mt-2 text-lg bg-white rounded-lg"
          />
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            className="p-3 mt-4 text-lg bg-white rounded-lg"
          />

          {/* Save Button */}
          <TouchableOpacity
            className="items-center m-8"
            onPress={handleSaveChanges}
          >
            <Image source={require("../assets/appIMG/saveChanges.png")} />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EditProfile;
