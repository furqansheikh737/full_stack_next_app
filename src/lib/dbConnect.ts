import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connect to database");
        return
    }

    try {
       const db = await mongoose.connect(process.env.MONGODB_URL || "", {});
       
       connection.isConnected = db.connections[0].readyState
       console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connected failed", error);

        process.exit(1)
    }
}

export default dbConnect;