import mongoose from "mongoose";
require("dotenv").config();

export default async function connectMongo() {
  try {
    const result = await mongoose.connect(`${process.env.MONGO_URI}`, {});

    if (result) {
      console.log("Connected with MongoDB");
    }
  } catch (error) {
    console.log("Some error occured");
    console.log(error);
  }
}
