const {getAllPoke} = require("./utils");
const {Pokemon, Type} = require("../db");

const getPoke = async (req, res) => {
    const { name } = req.query;
  try {
    let totalPoke = await getAllPoke();
    //console.log('TOTAL POKEEEEEEEE', totalPoke)
    if (name) {
      let pokeByName = totalPoke.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      pokeByName.length
        ? res.status(200).json(pokeByName)
        : res.status(404).send("Doen´t exist pokemos with that name");
    } else {
      res.status(200).json(totalPoke);
    }
  } catch (error) {
    res.status(400).send("Error");
    console.log(error);
  }
}

const getPokeId = async (req, res) => {
    const { idPoke } = req.params;
  try {
    let totalPokeId = await getAllPoke();
    //console.log('TOTALLL', totalPokeId)
    if (idPoke) {
      let pokeById = await totalPokeId.filter((e) => idPoke == e.id);
      pokeById.length > 0
        ? res.status(200).json(pokeById)
        : res.status(404).send("No existe pokemon con ese id");
    } else {
      res.status(400).send("No id");
    }
  } catch (error) {
    console.log(error);
  }
}

const postPoke = async (req, res) => {
    try {
        const {
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          type,
          img,
          createdInDb,
        } = req.body;
    
        let pokeCreate = await Pokemon.create({
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          img,
          createdInDb,
        });
    
        type.forEach(async (e) => {
          let typeDb = await Type.findAll({
            where: { name: e },
          });
          await pokeCreate.addType(typeDb);
        });
    
        res.status(200).json(pokeCreate);
      } catch (error) {
        console.log(error);
        res.status(404).send("Cannot create the pokemon");
      }
}

const deletePoke = async (req, res) => {
  const {id} = req.query
  try {
    let pokeFound = await Pokemon.findOne({
      where: {id : id}
    })
    await pokeFound.destroy()
    res.status(200).send("Pokemon Delete")
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getPoke,
    getPokeId,
    postPoke,
    deletePoke
}