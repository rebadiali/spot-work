import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function Edit({ history }) {
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const { spotId } = useParams();
    const [thumbnailurl, setThumbnailurl] = useState('');

    const preview = useMemo(() => {
        if(thumbnailurl && !thumbnail){
            return thumbnailurl;
        }
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail, thumbnailurl])

    useEffect(() => {
        const  loadSpots = async () =>   {
            try {
                const res = await api.get('/spots/' + spotId, {});
                const data = res.data;
    
                setCompany(data.company);
                setAddress(data.address);
                setTechs(data.techs);
                setPrice(data.price);
                setThumbnailurl(data.thumbnail_url);
    
            } catch(e) {
                console.error(e);
            }
        }

        loadSpots();
        //array vazio indica que só irá fazer a busca uma vez 
    }, []);

    async function handleSubmit(event){
        event.preventDefault();
        
        const user_id = localStorage.getItem('user');
        const data = new FormData();
        const spot_id = spotId;

        if(thumbnail) {
            data.append('thumbnail', thumbnail);
        };
        data.append('company', company);
        data.append('address', address);
        data.append('techs', techs);
        data.append('price', price);

        await api.patch('/spots/' + spot_id, data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <div div className="content">
            <form onSubmit={handleSubmit}>
                <label 
                    id="thumbnail" 
                    style={{ backgroundImage: `url(${preview})` }}
                    className={thumbnail ? 'has-thumbnail' : ''}
                >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                    <img src={camera} alt="Select img"/>
                </label>
                <label htmlFor="company">EMPRESA *</label>
                <input
                    id="company"
                    placeholder="Nome da empresa"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

                <label htmlFor="address">ENDEREÇO *</label>
                <input
                    id="address"
                    placeholder="Endereço da empresa"
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                />

                <label htmlFor="techs">FACILIDADES * <span>(separadas por vírgula)</span></label>
                <label><span>Exemplo: sala individual, café, espaço compartilhado, wifi, computador disponível, estacionamento...</span></label>
                <input
                    id="techs"
                    placeholder="Quais facilidades possuem?"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />
                
                <label htmlFor="price">VALOR DA DIÁRIA * <span>(deixe em branco para GRATUITO)</span></label>
                <input
                    id="price"
                    placeholder="Valor cobrado por dia"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />
                <button type="submit" className='btnn'>Editar</button>
                
                <Link to='/dashboard'>
                    <span className='btn btn-light mt-3'> Cancelar </span>
                </Link>
            </form>
        </div>
    )
}