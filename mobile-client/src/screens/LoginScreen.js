import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme } from 'react-native-paper';
const LeftContent = props => <Avatar.Icon {...props}  />
const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);
function LoginScreen({navigation}){
  const toRegister = (e) => {
    e.preventDefault()
    navigation.navigate('Register')
  }
  return(
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://i.pinimg.com/736x/8e/e8/8e/8ee88e9cd048845e279f438e9f5dbaa3.jpg'}} style={styles.image}>
        <Title style={styles.titlePage}>FORM LOGIN</Title>
        <View style={styles.LoginField}>

          <TextInput
            label="Email"
            style={styles.inputField}
          />

          <TextInput
            label="Password"
            style={styles.inputField}
          />

          <Button style={styles.loginBtn}>
            <Text style={styles.textLog}>
              MASUK
            </Text>
          </Button>

          <Button 
            variant='link'
            onPress={toRegister}
            style={styles.textLog}>
            BUAT AKUN
          </Button>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 150
  },
  LoginField: {
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight/1.8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 100,
    borderRadius: 15
  },
  inputField:{
    marginBottom: 10
  },
  loginBtn: {
    backgroundColor: 'blue',
    borderRadius:5,
    padding: 5,
  },
  textLog: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  forRegister: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})

export default LoginScreen