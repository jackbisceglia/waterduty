require('dotenv').config()
const mongoDB = require('mongodb');

const insertDocument = async (order) => {
  const client= new mongoDB.MongoClient(
    process.env.DB_CONN_STRING ?? ""
  );

  await client.connect();

  const db = client.db(process.env.DB_NAME);

  const collection = db.collection(
    process.env.DB_COLLECTION_NAME ?? ""
  );

  const makeArr = () => order.map((name, idx) => ({name: name, position: idx + 1}))
  
  await collection.insertMany(makeArr());
  client.close()
};

const deleteDocument = async () => {

  const client= new mongoDB.MongoClient(
    process.env.DB_CONN_STRING ?? ""
  );

  await client.connect();

  const db = client.db(process.env.DB_NAME);

  const collection = db.collection(
    process.env.DB_COLLECTION_NAME ?? ""
  );

  await collection.deleteMany({});

  client.close()
}

const main = () => {
  // deleteDocument()
  insertDocument(["jack", "jason", "joe", "kyle"])
}

main();
