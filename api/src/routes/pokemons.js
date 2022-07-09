const { Router } = require("express");


const router = Router();

const {
  postPoke,
  getPoke,
  getPokeId,
  deletePoke,
} = require("../controllers/pokemon")


router.get("/", getPoke);

router.get("/:idPoke", getPokeId);

router.post("/", postPoke);

router.delete("/", deletePoke)

module.exports = router;
