import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, FlatList, Image} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from '../../lib/apollo/queries/productQuery';
import { useEffect, useState, useContext } from 'react';

const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);
function ProductScreen({navigation, route}){
  let [access_token, setAT] = useState(null)
  let [similar, setSimi] = useState('')
  const { loading, error, data, refetch  } = useQuery(GET_PRODUCTS, {

    variables: {
      similar: similar
    }
  })
  
  function convertToRupiah(angka){
    var rupiah = '';		
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }

  const toDetail = (_id) => {
    navigation.navigate('Detail', {
      _id: _id
    })
  }

  const Item = ({item}) => {

    return (

      <View style={styles.bigCard}>
        <Card style={styles.indCard}>
          <Card.Content style={styles.headCard}>
            <Title style={styles.titleProduct}>{item.productName.toUpperCase()}</Title>
            <View>
              <View>
                <Text style={styles.priceText}>{convertToRupiah(item.price)}</Text>
              </View>
            </View>
          </Card.Content>
          <TouchableOpacity onPress={() => toDetail(item._id)}>
            <Card.Cover source={{ uri: item.imgUrl}} style={styles.thumbnailImage}/>
          </TouchableOpacity>

        </Card>
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
          data={data.GetAllProduct}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
        />

      )
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Title>SHOP</Title>
        <TextInput
              label="Product Name"
              style={styles.inputField}
              onChangeText={(newText) => setSimi(newText)} 
            />
        <Button style={styles.searchBtn} onPress={() => refetch()}>
          <Text style={styles.textLog}>
            Search
          </Text>
        </Button>
      </View>
      {renderScreen()}
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
  },
  searchBar: {
    width: windowWidth/1.2,
    marginTop: 70,
    marginBottom: 20

  },
  searchBtn: {
    backgroundColor: 'blue',
    borderRadius:5,
    padding: 5,
  },
  textLog: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  inputField:{
    marginBottom: 10
  },

  
})

export default ProductScreen