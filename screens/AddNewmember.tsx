import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import CustomText from '../components/CustomText';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddSelection() {
    const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(""); 
  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false); 
    setDate(currentDate); 
    setFormattedDate(formatDate(currentDate)); 
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../assets/appIMG/addnewmemberBG.png')}
        className="flex-1 px-5 pt-16"
      >
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
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
            <CustomText className="p-1 text-2xl">Date</CustomText>
          </View>
          <TouchableOpacity
            className="flex items-center justify-center h-12 p-4 mx-3 mt-4 bg-white rounded-lg drop-shadow-2xl"
            onPress={() => setShowPicker(true)}
          >
            <CustomText className="text-lg text-gray-800">
              {formattedDate || "Select a date"} 
            </CustomText>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <View className="pt-8">
            <CustomText className="p-1 text-2xl">Amount</CustomText>
          </View>
          <TextInput
            className="h-12 mx-3 mt-4 text-lg bg-white rounded-lg drop-shadow-2xl"
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
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

          <TouchableOpacity className="items-center pt-10 pb-4" onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/appIMG/addButton.png')} />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
