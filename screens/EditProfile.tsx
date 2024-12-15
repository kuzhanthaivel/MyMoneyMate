import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, ImageBackground, Image, TextInput } from "react-native";
import CustomText from '../components/CustomText';  // Assuming CustomText is defined elsewhere
import { useNavigation } from '@react-navigation/native';
const EditProfile = () => {
      const navigation = useNavigation();
  return (
    <View className="flex-1 ">
         <ImageBackground 
                source={require("../assets/appIMG/editBG.png")}
                className="flex-1 p-5 pt-14"
              >
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      {/* Back Button */}
      <TouchableOpacity className="absolute top-4 left-4">
        <Image
          source={require("../assets/appIMG/back.png")}
          className=""
        />
      </TouchableOpacity>
      <View className="items-center p-1 text-3xl mt-[14px]">
        <CustomText className="items-center p-1 text-3xl">Edit Profile</CustomText>
      </View>

      {/* Profile Header */}
      <View className="items-center mt-10">
        <Image
          source={require("../assets/appIMG/profile.png")}
          className=""
        />
      </View>

      {/* Name Input */}
      <CustomText className="p-1 mt-8 text-3xl">Name</CustomText>
      <View className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg">
        <TextInput
          placeholder="Karthik"
          className="items-center flex-1 "
        ><Text className="text-xl">Karthik</Text></TextInput>
        <TouchableOpacity>
        <Image
          source={require("../assets/appIMG/Edit.png")}
          className=""
        />
        </TouchableOpacity>
      </View>

      {/* Reset Password Section */}
      <CustomText className="mt-6 text-3xl">Reset Password</CustomText>

      <View className="mt-2">
        <TextInput
          placeholder="Enter New Password"
          secureTextEntry
          className="p-3 mt-2 text-lg bg-white rounded-lg"
        />
        <TextInput
          placeholder="Confirm New Password"
          secureTextEntry
          className="p-3 mt-4 text-lg bg-white rounded-lg"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity className="items-center m-8" onPress={() => navigation.navigate('Home')}>
      <Image
          source={require("../assets/appIMG/saveChanges.png")}
          className=""
        />
      </TouchableOpacity>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EditProfile;
