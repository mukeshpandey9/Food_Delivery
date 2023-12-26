const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

// Cart

router.post("/mycart", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
