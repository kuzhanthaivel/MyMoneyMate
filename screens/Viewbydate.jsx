import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, FlatList, Text } from 'react-native';
import CustomText from '../components/CustomText';
import { useNavigation } from '@react-navigation/native';

export default function Viewbydate() {
    const navigation = useNavigation();
    const data = [
        { id: '1', name: 'dsk;mnk', date: '27/11/2024', amount: '500' },
        { id: '2', name: 'bkijdehui', date: '27/11/2024', amount: '500' },
        { id: '3', name: 'kllw', date: '27/11/2024', amount: '500' },
        { id: '4', name: 'kskskndkm', date: '27/11/2024', amount: '5000' },
        { id: '5', name: 'nkldskl', date: '27/11/2024', amount: '500' },
        { id: '6', name: 'kldsp', date: '27/11/2024', amount: '5040' },
        { id: '7', name: 'klmjsuhs', date: '27/11/2024', amount: '100' },
      ];
      
      const handleDelete = (id) => {
        console.log(`Delete item with id: ${id}`);
        // Logic to delete item from the list
      };
      
      
      const renderItem = ({ item }) => (
        <View className="flex-row items-center p-4 mb-8 bg-white rounded-xl">
          <Image
            source={require('../assets/appIMG/profile1.png')}
            className="pl-2 mr-4 rounded-full w-14 h-14"
          />
          <View className="flex-1">
            <CustomText className="text-lg font-semibold">{item.name}</CustomText>
            <CustomText className="text-gray-600">{item.date}</CustomText>
          </View>

          <View className="bg-[#87B2D3] p-1 flex-row gap-x-2 rounded-xl items-center mr-5 justify-center ">
                    <Image className='w-3 h-3 '
                      source={require('../assets/appIMG/Rupee.png')}
                    />
                    <CustomText className="pt-2 pr-2 text-lg">
                    {item.amount}
                    </CustomText>
                  </View>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Image
              source={require('../assets/appIMG/Delete.png')}
            />
          </TouchableOpacity>
        </View>
      );
      

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../assets/appIMG/viewbydateBG.png')}
        className="flex-1 p-5 pt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View className="pt-5">
            <CustomText className="p-2 text-3xl">View by Date</CustomText>
          </View>
          
          <FlatList className='pt-8'
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />


        </ScrollView>
      </ImageBackground>
    </View>
  );
}
