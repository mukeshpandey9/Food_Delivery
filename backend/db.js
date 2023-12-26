const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, options)
    .then(async () => {
      console.log(
        `MongoDB Connected  Sucessfully to :-  ${mongoose.connection.host}`
      );

      const fetched_data = await mongoose.connection.db.collection("food");
      fetched_data
        .find({})
        .toArray()
        .then(async (data) => {
          const foodCategory = await mongoose.connection.db.collection(
            "food-category"
          );

          foodCategory
            .find({})
            .toArray()
            .then((catdata) => {
              global.food_items = data;
              global.foodCategory = catdata;
            });
        });
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
    });
};

module.exports = connectDB;
