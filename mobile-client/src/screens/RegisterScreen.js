import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme } from 'react-native-paper';

const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);
function RegisterScreen({navigation}){
  return(
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://i.pinimg.com/736x/8e/e8/8e/8ee88e9cd048845e279f438e9f5dbaa3.jpg'}} style={styles.image}>
        <Title style={styles.titlePage}>FORM REGISTER</Title>
        <View style={styles.RegisterField}>

          <TextInput
            label="Nama Lengkap"
            style={styles.inputField}
          />

          <TextInput
            label="Email"
            style={styles.inputField}
          />

          <TextInput
            label="Password"
            style={styles.inputField}
          />

          <TextInput
            label="+62"
            style={styles.inputField}
          />

          <Button style={styles.regBtn}>
            <Text style={styles.textLog}>
              BUAT AKUN
            </Text>
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
  RegisterField: {
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight/1.6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 75,
    borderRadius: 15
  },
  inputField:{
    marginBottom: 10
  },
  regBtn: {
    backgroundColor: 'blue',
    borderRadius:5,
    padding: 5,
  },
  textLog: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
})

export default RegisterScreen