import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

export default function EditImg({ history }) {
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
            <button type="submit" className='btn'>Editar</button>            
            <Link to='/dashboard'>
                <span className='cancelspan'> Cancelar </span>
            </Link>
        </form>
    )
}