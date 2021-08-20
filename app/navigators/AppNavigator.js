import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
// import SplashScreen from '@scenes/SplashScreen/';
import ExampleScreen from '@scenes/ExampleScreen';
import FormScreen from '@scenes/FormScreen';
import { colors } from '@themes';
import NavigationService from '../services/NavigationService';
const Stack = createStackNavigator();
/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */

const DarkTheme = {
  dark: true,
  colors: colors.dark
};

const LightTheme = {
  dark: false,
  colors: colors.light
};

export default function AppNavigator() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      theme={scheme === 'dark' ? DarkTheme : LightTheme}
      ref={NavigationService.setTopLevelNavigator}
    >
      <Stack.Navigator headerMode="none" initialRouteName="ExampleScreen">
        <Stack.Screen name="MainScreen" component={ExampleScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
