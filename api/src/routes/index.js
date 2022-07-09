const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoute = require('./pokemons')
const typesRoute = require('./types')
const router = Router();

router.use('/pokemons', pokemonRoute);
router.use('/types', typesRoute);



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
