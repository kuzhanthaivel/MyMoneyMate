import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import CustomText from '../components/CustomText';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <View className="flex-1">
        <ImageBackground
          source={require('../assets/appIMG/HomeBG.png')}
          className="flex-1 w-screen h-screen"
        ><ScrollView>
          <View className="items-center justify-center pt-16">
            <View className="items-center bg-[#CDE7FD] rounded-full px-10 h-72 w-72 justify-center pt-8 drop-shadow-2xl">
              <View className="flex-row gap-5">
                <View>
                  <Image
                    className="w-24 h-24"
                    source={require('../assets/appIMG/profile.png')}
                  />
                </View>
                <View className="items-center">
                  <CustomText className="text-2xl">
                    userName
                  </CustomText>
                  <CustomText className="text-sm">
                    Total Amount
                  </CustomText>
                  <View className="bg-[#87B2D3] p-1 flex-row gap-x-2 rounded-xl items-center">
                    <Image
                      source={require('../assets/appIMG/Rupee.png')}
                    />
                    <CustomText className="text-lg">
                      10000000000
                    </CustomText>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="pt-4" onPress={() => navigation.navigate('EditProfile')}>
                <CustomText className="underline">
                  Edit profile
                </CustomText>
                <Image
                  className="h-[2px] w-16"
                  source={require('../assets/appIMG/Bar.png')}
                />
              </TouchableOpacity>
            </View>

            <CustomText className="pt-8 text-5xl">
              Check your status
            </CustomText>
          </View>

          <View className="bg-white rounded-t-[50px] h-screen pt-5 px-7">
            <View className="items-center pt-3">
              <Image source={require('../assets/appIMG/Bar.png')} />
            </View>

            <View className="pt-8">
              <CustomText className="p-1 text-4xl">
                Choose your <CustomText className="text-[#004E89]">view!</CustomText>
              </CustomText>
            </View>

            <TouchableOpacity className="flex items-center p-4 mx-5 mt-5 border rounded-md justify-evenly h-14" onPress={() => navigation.navigate('Viewbydate')}>
              <CustomText className="text-2xl">
                View by date
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity className="flex items-center p-4 mx-5 mt-5 border rounded-md justify-evenly h-14" onPress={() => navigation.navigate('ViewbyName')}>
              <CustomText className="text-2xl">
                View by individual
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity className="items-center pt-10" onPress={() => navigation.navigate('Addselection')} >
              <Image source={require('../assets/appIMG/addButton.png')} />
            </TouchableOpacity>
          </View>
          </ScrollView>
        </ImageBackground>

    </View>
  );
}
