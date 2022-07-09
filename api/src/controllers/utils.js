const axios = require("axios");
const {Pokemon, Type} = require("../db");

const getApiInfo = async () => {
    try {
      const apiUrl = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=24"
      );
      //console.log('APIIIURL', apiUrl)
      const apiData = await apiUrl.data.results.map(async (el) => {
        // console.log(el)
        const pokeUrl = (await axios.get(el.url)).data;
        // console.log('POKE URLLLL',  pokeUrl)
        //console.log('SOY LA INFO DE LA API',pokeUrl.sprites)
        //console.log('SOY LA INFO DE LA API',pokeUrl.types)
  
        return {
          id: pokeUrl.id,
          img: pokeUrl.sprites.other.dream_world.front_default,
          name: el.name,
          type: pokeUrl.types.map((e) => e.type.name),
          hp: pokeUrl.stats[0].base_stat,
          attack: pokeUrl.stats[1].base_stat,
          defense: pokeUrl.stats[2].base_stat,
          speed: pokeUrl.stats[5].base_stat,
          height: pokeUrl.height,
          weight: pokeUrl.weight,
        };
      });
  
      const mainInfo = await Promise.all(apiData);
      // console.log('DATAAAAAA', apiData)
      // console.log('MAIN INFO', mainInfo)
  
      return mainInfo;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getDbInfo = async () => {
    try {
      let dbPoke = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
  
      return dbPoke.map((e) => {
        return {
          id: e.id,
          img: e.img,
          name: e.name,
          type: e.types.map((e) => e.name),
          hp: e.hp,
          attack: e.attack,
          defense: e.defense,
          speed: e.speed,
          height: e.height,
          weight: e.weight,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const getAllPoke = async () => {
    try {
      const apiPoke = await getApiInfo();
      const dbPoke = await getDbInfo();
      const infoTotal = dbPoke.concat(apiPoke);
      //console.log('INFOOOO', infoTotal)
      return infoTotal;
    } catch (error) {
      console.log(error);
    }
  };

const getTypes = async() => {
    
    try {
      const info = await axios.get('https://pokeapi.co/api/v2/type');
      const pokeTypes = info.data.results.map(e => e.name)
  
      pokeTypes.forEach((el) => {
          Type.findOrCreate({
              where: {name: el}
          })
      })
  
      const allTypes = await Type.findAll();
     // console.log(allTypes)
      return allTypes
  } catch (error) {
      console.log(error)
  }

}

  module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPoke,
    getTypes

  }