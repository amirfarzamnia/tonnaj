import { MongoClient } from 'mongodb';

export const client = new MongoClient(process.env.MONGODB_URI);
export const database = client.db(process.env.MONGODB_DB);

await client.connect();
