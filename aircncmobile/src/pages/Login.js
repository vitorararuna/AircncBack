import React, {useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, AsyncStorage} from 'react-native'; //KeyboardAvoidingView serve para quando formos digitar alguma coisa no ios, o teclado não sobrepor o conteudo do aplicativo. E o platform serve para informar qual plataforma vai obter essa funcionalidade (ios ou android).... o asyncStorage é como o localstorage da nossa aplicação web

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) { //o navigation é como o history na nossa aplicação web

  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => { //se eu encontrar um usuário, vou jogar ele para essa variável "user" do then. Se existir alguma coisa nessa variável, eu mando ele direto pra página de list
      if(user){
        navigation.navigate('List');
      }
    })
  },[]);


  async function handleSubmit(){
    const response = await api.post('/sessions', {
      email
    })

    const { _id } = response.data;
 
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');

  }


  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior='padding' style={styles.container}>
      <Image source={logo}/>
      <View style={styles.form}>
            <Text style={styles.label}>SEU E-MAIL *</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none" //para não passar nenhuma letra caixa alta
                autoCorrect={false} //para ele não tentar corrigir o email ou qqr caractere
                value={email}
                onChangeText={setEmail} // = onChangeText={text => setEmail(text)} O onChangeText recebe diretamente o texto que o usuário digitou dentro do input 
            />

            <Text style={styles.label}>TECNOLOGIAS</Text>
            <TextInput
                style={styles.input}
                placeholder="Tecnologias de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words" //vai botar as palavras com letras maiusculas
                autoCorrect={false} //para ele não tentar corrigir o email ou qqr caractere
                value={techs}
                onChangeText={setTechs} 
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar Spots</Text>
            </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      marginBottom: 20,
      borderRadius: 2
  },

  button: {
      height: 42,
      backgroundColor: '#f05a5b',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:2,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },


});
