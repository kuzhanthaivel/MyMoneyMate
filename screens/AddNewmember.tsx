import React, { useState } from "react";
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import CustomText from "../components/CustomText";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddSelection() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params || {};

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  // Function to handle adding the new member
  const handleAddMember = async () => {
    if (!name || !targetAmount) {
      Alert.alert("Error", "Name and Target Amount are required");
      return;
    }

    try {
      const response = await fetch(
        "https://my-money-mate-server.vercel.app/create-member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            targetAmount,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Show success message
        Alert.alert("Success", "Member created successfully");
        navigation.navigate("Home", { username: username });
      } else {
        // Show error message
        Alert.alert("Error", data.error || "Failed to create member");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      Alert.alert("Error", "An error occurred while creating the member");
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/appIMG/addnewmemberBG.png")}
        className="flex-1 px-5 pt-16"
      >
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="pt-8">
            <CustomText className="p-1 text-4xl">New member</CustomText>
          </View>

          <View className="pt-8">
            <CustomText className="p-1 text-2xl">Name</CustomText>
          </View>
          <TextInput
            className="h-12 mx-3 mt-4 text-lg bg-white rounded-lg drop-shadow-2xl"
            placeholder="Enter name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <View className="pt-8">
            <CustomText className="p-1 text-2xl">Target Amount</CustomText>
          </View>
          <TextInput
            className="h-12 mx-3 mt-4 text-lg bg-white rounded-lg drop-shadow-2xl"
            placeholder="Enter target amount"
            keyboardType="numeric"
            value={targetAmount}
            onChangeText={(text) => setTargetAmount(text)}
          />

          <TouchableOpacity
            className="items-center pt-10 pb-4"
            onPress={handleAddMember}
          >
            <Image source={require("../assets/appIMG/addButton.png")} />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
