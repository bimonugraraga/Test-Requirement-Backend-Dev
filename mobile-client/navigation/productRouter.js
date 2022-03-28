import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../src/screens/ProductScreen';
import LoginScreen from '../src/screens/LoginScreen';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../src/context';
import { Button } from 'react-native-paper';
import DetailRouter from './detailRouter';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions} from 'react-native'
const Tab = createBottomTabNavigator()

function ProductRouter(){


  return (
    
    <Tab.Navigator>
      <Tab.Screen name='Product' component={DetailRouter} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

export default ProductRouter
