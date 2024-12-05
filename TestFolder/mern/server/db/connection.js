import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_DB_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("students"); // Replace 'students' with your database name
      console.log("Connected to the database");
    } catch (e) {
      console.error("Failed to connect to the database", e);
      throw e;
    }
  }
  return db;
}

export default connectToDB;
