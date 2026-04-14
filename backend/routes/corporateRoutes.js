const express = require("express");
const router = express.Router();
const controller = require("../controllers/corporateController");

router.post("/calculate", controller.calculateTax);
router.get("/all", controller.getAll);
router.put("/:cin", controller.update);
router.delete("/:cin", controller.delete);

module.exports = router;