import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, AsyncStorage, Text, Image, StyleSheet, ScrollView, Alert} from 'react-native'; // Troquei view por SafeAreaView, este faz com que a parte do statusbar não seja preenchida com nada
  
import logo from '../assets/logo.png';

import SpotList from '../components/SpotList'

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
             const socket = socketio('http://10.0.0.102:3333', {
                 query: { user_id }
             })
             socket.on('booking_response', booking => {
                 Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
             })
        });
    },[]);


    useEffect(()=>{
        AsyncStorage.getItem('techs').then(StoragedTechs => {
            const techsArray = StoragedTechs.split(',').map(tech => tech.trim()); //estou cortando depois da virgula com o spplit e co o map estou tirando os espaços que tem antes e depois de cada tech
            setTechs(techsArray);
        })
    },[]);

    return(<SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/> 
            
            <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}/>)}   
            </ScrollView>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    logo: {
       height:32,
       resizeMode: "contain",
       alignSelf: 'center',
       marginTop: 10,
    },
  
  
  });
  