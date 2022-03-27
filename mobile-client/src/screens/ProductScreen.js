import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme } from 'react-native-paper';

const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);
function ProductScreen({navigation}){
  const LogOutHandler = (e) => {
    e.preventDefault()
    console.log("LOGGED OUT")
    navigation.navigate('Login')

  }
  return(
    <View style={styles.container}>
      <Text>PRODUCT</Text>
      <Button onPress={LogOutHandler}>LOGOUT</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})

export default ProductScreen