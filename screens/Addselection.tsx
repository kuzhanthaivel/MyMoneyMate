import React, { useState } from "react";
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomText from "../components/CustomText";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Addselection() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params || {};
  return (
    <View className="flex-1 ">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../assets/appIMG/bg-Addselection.png")}
          className="flex-1 px-5 pt-20"
        >
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            backgroundColor="transparent"
          />

          <View className="pt-8 ">
            <CustomText className="p-1 text-4xl">
              Choose your{" "}
              <CustomText className="text-[#004E89]">Way !</CustomText>
            </CustomText>
          </View>
          <TouchableOpacity
            className="flex items-center p-4 mx-5 mt-10 bg-white border border-2 rounded-md justify-evenly h-14 "
            onPress={() =>
              navigation.navigate("AddNewmember", { username: username })
            }
          >
            <CustomText className="text-2xl">Create a member</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center p-4 mx-5 mt-16 bg-white border border-2 rounded-md justify-evenly h-14"
            onPress={() =>
              navigation.navigate("AddExistingmember", { username: username })
            }
          >
            <CustomText className="text-2xl">Add Transaction</CustomText>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
