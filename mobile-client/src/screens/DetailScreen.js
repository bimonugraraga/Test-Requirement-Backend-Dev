import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, FlatList, Image} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from '../../lib/apollo/queries/productQuery';
import { useEffect, useState, useContext } from 'react';
const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);
function DetailScreen({navigation, route}){

  const {_id} = route.params
  console.log(_id)
  function convertToRupiah(angka){
    var rupiah = '';		
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }


  return(
    <View style={styles.container}>
      <Text>DETAIL</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardProduct: {
    margin: 5
  },
  thumbnailImage: {
    width: windowWidth/3,
    height: windowHeight/3,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10
    
  },
  indCard: {
    width: windowWidth/2.3,
    margin: 5
  },
  titleProduct: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 5,
    shadowColor: 'white',
    elevation: 10,
  }

  
})

export default DetailScreen