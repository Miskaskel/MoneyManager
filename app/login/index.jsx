import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import loginBg from './../../assets/imagens/loginbg.png';
import { useRouter, Link } from 'expo-router';
import { auth } from '../../services/firebase';
import Colors from '../../services/Colors';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();    
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {        
      if (user) {
        router.replace('');
      }
    });
    return unsubscribe;
  }, []);

  const Login = async () => {
    setLoading(true);
    try {        
      const response = await signInWithEmailAndPassword(auth, email, senha);
      const user = response.user;
      console.log('Realizou Login com', user.email);
      setLoading(false);
    } catch (error) {
      Alert.alert('Falha no Login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const Registrar = async () => {
    setLoading(true)
      try{
        const response = await createUserWithEmailAndPassword(auth, email, senha)
        .then(userCredentials =>{
          const user = userCredentials.user
          console.log(user.email)
        })
        .catch(error => alert(error.message))
        setLoading(false)
      }catch(error){
      setLoading(false)  
        Alert.alert('Falha no Registro: ' + error.message)
      }finally{
          setLoading(false)
      }
  }

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
      <LinearGradient colors={['#030649', '#8d4587']} style={styles.containerView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.innerView}>
            <Image source={loginBg} style={styles.bgImage} />
            <View style={styles.loginContainer}>
              <View style={styles.loginFormView}>
                <Text style={styles.logoText}>MoneyManager</Text>
                <TextInput
                  value={email}
                  placeholder="email"
                  placeholderTextColor="#c4c3cb"
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  value={senha}
                  placeholder="senha"
                  placeholderTextColor="#c4c3cb"
                  autoCapitalize="none"
                  onChangeText={(text) => setSenha(text)}
                  style={styles.loginFormTextInput}
                  secureTextEntry={true}
                />
                <View style={{ marginTop: 10, display:'flex', flexDirection:'row', gap:30, justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                  <View>
                    <Button
                      buttonStyle={styles.loginButton}
                      onPress={Login}
                      title="Login"
                    />
                  </View>
                  <View style={styles.floatingBtn}>
                    <Link style={{padding:5}} href={{ pathname: 'login/Registro'}}>
                      <Text style={styles.floatingBtn}>CADASTRAR</Text>
                    </Link>   
                </View>  
                </View>
                     
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  containerView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: 200,
    height: 200,
  },
  loginContainer: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginFormView: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
    color: '#fff',
  },
  loginFormTextInput: {
    height: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  floatingBtn: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 35,
    alignItems: "center",
    justifyContent: 'center',
    textAlign:'center',
    fontWeight:'500',
    color:'#fff',
    fontSize:14
  },
});

