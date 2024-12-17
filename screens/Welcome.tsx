import React, { useEffect, useRef } from "react";
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GestureRecognizer from "react-native-swipe-gestures";

export default function Welcome() {
  const jumpAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const onSwipe = (gestureName) => {
    switch (gestureName) {
      case "SWIPE_UP":
        console.log("Up swipe performed");
        navigation.navigate("Verifykey");
        break;
      default:
        console.log("Undetected action");
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [jumpAnim]);

  return (
    <GestureRecognizer
      onSwipe={(gestureName) => onSwipe(gestureName)}
      className="flex-1"
    >
      <ImageBackground
        source={require("../assets/appIMG/WelcomeBG.png")}
        className="flex-1"
      >
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />

        <View className="absolute items-center bottom-8 right-48 left-48">
          <Animated.View
            style={{ transform: [{ translateY: jumpAnim }] }}
            className="items-center justify-center"
          >
            <TouchableOpacity className="items-center justify-center">
              <Image source={require("../assets/appIMG/swipe_up.png")} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </GestureRecognizer>
  );
}
