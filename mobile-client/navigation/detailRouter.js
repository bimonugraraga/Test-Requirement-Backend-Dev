import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import react from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from '../src/screens/ProductScreen';
import DetailScreen from '../src/screens/DetailScreen';

const Stack = createNativeStackNavigator()
function DetailRouter(){

  return (
    
    <Stack.Navigator>
      <Stack.Screen name='Product' component={ProductScreen} options={{headerShown: false}}/>
      <Stack.Screen name ='Detail' component={DetailScreen} />
    </Stack.Navigator>
  )
}

export default DetailRouter