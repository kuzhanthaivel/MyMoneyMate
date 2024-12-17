import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import CustomText from "../components/CustomText"; // Assuming CustomText is defined elsewhere
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function ViewByIndividual() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await axios.get(
          "https://my-money-mate-server.vercel.app/get-all-transactions"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View className="flex-1 p-3 mb-6 bg-white shadow-md rounded-xl">
      {/* Header */}
      <TouchableOpacity
        className="flex-row items-center "
        onPress={() => toggleCard(item.id)}
      >
        <Image
          source={require("../assets/appIMG/profile1.png")}
          className="pl-2 mr-4 rounded-full w-14 h-14"
        />

        <View className="">
          <CustomText className="text-2xl ">{item.name}</CustomText>
          <View className="bg-[#87B2D3] flex-row gap-x-2 rounded-xl items-center justify-center">
            <Image
              className="w-3 h-3"
              source={require("../assets/appIMG/Rupee.png")}
            />
            <CustomText className="pt-1 pr-2 text-lg">
              {item.targetAmount}
            </CustomText>
          </View>
        </View>

        <View className="absolute right-2">
          <Image
            className=""
            source={
              expandedCard === item.id
                ? require("../assets/appIMG/arrowUp.png")
                : require("../assets/appIMG/arrowDown.png")
            }
          />
        </View>
      </TouchableOpacity>

      {expandedCard === item.id && (
        <View className="p-2 mt-3 bg-[#D6E5F0] rounded-lg">
          <CustomText className="mb-2 text-lg font-semibold">
            Transactions
          </CustomText>
          {item.transactions.length > 0 ? (
            item.transactions.map((tx, index) => (
              <View
                key={index}
                className="flex-row justify-between py-1 border-b border-gray-300"
              >
                <CustomText className="text-xl">{index + 1}</CustomText>
                <CustomText className="text-xl">{tx.date}</CustomText>
                <CustomText className="text-xl">{tx.amount}</CustomText>
              </View>
            ))
          ) : (
            <CustomText className="text-xl text-center text-gray-600">
              No Transactions
            </CustomText>
          )}

          <View className="flex-row items-center justify-center h-12 px-4 mx-3 mt-3 text-2xl bg-white rounded-lg shadow-md">
            {" "}
            <CustomText className="text-xl">
              Paid : {item.paidAmount}
            </CustomText>
          </View>
          <View className="flex-row items-center justify-center h-12 px-4 mx-3 mt-3 bg-white rounded-lg shadow-md">
            {" "}
            <CustomText className="text-xl">
              Balance : {item.balance}
            </CustomText>
          </View>
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
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <CustomText className="p-1 mt-10 mb-4 text-4xl">
            View by Individual
          </CustomText>

          {/* Display Loading Spinner while data is loading */}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              className="pt-4"
              data={data} // Use the fetched data
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
