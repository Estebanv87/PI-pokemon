const { Router } = require("express");

const router = Router();

const { saveAllTypes } = require("../controllers/type");

router.get("/", saveAllTypes);


module.exports = router;
