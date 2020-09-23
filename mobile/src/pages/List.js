import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, View, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity, Text } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.15.159:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                console.log(booking);
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    function handleLogout(){
        AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    };

    function handleNavigate() {
        navigation.navigate('MyBookings');
    };


    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic"> 
            <SafeAreaView styles={styles.container}>
                <Image style={styles.logo} source={logo} />

                
                    {techs.map(tech => <SpotList key={tech} tech={tech} />)}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPress={handleNavigate} style={styles.button}>
                            <Text style={styles.buttonText}>Visualizar reservas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogout} style={styles.button}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
            

            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30,
    },

    button: {
        height: 42,
        backgroundColor: '#6e6e6e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        width: '40%',
    },
    
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonGroup:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});