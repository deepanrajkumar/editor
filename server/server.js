const { MongoClient } = require("mongodb");

const cors = require("cors");

var express = require("express");
var app = express();
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "editor";

// Use connect method to connect to the server
const connectDB = async (action, params) => {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("editorCollection");

  params = [{ note: "test my note data" }];

  switch (action) {
    case "get":
      return await collection.find({}).toArray();
    case "add":
      return await collection.insertMany([{ note: "test my note data" }]);
    default:
      break;
  }

  client.close();
};

app.listen(5000);

app.get("/list", cors(), (req, res) => {
  connectDB("get")
    .then((data) => res.end(JSON.stringify(data)))
    .catch((error) => res.end(JSON.stringify(error)));
});

app.get("/add", cors(), (req, res) => {
  connectDB("add")
    .then((data) => res.end(JSON.stringify(data)))
    .catch((error) => res.end(JSON.stringify(error)));
});

// app.post("/delete", function (req, res) {
//   res.end(JSON.stringify(data));
// });

// const getList = (collection) => {
//   const notes = collection.find({}).toArray();
//   console.log(`notes`, notes);
//   return "get done.";
// };

// const insertResult = collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   const collection = db.collection("editorCollection");

//   // the following code examples can be pasted here...
//   const insertResult = await collection.insertMany([
//     { a: 1 },
//     { a: 2 },
//     { a: 3 },
//   ]);
//   console.log("Inserted documents =>", insertResult);

//   const filteredDocs = await collection.find({ a: 3 }).toArray();
//   console.log("Found documents filtered by { a: 3 } =>", filteredDocs);

//   const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
//   console.log("Updated documents =>", updateResult);

//   const deleteResult = await collection.deleteMany({ a: 3 });
//   console.log("Deleted documents =>", deleteResult);

//   const indexName = await collection.createIndex({ a: 1 });
//   console.log("index name =", indexName);

//   return "done.";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
