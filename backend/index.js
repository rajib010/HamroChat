import dotenv from "dotenv"
import dbConnection from "./dbs/index.js"
import app from "./app.js"
import {server} from "./socket/socket.js"

dotenv.config({
    path: "../.env"
})
const PORT = process.env.PORT || 8500


dbConnection()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
        })
    })
    .catch((e) => {
        console.log("MongoDb Connection failed");
        process.exit(1)
    })

