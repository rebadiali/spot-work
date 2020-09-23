import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';


import back from '../../assets/back.png';
import './styles.css';


export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    const user_id = localStorage.getItem('user');

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/bookings', {
                headers: { user_id }, 
                params: { type: 'spot' },
            });

            setBookings(response.data);
        }

        loadSpots();
        //array vazio indica que só irá fazer a busca uma vez 
    }, []);

    return (
        <div className='new-content'>
            <h2>Reservas</h2>
            <table class="table"> 
                <thead>
                    <tr> 
                        <th scope="col">ID da Reserva</th>
                        <th scope="col">Email do Cliente</th>
                        <th scope="col">Empresa</th>
                        <th scope="col">Data</th>
                        <th scope="col">Status</th>
                    </tr> 
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id }>
                            <td> <strong>{ booking._id }</strong> </td>
                            <td> { booking.user.email } </td>
                            <td> { booking.spot.company } </td>
                            <td> { booking.date} </td>
                            <td> { booking.approved ? "Aprovada":"Rejeitada" } </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to='/dashboard'>
                <span className='btn btn-light mt-3'> Voltar </span>
            </Link>
        </div>
    ) 
}