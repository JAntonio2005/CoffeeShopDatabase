import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "cafe_central";

let client;
let database;

export async function getDb() {
  if (database) {
    return database;
  }

  client = new MongoClient(uri);
  await client.connect();
  database = client.db(dbName);
  return database;
}

export async function closeDb() {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
}
