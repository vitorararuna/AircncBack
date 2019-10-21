import React, {useEffect, useState, useMemo} from 'react'; //useEffect é uma função que recebe uma outra função e um array de dependencias. Esse array quando alterado algum valor, a função é chamada denovo. Se eu passar um array vazio, a função é executada uma unica só vez. O useEffect é muito usado vamos fazer um busca inicial de dados da nossa api
import api from '../../services/api';
import {Link} from 'react-router-dom'; // esse link é para a gente não precisar ficar faendo aquele histroy e então mudar de rota diretamente
import socketio from 'socket.io-client'; 
import './styles.css'

export default function Dashboard(){

    const [spots, setSpots] =  useState([]); // nesse tive que colocar "[]" pois spots é um vetor
    const [requests, setRequests] = useState([]); //onde eu vou armazenar cada uma das solicitações de reserva


    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }, // Então na conexão que eu faço com o meu servidor na parte do websocket, estou enviando tbm o nosso id do usuario
    }),[user_id]); // isso é o suficiente para ele se conectar com o nosso backend. E eu só vou refazer a conexão do usuário com o nosso socket  , caso o nosso user_id seja alterado 

    useEffect(()=>{
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    },[requests, socket]);

    useEffect(()=>{

        async function loadSpots(){
            const user_id = localStorage.getItem('user');//lá no meu insomnia, quando eu chamo a rota dashboard, eu preciso passar o id do usuário logado, para ele retornar os spots somente daquele usuário. por isso o localstorage
            const response = await api.get('/dashboard', { headers: {user_id} }); 

            setSpots(response.data);  
        }
        loadSpots();
    },[]);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`); //depois de aprovar essa solicitação, devo remover ela da minha lista:
        setRequests(requests.filter(request => request._id !== id)); // removendo a requisição que acabei de aprovar
    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                       <p>
                         <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data:<strong>{request.date}</strong>
                       </p>     
                         <button className="acept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                         <button className="reject"onClick={() => handleReject(request._id)}>REJEITAR</button>   
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot =>(
                   <li key={spot._id}>
                       <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                       <strong>{spot.company}</strong>
                       <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span> 
                   </li> 
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>



        </>
    )
}