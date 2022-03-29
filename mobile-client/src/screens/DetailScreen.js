import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, FlatList, Image} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme, Modal, Portal, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from '../../lib/apollo/queries/productQuery';
import { useEffect, useState, useContext } from 'react';
import { GET_PRODUCT } from '../../lib/apollo/queries/productQuery';
import { ADD_CART } from '../../lib/apollo/queries/cartQuery';


const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);
function DetailScreen({navigation, route}){
  let [gender, setGender] = useState('')
  let [size, setSize] = useState('')
  let [access_token, setAT] = useState(null)
  const [visible, setVisible] = useState(false);

  const {_id} = route.params
  console.log(_id)
  let {loading, error, data} = useQuery(GET_PRODUCT, {
    variables: {
      productId: _id
    }
  })
  useEffect(() => {
    AsyncStorage.getItem('access_token')
    .then((resp) => {
      setAT(resp)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [access_token])
  function convertToRupiah(angka){
    var rupiah = '';		
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }

  const getGender = (selectedgender) => {
    setGender(selectedgender)
  }

  const renderMan = () => {
    if (!gender || gender==='Woman') {
      return (
        <Button mode="outlined" onPress={() => getGender('Man')} style={styles.genderBtn}>
              Man
        </Button>
      )
    } else if(gender === 'Man') {
      return (
      <Button mode="contained" onPress={() => getGender('Man')} style={styles.genderBtn}>
              Man
      </Button>
      )
    }
  }

  const renderWoman = () => {
    if (!gender || gender==='Man') {
      return (
        <Button mode="outlined" onPress={() => getGender('Woman')} style={styles.genderBtn}>
          Woman
        </Button>
      )
    } else if(gender === 'Woman') {
      return (
        <Button mode="contained" onPress={() => getGender('Woman')} style={styles.genderBtn}>
          Woman
        </Button>
      )
    }
  }

  const getSize = (selectedSize) => {
    setSize(selectedSize)
  }


  let [submitHandler, {loading : loading2, error: error2, data: data2 }] = useMutation(
    ADD_CART,
    {
      variables: {
        accessToken: access_token,
        data: {
          size: size,
          gender: gender
        },
        productId: _id
      }
    }
  )

  console.log(access_token, "<<<<<<<")

  console.log(loading2, error2, data2, "<---->")
  

  const RenderS = () => {
    if (size !== 'S'){
      return(
        <Button mode="outlined" onPress={() => getSize('S')} style={styles.genderBtn}>
          S
        </Button>
      )
    } else {
      return(
        <Button mode="contained" onPress={() => getSize('S')} style={styles.genderBtn}>
          S
        </Button>
      )
    }
  }

  const RenderM = () => {
    if (size !== 'M'){
      return(
        <Button mode="outlined" onPress={() => getSize('M')} style={styles.genderBtn}>
          M
        </Button>
      )
    } else {
      return(
        <Button mode="contained" onPress={() => getSize('M')} style={styles.genderBtn}>
          M
        </Button>
      )
    }
  }
  const RenderL = () => {
    if (size !== 'L'){
      return(
        <Button mode="outlined" onPress={() => getSize('L')} style={styles.genderBtn}>
          L
        </Button>
      )
    } else {
      return(
        <Button mode="contained" onPress={() => getSize('L')} style={styles.genderBtn}>
          L
        </Button>
      )
    }
  }

  const RenderXL = () => {
    if (size !== 'XL'){
      return(
        <Button mode="outlined" onPress={() => getSize('XL')} style={styles.genderBtn}>
          XL
        </Button>
      )
    } else {
      return(
        <Button mode="contained" onPress={() => getSize('XL')} style={styles.genderBtn}>
          XL
        </Button>
      )
    }
  }

  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white', 
    padding: 20, 
    zIndex: 10000000,
    borderRadius: 12,
    margin: 10,

  };
  let pressed = () => {
    submitHandler()
    showModal()
    
  }
  return(
    <View style={styles.container}>

      {
        loading? <Text>Loading</Text> : <View style={styles.DetailProd}>
        <Image source={{ uri: data.GetOneProduct.imgUrl}} style={styles.thumbnailImage}/>
        <Title>{data.GetOneProduct.productName}</Title>
        <Text>Vendor: {data.GetOneProduct.Owner.name}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.prodPrice}>{convertToRupiah(data.GetOneProduct.price)}</Text>
        </View>

    </View>
      }
      <View style={styles.forCart}>
        <View>
          <Text style={styles.cartIn}>Pilih Jenis Kelamin</Text>
          <View style={styles.genderBtns}>
            {renderMan()}
            {renderWoman()}
          </View>
        </View>

        <View>
          <Text style={styles.cartIn}>Pilih Ukuran</Text>
          <View style={styles.genderBtns}>

            {RenderS()}
            {RenderM()}
            {RenderL()}
            {RenderXL()}
          </View>
        </View>
        <Provider style={styles.forProvide}>
        
         
          <Button mode="contained" onPress={pressed} style={styles.addCart}>
            + ADD To CART
          </Button>
          <Portal style={styles.popUp}>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View>

                  <Title style={{zIndex: 10000}}>Added Product To Cart.</Title>
                </View>
              </Modal>
          </Portal>
        </Provider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
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
  DetailProd: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'blue',
    width: windowWidth,
    padding: 10
  },
  titleProduct: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 5,
    shadowColor: 'white',
    elevation: 10,
  },
  thumbnailImage: {
    width: windowWidth/1,
    height: windowHeight/2.5,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10
  },

  priceTag: {
    backgroundColor: "#F59E0B",
    padding: 5,
    borderRadius: 12

  },
  prodPrice: {
    fontWeight: 'bold',
    color: '#FEF2F2'
  },
  forCart: {
    height: windowHeight/3,
    width: windowWidth,
    backgroundColor: '#BFDBFE',
    borderRadius: 12,
    padding: 20
  },
  cartIn: {
    fontWeight: 'bold',
    color: '#164E63'
  },
  genderBtns: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: -1
  },
  genderBtn: {
    marginRight: 10,
    marginVertical: 10,
    zIndex: -1
  },
  addCart: {
    marginTop: 30

  },
  forProvide: {
    position: 'relative'
  },
  popUp: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    left: 0
  }

  
})

export default DetailScreen