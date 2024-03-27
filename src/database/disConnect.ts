import * as process from 'process';
import mongoose from "mongoose";
import config from "config";


async function dbDisconnect() : Promise<void>{

    const uri: string = config.get("mongoUri")

    try {

        await mongoose.disconnect();

        console.log("Successfully disconnected");
        
    } catch (error) {

        console.error(error)
        process.exit(1)
    }
}


export default dbDisconnect;