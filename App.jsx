import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, RaviPrakash_400Regular } from '@expo-google-fonts/ravi-prakash';

import HomeScreen from './screens/HomeScreen';
import Welcome from './screens/Welcome';
import Verifykey from './screens/Verifykey';
import Addselection from './screens/Addselection';
import AddNewmember from './screens/AddNewmember';
import AddExistingmember from './/screens/AddExistingmember';
import Viewbydate from './screens/Viewbydate';
import ViewByIndividual from './screens/ViewbyName';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    RaviPrakash_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Verifykey" component={Verifykey}/>
        <Stack.Screen name="Addselection" component={Addselection}/>
        <Stack.Screen name="AddNewmember" component={AddNewmember}/>
        <Stack.Screen name="AddExistingmember" component={AddExistingmember}/>
        <Stack.Screen name="Viewbydate" component={Viewbydate}/>
        <Stack.Screen name="ViewbyName" component={ViewByIndividual}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent('MyMoneyMate', () => App);
export default App;