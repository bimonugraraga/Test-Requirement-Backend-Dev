import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions} from 'react-native'
import { TextInput, Avatar, Button, Card, Title, Paragraph, configureFonts, DefaultTheme } from 'react-native-paper';
import { useMutation, useQuery } from "@apollo/client";
import { USER_REGISTER } from '../../lib/apollo/queries/userQuery';
import { useEffect, useState, useContext } from 'react';
const windowWidth = (Dimensions.get('window').width);
const windowHeight = (Dimensions.get('window').height);

function RegisterScreen({navigation}){
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [name, setName] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  let [submitHandler = () => {}, { loading, error, data }] = useMutation(
    USER_REGISTER,
    {
      variables: {
        data: {
          name: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber

        }
      },
    }
  );
  
  if (data) {
    if (data.RegisterUser.message.match('Has Been Registered!')){
      navigation.navigate("Login");
    } else {
      console.log(data.RegisterUser.message)
    }
  }
  return(
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://i.pinimg.com/736x/8e/e8/8e/8ee88e9cd048845e279f438e9f5dbaa3.jpg'}} style={styles.image}>
        <Title style={styles.titlePage}>FORM REGISTER</Title>
        <View style={styles.RegisterField}>

          <TextInput
            label="Nama Lengkap"
            style={styles.inputField}
            onChangeText={(newText) => setName(newText)} 
          />

          <TextInput
            label="Email"
            style={styles.inputField}
            onChangeText={(newText) => setEmail(newText)} 
          />

          <TextInput
            label="Password"
            style={styles.inputField}
            onChangeText={(newText) => setPassword(newText)} 
          />

          <TextInput
            label="+62"
            style={styles.inputField}
            onChangeText={(newText) => setPhoneNumber(newText)} 
          />

          <Button style={styles.regBtn} onPress={submitHandler}>
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