import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
function RegisterScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Register</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default RegisterScreen