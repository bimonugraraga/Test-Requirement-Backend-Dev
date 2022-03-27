import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../src/screens/ProductScreen';
import LoginScreen from '../src/screens/LoginScreen';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../src/context';
import { Button } from 'react-native-paper';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions} from 'react-native'
const Tab = createBottomTabNavigator()

function ProductRouter(){
  const auth = useContext(AuthContext);
  let [logged, setLogged] = useState(true)
  const LogOutHandler = (e) => {
    e.preventDefault()
    console.log("LOGGED OUT")

  }

  return (
    
    <Tab.Navigator>
      <Tab.Screen name='Products' component={ProductScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

export default ProductRouter
