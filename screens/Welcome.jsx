import { View, Text, Image, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const jumpAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    // Use Animated.loop to create a continuous jump effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 20,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [jumpAnim]);

  return (
    <ImageBackground
      source={require('../assets/appIMG/WelcomeBG.png')}
      style={{ flex: 1 }}
    >
      <View
        style={{
          position: 'absolute',
          left: '20%',
          bottom: 32,
          right: '20%',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: jumpAnim }],
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={require('../assets/appIMG/swipe_up.png')} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}
