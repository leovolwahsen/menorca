import { MongoClient, Db, Collection, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@menorca.pan9r.mongodb.net/?retryWrites=true&w=majority&appName=menorca`
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
});

export let db: Db;
export let attendeeCollections: Collection;
export let authenticationCollections: Collection;

export async function connectToDatabase(): Promise<void> {
    try {
        await client.connect();
        db = client.db("menorca");

        attendeeCollections = db.collection("attendees");
        authenticationCollections = db.collection("authentication");

        console.log("Connected to MongoDB and initialised collections");
    } catch(error) {
        console.error("Failed to connect to MongoDB: ", error);
        throw error
    }
}