import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";

const instantiateMongoClient = async () => {
  dotenv.config();
  console.log(process.env.DB_CONN_STRING);

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING ?? ""
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const collection: mongoDB.Collection = db.collection(
    process.env.DB_COLLECTION_NAME ?? ""
  );

  return collection;
};

export { instantiateMongoClient };
