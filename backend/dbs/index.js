import mongoose from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL

const dbConnection = async function () {
    try {
        await mongoose.connect(`${mongoDbUrl}`);
        console.log("DB connection successfull");
    } catch (error) {
        console.log("Error in db Connection", error);
    }
}

export default dbConnection