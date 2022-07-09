import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getPokeByName} from '../../redux/actions';
import "./SearchBar.css"

function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e) {
      
           e.preventDefault();
           setName(e.target.value);
       
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getPokeByName(name.toLocaleLowerCase()));
        setName("");
        }

        
    

     return (
        <div>
            <input
                id = "inputName"
                type = "text"
                placeholder = "Search..."
                onChange={(e) => handleInput(e)}
                />
                <button 
                    className='buttonSearch'
                    type = "submit"
                    onClick={(e) => handleSubmit(e)}
                    >
                        Search
                    </button>
        </div>
     )
}

export default SearchBar