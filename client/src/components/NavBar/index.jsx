import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar';
import "./NavBar.css"

function NavBar() {
    function handleClick(e) {
        window.location.reload();
    }


     return (
        <div className='navbar'>
            <div>
                <Link to = '/pokemon'>
                    <button className='navbar_button1'>Create Pokemon</button>
                </Link>
            </div>
            <div>
                <button
                    className='navbar_button2'
                    onClick={(e) => {handleClick(e)}}>
                        Refresh Pokemons
                    </button>
            </div>
            <div className='navbar_searchbar'>
                <SearchBar/>
            </div>
        </div>
     )
}

export default NavBar