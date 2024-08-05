import { MongoClient } from 'mongodb';

export const client = new MongoClient('mongodb://localhost:27017');
export const database = client.db(process.env.MONGODB_DB);

await client.connect();
