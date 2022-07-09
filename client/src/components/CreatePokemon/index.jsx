import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypeOfPoke } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {validate} from './validate'
import './CreatePokemon.css'

function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.type);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    img: "",
    id: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
  });


  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckBox(e) {
    const clicked = types
      .filter((d) => e.target.value === d.name)
      .map((d) => d.name);
    if (e.target.checked) {
      setInput({
        ...input,
        type: [...input.type, ...clicked],
      });
      setErrors(
         validate({
            ...input,
            type: [...input.type, ...clicked]
         })
      );
    } else {
      setInput({
        ...input,
        type: input.type.filter((e) => e !== clicked[0]),
      });
      setErrors(
         validate({
            ...input,
            type: input.type.filter((e) => e !== clicked[0]),
         })
      );

    }
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(postPokemon(input));
   
    setInput({
      name: "",
      img: "",
      id: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      type: [],
    });
    alert("New Pokemon Created");

    history.push("/home");
  }

  useEffect(() => {
   dispatch(getTypeOfPoke());
  }, [dispatch])


  return (
      <div className="formContainer">
         <h1 className="title_create">Create Pokemon</h1>
         <form onSubmit={(e) => handleSubmit(e)}>
            <div className="inputs">
               <div>
                  <label>NAME: </label>
                  <input
                     type ="text"
                     value = {input.name}
                     placeholder={`Pokemon's Name`}
                     name ="name"
                     onChange={(e) => handleInput(e)}
                 />
                 {errors.name ? <h5>{errors.name}</h5> : null}
               </div>
               <div>
                  <label>IMG: </label>
                  <input
                     type = "url"
                     value = {input.img}
                     placeholder={`Pokemon's Image`}
                     name = "img"
                     onChange={(e) => handleInput(e)}
                     />
               </div>
               <div>
               <label>HP: </label>
                  <input
                     type = "number"
                     value = {input.hp}
                     placeholder = {`Pokemon's Hp`}
                     name = "hp"
                     onChange={(e) => handleInput(e)}
                     />
                     {errors.hp ? <h5>{errors.hp}</h5> : null}
               </div>
               <div>
               <label>ATTACK: </label>
                  <input
                     type = "number"
                     value = {input.attack}
                     placeholder = {`Pokemon's Attack`}
                     name = "attack"
                     onChange={(e) => handleInput(e)}
                     />
                     {errors.attack ? <h5>{errors.attack}</h5> : null}
               </div>
               <div>
               <label>DEFENSE: </label>
                  <input
                     type = "number"
                     value = {input.defense}
                     placeholder = {`Pokemon's Defense`}
                     name = "defense"
                     onChange={(e) => handleInput(e)}
                     />
                     {errors.defense ? <h5>{errors.defense}</h5> : null}
               </div>
               <div>
               <label>SPEED: </label>
                  <input
                     type = "number"
                     value = {input.speed}
                     placeholder = {`Pokemon's Speed`}
                     name = "speed"
                     onChange={(e) => handleInput(e)}
                     />
                     {errors.speed ? <h5>{errors.speed}</h5> : null}
               </div>
               <div>
               <label>HEIGHT: </label>
                  <input
                     type = "number"
                     value = {input.height}
                     placeholder = {`Pokemon's Height`}
                     name = "height"
                     onChange={(e) => handleInput(e)}
                     />
                     {errors.height ? <h5>{errors.height}</h5> : null}
               </div>
               <div>
               <label>WEIGHT: </label>
                  <input
                     type = "number"
                     value = {input.weight}
                     placeholder = {`Pokemon's Weight`}
                     name = "weight"
                     onChange={(e) => handleInput(e)}
                     />
                     {errors.weight ? <h5>{errors.weight}</h5> : null}
               </div>
               <div className="tipoDePoke">
                  <div>
                     <div className="error_type">
                  {errors.type ? <h5>{errors.type}</h5> : null}

                     </div>
                     <label>TIPOS: </label>
                     <div className="opciones">
                        {types.map((e) => (
                           <div className="box">
                              <input 
                                 className="box2"
                                 type = "checkbox"
                                 value = {e.name}
                                 name = {e.name}
                                 onChange  = {(e) => handleCheckBox(e)}
                                 />
                                 <h3>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</h3> 
                                 
                           </div>
                        ))}
                        
                     </div>
                  </div>
               </div>

               {errors.name || errors.hp || errors.attack || errors.defense || errors.speed || errors.height ||
               errors.weight || errors.type  ? (
                  <button className="createButton2" select disabled type = "submit">
                     Create Pokemon
                  </button>
               ) : (
                  <button className="createButton" type = "submit">
                     Create Pokemon
                  </button>
               )}
            </div>
         </form>
         <div className="returnButton">
            <Link to = "/home">
               <p>Back Home</p>
            </Link>
         </div>
      </div>
  )
}
export default CreatePokemon;
