import { MongoClient } from 'mongodb';

export const client = new MongoClient('mongodb://localhost:27017');
export const database = client.db('myDatabase');

await client.connect();
