import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';
import { render } from '@testing-library/react';

export default function Edit({ history }) {
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [previewThumbnail, setPreviewThumbnail] = useState(null);
    const { id } = useParams();
    const [changeImage, setChangeImage] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    function handleChangeImage(i) {
        setChangeImage(i);
    };

    useEffect(() => {
        async function loadSpot(id) {
            const response = await api.get('/spots/' + id, {});
            setCompany(response.data.company);
            setAddress(response.data.address);
            setTechs(response.data.techs);
            setPrice(response.data.price);
            setThumbnail(response.thumbnail);
            setPreviewThumbnail(response.data.thumbnail_url);
            console.log(response.data);
        }

        loadSpot(id);
        //array vazio indica que só irá fazer a busca uma vez 
    }, []);

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const spot_id = id;

        if(!thumbnail) {
            data.append('thumbnail', thumbnail);
        };
        data.append('company', company);
        data.append('address', address);
        data.append('techs', techs);
        data.append('price', price);
        data.append('spotid', spot_id);

        await api.patch('/spots/', data, {});

        history.push('/dashboard');
    }

    function Image() { 
        const change = changeImage;
 
        if (change) {
            return <div><label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
            <img src={camera} alt="Select img"/>
            </label>
            <button onClick={() => handleChangeImage(false)}>Cancelar edição</button>
            </div>;
        } else {
            return <div><img src={`${previewThumbnail}`} />
            <button onClick={() => handleChangeImage(true)}>Editar imagem</button>
            </div>
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <Image />
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
            <button type="submit" className='btn'>Editar</button>
            
            <Link to='/dashboard'>
                <span className='cancelspan'> Cancelar </span>
            </Link>
        </form>
    )
}