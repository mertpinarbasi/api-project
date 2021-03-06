const mongoose = require("mongoose");
const connectDB = async () => {
  const connect = await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(`MongoDB Connected : ${connect.connection.host}`);
};
module.exports = connectDB;
