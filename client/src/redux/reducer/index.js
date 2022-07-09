import {
  GET_POKEMONS,
  GET_POKE_BY_NAME,
  GET_POKE_TYPES,
  GET_DETAILS,
  ALPHABETIC_ORDER,
  FILTER_BY_ORIGIN,
  FILTER_BY_TYPE,
  FILTER_BY_ATTACK,
  ERROR,
  CLEAR_HOME,
  CLEAR_DETAIL,
  DELETE_POKE
} from "../actions/actionsType";

const initialState = {
  pokemons: [],
  allPoke: [],
  type: [],
  details: [],
  pokeDB: [],
  pokeApi: [],
  error: "",
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
        allPoke: payload,
        pokeDB: payload.filter((el) => typeof el.id === "string"),
        pokeApi: payload.filter((el) => typeof el.id === "number"),
        error: "",
      };

    case GET_POKE_BY_NAME:
      return {
        ...state,
        pokemons: payload,
        error: "",
      };

    case GET_POKE_TYPES:
      return {
        ...state,
        type: payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: payload,
      };

    case ALPHABETIC_ORDER:
      let alphabeticalOrder =
        payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });

      return {
        ...state,
        pokemons: alphabeticalOrder,
      };

    case FILTER_BY_ATTACK:
      let attackOrder =
        payload === "stronger"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) return -1;
              if (b.attack > a.attack) return 1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) return 1;
              if (b.attack > a.attack) return -1;
              return 0;
            });

      return {
        ...state,
        pokemons: attackOrder,
      };

    case FILTER_BY_ORIGIN:
      const filterPoke = (filterBy, array) => {
        switch (filterBy) {
          case "FromApi":
            return array.filter((poke) => typeof poke.id === "number");

          case "FromDataBase":
            return array.filter((poke) => typeof poke.id === "string");

          case "All":
            return state.allPoke;

          default:
            return array;
        }
      };

      return {
        ...state,
        pokemons: filterPoke(payload, state.allPoke),
      };

    case FILTER_BY_TYPE:
      const filterByType = (type, array) => {
        return array.filter((poke) => poke.type.find((e) => e.includes(type)));
      };

      if (payload.filterBy === "All" && payload.origin === "FromApi")
        return {
          ...state,
          pokemons: state.pokeApi,
        };

      if (payload.filterBy === "All" && payload.origin === "FromDataBase")
        return {
          ...state,
          pokemons: state.pokeDB,
        };

      return {
        ...state,
        pokemons: filterByType(
          payload.filterBy,
          payload["origin"] === "FromApi"
            ? state.pokeApi
            : payload["origin"] === "FromDataBase"
            ? state.pokeDB
            : state.allPoke
        ),
      };
    case ERROR:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_HOME:
      return {
        ...state,
        pokemons: [],
        allPoke: []
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        details: []
      }

    case DELETE_POKE:
      return {
        ...state
      }

    default:
      return state;
  }
}
