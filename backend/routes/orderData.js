const express = require("express");
const router = express.Router();
const order = require("../models/ordersModel");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.unshift({ order_date: req.body.order_date });
  let eId = await order.findOne({ email: req.body.email });

  if (eId == null) {
    try {
      await order
        .create({
          email: req.body.email,
          order_data: [data],
        })
        .then((result) => {
          res.status(200).send({ success: true });
        });
    } catch (error) {
      res.status(500).send("Error in server", error.message);
      console.log(error.message);
    }
  } else {
    try {
      await order
        .findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data } }
        )
        .then(() => {
          res.status(200).send({ success: true });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error in server", error.message);
    }
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in server", error.message);
  }
});

module.exports = router;
