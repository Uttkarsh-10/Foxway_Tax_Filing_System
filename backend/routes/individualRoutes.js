const express = require("express");
const router = express.Router();
const controller = require("../controllers/individualController");

router.post("/calculate", controller.calculateTax);
router.get("/all", controller.getAll);
router.put("/:pan", controller.update); 
router.delete("/:pan", controller.delete);

module.exports = router;