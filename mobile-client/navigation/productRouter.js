import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../src/screens/ProductScreen';
import LoginScreen from '../src/screens/LoginScreen';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../src/context';
import { Button } from 'react-native-paper';
import DetailRouter from './detailRouter';
import CartScreen from '../src/screens/CartScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Tab = createBottomTabNavigator()

function ProductRouter({navigation, route}){
  let [access_token, setAT] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('access_token')
    .then((resp) => {
      setAT(resp)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [access_token])
  const LogOutHandler = (e) => {
    e.preventDefault()
    AsyncStorage.removeItem("access_token")
      .then((resp) => {
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err, "<><><>");
      });
  }

  return (
        <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Product') {
              iconName = focused ? "home" : "home"
            } else if (route.name === "Cart"){
              iconName = focused ? "bookmarks-outline" : "bookmarks-outline"
            } else if (route.name === "LogOut"){
              iconName = focused ? "power-outline" : "power-outline"
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#A5F3FC",
          tabBarStyle:{
            backgroundColor: '#0F172A',//color you want to change
  
          }
        })}>
          <Tab.Screen name='Product' component={DetailRouter} options={{headerShown: false}}/>
          <Tab.Screen name='Cart' component={CartScreen} options={{headerShown: false}}/>
          <Tab.Screen name='LogOut' component={LoginScreen} options={{headerShown: false}} onPress={LogOutHandler}/>
        </Tab.Navigator>
  )
}

export default ProductRouter
