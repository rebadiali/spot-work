import React,  { useState, useEffect } from 'react';
import { Image, View, ScrollView, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, AsyncStorage, Text } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function MyBookings({ navigation }) {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        async function loadBookings(){
            const user_id = await AsyncStorage.getItem('user');
            const response = await api.get('/bookings', {
                headers: { user_id }, 
                params: { type: 'book' },
            })

            setBookings(response.data);
        }

        loadBookings();
    }, []);
    
    function handleNavigate() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                <FlatList 
                    style={styles.list}
                    data={bookings}
                    keyExtractor={booking => booking._id}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Image style={styles.thumbnail} source={{ uri: item.spot.thumbnail_url.replace("localhost","192.168.15.159") }}/>
                            <Text style={styles.company}>{item.spot.company}</Text>
                            <Text style={styles.techs}>{ item.spot.techs.toString() }</Text>
                            <Text style={styles.date}>Reservado para: </Text>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.textBooking}>{ item.approved ? "Reservada":"Rejeitada" }</Text>

                        </View>
                    )}
                />
            </ScrollView>

            <TouchableOpacity onPress={handleNavigate} style={styles.buttonBack}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50,
        flex: 1,
    },
    
    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 30,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonBack: {
        marginTop: 10,
        height: 42,
        backgroundColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    textBooking:{
        color: '#999',
        fontWeight: 'bold',
        fontSize: 18,
        height: 42,
    },

    thumbnail: {
        width:200,
        height:120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {  
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    techs: {
        fontSize: 15,
        fontWeight: '100',
        color: '#999',
    },

    date: {
        fontSize: 15,
        fontWeight: '100',
        color: '#999',
    },

});