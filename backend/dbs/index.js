import mongoose from "mongoose";
import { dbName } from "../constants.js";

const mongoDbUrl = process.env.MONGODB_URL

const dbConnection = async function () {
    try {
        await mongoose.connect(`${mongoDbUrl}/${dbName}`);
        console.log("DB connection successfull");
    } catch (error) {
        console.log("Error in db Connection", error);
    }
}

export default dbConnection