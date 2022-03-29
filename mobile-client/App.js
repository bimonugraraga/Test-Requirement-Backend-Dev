import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProductRouter from './navigation/productRouter';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo/connection';
import AuthContext from './src/context';
import { useState } from 'react';
const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <ApolloProvider client={client}>
 
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='ProductRouter' component={ProductRouter} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
  );
}

