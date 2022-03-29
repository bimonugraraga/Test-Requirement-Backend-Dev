import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, FlatList, Image} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from "@apollo/client";
import { GET_CART } from '../../lib/apollo/queries/cartQuery';
import { useEffect, useState } from 'react';


const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);
function CartScreen({navigaton, route}){
  let [access_token, setAT] = useState(null)
  useEffect(() => {
    AsyncStorage.getItem('access_token')
    .then((resp) => {
      setAT(resp)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [access_token])
  
  let {loading, error, data} = useQuery(GET_CART, {
    variables: {
      accessToken: access_token
    }
  })
  
  function convertToRupiah(angka){
    var rupiah = '';		
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }
  console.log(loading, error, data)
  console.log(access_token, "<<<<")

  const Item = ({item}) => {
    console.log(item)
    return (
      <View style={styles.cartCard}>
        <Card>
          <Card.Content>
            <Image source={{ uri: item.imgUrl}} style={styles.thumbnailImage} />
          </Card.Content>
        </Card>
        <View style={styles.cartContent}>
          <Title style={styles.cartTitle}>{item.productName}</Title>
          <View style={styles.justCart}>
            <View style={styles.sizeProd}>
              <Text style={styles.cartSize}>SIZE: {item.size}</Text>
            </View>
            <View style={styles.genderProd}>
              <Text style={styles.cartTitle}>{item.gender.toUpperCase()}</Text>
            </View>    
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.prodPrice}>{convertToRupiah(item.price)}</Text>
          </View>

        </View>
      </View>
    )
  }
  const renderProduct = ({item}) => {
    return (
      <Item item={item} />
    )
  }
  const renderScreen = () => {
    if (data){
      return(
        <FlatList 
          data={data.GetMyCart}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
        />

      )
    }
  }


  return(
    <View style={styles.container}>
      <View style={styles.cartList}>
        <Title>My Cart</Title>
        {renderScreen()}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E0F2FE',
    marginVertical: 10,
    padding: 5
  },
  cartContent: {
    paddingHorizontal: 10
  },
  cartTitle: {
    fontSize:12,
    fontWeight: 'bold'
  },
  thumbnailImage: {
    width: windowWidth/5,
    height: windowHeight/10,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10
  },
  justCart: {
    display: 'flex',
    flexDirection: 'row'
  },
  sizeProd: {
    backgroundColor: '#5B21B6',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 12,
    marginRight: 5
  },
  cartSize: {
    color: '#EFF6FF'
  },
  genderProd: {
    backgroundColor: '#EFF6FF',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#5B21B6'
  },
  priceTag: {
    backgroundColor: "#F59E0B",
    padding: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 5

  },
  prodPrice: {
    fontWeight: 'bold',
    color: '#FEF2F2'
  },
  cartList: {
    marginTop: 60,
    alignItems: 'center'
  }
})
export default CartScreen