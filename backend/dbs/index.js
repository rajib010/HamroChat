import mongoose from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL
const mongoDbName = process.env.MONGODB_NAME

const dbConnection = async function(){
    try {
        const response = await mongoose.connect(`${mongoDbUrl}/${mongoDbName}`);
        if(response){
            console.log("DB connection successfull");
        }
    } catch (error) {
        console.log("Error in db Connection", error);
    }
}

export default dbConnection