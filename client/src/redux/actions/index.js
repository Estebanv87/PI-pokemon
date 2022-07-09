import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKE_BY_NAME,
  GET_POKE_TYPES,
  GET_DETAILS,
  ALPHABETIC_ORDER,
  FILTER_BY_ORIGIN,
  FILTER_BY_ATTACK,
  FILTER_BY_TYPE,
  ERROR,
  CLEAR_HOME,
  CLEAR_DETAIL,
   DELETE_POKE
} from "./actionsType";

export function getPokemons() {
  return async function (dispatch) {
    const result = await axios.get("http://localhost:3001/pokemons");
    return dispatch({ type: GET_POKEMONS, payload: result.data });
  };
}

export function getPokeByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      // console.log("JSONNNNNN", json)
      return dispatch({
        type: GET_POKE_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: ERROR,
        payload: "Not pokemon found",
      });
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypeOfPoke() {
  return async function (dispatch) {
    var types = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: GET_POKE_TYPES,
      payload: types.data,
    });
  };
}

 
export function postPokemon(payload) {
  return async function (dispatch) {
    var post = await axios.post("http://localhost:3001/pokemons", payload);
    return post;
  };
}

export function alphabeticalOrder(payload) {
  return {
    type: ALPHABETIC_ORDER,
    payload,
  };
}

export function filterByAttack(payload) {
  return {
    type: FILTER_BY_ATTACK,
    payload,
  };
}

export function filterOriginAction(filterBy) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: filterBy,
  };
}

export function filterByTypeAction(filterBy, origin) {
  return {
    type: FILTER_BY_TYPE,
    payload: { filterBy, origin },
  };
}

export function clearHome() {
  return {
    type: CLEAR_HOME,
  };
}

export function clearDetail(){
  return {
    type: CLEAR_DETAIL
  }
}

export function deletePokemon(id) {
  return async function(dispatch) {
    await axios.delete(`http://localhost:3001/pokemons?id=${id}`);
    return dispatch({
      type: DELETE_POKE,
    })
  }

}


