import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import CustomText from "../components/CustomText";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Viewbydate() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params || {};
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://my-money-mate-server.vercel.app/all-transactions-date"
        );
        const data = await response.json();

        if (data && data.transactions) {
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const transactionToDelete = transactions.find((txn) => txn.id === id);

      if (transactionToDelete) {
        const response = await fetch(
          "https://my-money-mate-server.vercel.app/delete-transaction",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: transactionToDelete.name,
              transactionId: transactionToDelete.id,
            }),
          }
        );

        const data = await response.json();

        if (data && data.message === "Transaction deleted successfully") {
          setTransactions((prevTransactions) =>
            prevTransactions.filter((txn) => txn.id !== id)
          );
        } else {
          console.error("Error deleting transaction:", data.error);
        }
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View className="flex-row items-center p-4 mb-8 bg-white rounded-xl">
      <Image
        source={require("../assets/appIMG/profile1.png")}
        className="pl-2 mr-4 rounded-full w-14 h-14"
      />

      <View className="flex-1">
        <CustomText className="text-lg font-semibold">{item.name}</CustomText>
        <CustomText className="text-gray-600">{item.date}</CustomText>
      </View>
      <View className="bg-[#87B2D3] p-1 flex-row gap-x-2 rounded-xl items-center mr-5 justify-center">
        <Image
          className="w-3 h-3"
          source={require("../assets/appIMG/Rupee.png")}
        />
        <CustomText className="pt-2 pr-2 text-lg">{item.amount}</CustomText>
      </View>

      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Image source={require("../assets/appIMG/Delete.png")} />
      </TouchableOpacity>
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

        <CustomText className="p-2 pt-5 text-3xl">View by Date</CustomText>

        <FlatList
          className="pt-8"
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <CustomText className="pt-8 text-center text-gray-600">
              No transactions found.
            </CustomText>
          )}
        />
      </ImageBackground>
    </View>
  );
}
