import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import CustomText from '../components/CustomText';  // Assuming CustomText is defined elsewhere
import { useNavigation } from '@react-navigation/native';

export default function ViewByIndividual() {
      const navigation = useNavigation();
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const data = [
    {
      id: "1",
      name: "Name 1",
      balance: "500",
      transactions: [
        { date: "27/11/24", amount: "400" },
        { date: "28/11/24", amount: "400" },
        { date: "29/11/24", amount: "500" },
        { date: "30/11/24", amount: "400" },
      ],
    },
    { id: "2", name: "Name 2", balance: "500", transactions: [] },
    { id: "3", name: "Name 3", balance: "500", transactions: [] },
    { id: "4", name: "Name 4", balance: "500", transactions: [] },
    { id: "5", name: "Name 5", balance: "500", transactions: [] },
  ];

  const renderItem = ({ item }) => (
    <View className="p-3 mb-6 bg-white shadow-md rounded-xl">
      {/* Header */}
      <TouchableOpacity
        className="flex-row items-center "
        onPress={() => toggleCard(item.id)}
      >
        <Image
          source={require('../assets/appIMG/profile1.png')}
          className="pl-2 mr-4 rounded-full w-14 h-14"
        />

        <View className="mx-3 ml-10">
          <CustomText className="text-2xl ">{item.name}</CustomText>
          <View className="bg-[#87B2D3] flex-row gap-x-2 rounded-xl items-center justify-center">
            <Image className='w-3 h-3' source={require('../assets/appIMG/Rupee.png')} />
            <CustomText className="pt-1 pr-2 text-lg">
              {item.balance}
            </CustomText>
          </View>
        </View>

        <View className="items-center left-24">
          <Image
            className=''
            source={expandedCard === item.id ? require('../assets/appIMG/arrowUp.png') : require('../assets/appIMG/arrowDown.png')}
          />
        </View>
      </TouchableOpacity>

      {expandedCard === item.id && (
        <View className="p-2 mt-3 bg-[#D6E5F0] rounded-lg">
          <CustomText className="mb-2 text-lg font-semibold">Transactions</CustomText>
          {item.transactions.length > 0 ? (
            item.transactions.map((tx, index) => (
              <View
                key={index}
                className="flex-row justify-between py-1 border-b border-gray-300"
              >
                <CustomText className='text-xl'>{index + 1}</CustomText>
                <CustomText className='text-xl'>{tx.date}</CustomText>
                <CustomText className='text-xl'>{tx.amount}</CustomText>
              </View>
            ))
          ) : (
            <CustomText className="text-xl text-center text-gray-600">No Transactions</CustomText>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1">
      <ImageBackground 
        source={require("../assets/appIMG/viewbydateBG.png")}
        className="flex-1 p-5 pt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <CustomText className="p-1 mt-10 mb-4 text-4xl">
            View by Individual
          </CustomText>
          <FlatList className='pt-4'
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
