import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, FlatList, Text } from 'react-native';
import CustomText from '../components/CustomText';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddSelection() {
    const navigation = useNavigation();
  const namesList = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
    { id: '4', name: 'Bob Brown' },
    { id: '5', name: 'Charlie Davis' },
  ];

  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [query, setQuery] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);

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

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = namesList.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredNames(filtered);
  };

  const handleSelect = (item) => {
    setQuery(item.name);
    setName(item.name);
    setFilteredNames([]);
    console.log(name)
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../assets/appIMG/addnewmemberBG.png')}
        className="flex-1 p-5 pt-10"
      >
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View className="pt-5">
            <CustomText className="p-2 text-3xl">Existing member</CustomText>
          </View>

          <View className="pt-5">
            <CustomText className="p-2 text-2xl">Name</CustomText>
          </View>
          
          {/* Name Search Input */}
          <TextInput
            className="h-12 mx-3 mt-4 text-xl bg-white rounded-lg shadow-md"
            placeholder="Enter name"
            value={query}
            onChangeText={handleSearch}
          />

          {query.length > 0 && (
            <FlatList
              data={filteredNames}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-300"
                  onPress={() => handleSelect(item)}
                >
                  <Text className="text-lg">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          <View className="pt-5">
            <CustomText className="p-2 text-2xl">Date</CustomText>
          </View>
          <TouchableOpacity
            className="flex-row items-center justify-center h-12 px-4 mx-3 mt-4 bg-white rounded-lg shadow-md"
            onPress={() => setShowPicker(true)}
          >
            <CustomText className="text-lg text-gray-500">
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

          <View className="pt-5">
            <CustomText className="p-2 text-2xl">Amount</CustomText>
          </View>
          <TextInput
            className="h-12 mx-3 mt-4 text-xl bg-white rounded-lg shadow-md"
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />

          <TouchableOpacity className="items-center pt-10 pb-4" onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/appIMG/addButton.png')} />
          </TouchableOpacity>

        </ScrollView>
      </ImageBackground>
    </View>
  );
}
