import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import CustomText from '../components/CustomText';

export default function Home() {
  const [userName, setUserName] = useState("KARTHIK");
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/appIMG/verifyBG.png')}
      className="flex-1"
    >
      <View className="items-center justify-center pt-56">
        <Image source={require('../assets/appIMG/profile.png')} />
        <CustomText className="pt-8 text-5xl">
          {userName}
        </CustomText>
      </View>

      <ScrollView className="bg-white rounded-t-[50px] h-96 pt-5 px-7">
        <View className="items-center">
          <Image source={require('../assets/appIMG/Bar.png')} />
        </View>

        <View className="pt-8">
          <CustomText className="p-1 text-4xl text-gray-700">
            Enter to your <CustomText className="text-[#004E89]">account</CustomText>
          </CustomText>
          <CustomText className="p-1 text-4xl text-[#004E89]">Password</CustomText>
        </View>

        <View className="flex-row items-center px-2 py-2 border-2 rounded-md">
          <Image className="px-2" source={require('../assets/appIMG/Lock.png')} />
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
                  ? require('../assets/appIMG/Eye.png')
                  : require('../assets/appIMG/Eye off.png')
              }
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className='items-center pt-10'>
          <Image source={require('../assets/appIMG/VerifyButton.png')} />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
