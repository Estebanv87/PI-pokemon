import React from 'react';
import {Link} from 'react-router-dom'
import './Card.css'

function Card({name, img, type, id }) {
   const upperName = name.charAt(0).toUpperCase() + name.slice(1);
   const upperType = type.charAt(0).toUpperCase() + type.slice(1)
     return (
        <div className='card'>
         <div className='card_info'>
            <h3>{upperName}</h3>
         </div>
         <div className='card_info2'>
            <h4>Types: {upperType}</h4>
         </div>
         <div className='card_img'>
            <img src={img} alt = 'img not found' width = '300px' height = '200px' />
         </div>
         <Link to = {`/pokemons/${id}`}>
            <button className='card_button'>Detail</button>
         </Link>
        </div>
     )
}

export default Card