import * as process from 'process';
import mongoose from "mongoose";
import config from "config";


async function dbConnect() : Promise<void>{

    const uri: string = config.get("mongoUri")

    try {

        await mongoose.connect(uri);

        console.log("Successfully Connected");
        
    } catch (error) {

        console.error(error)
        process.exit(1)
    }
}


export default dbConnect;