const { MongoClient } = require("mongodb");

const db = {};
const URI =
  "mongodb+srv://nhannguyenvh79:finalmindx@finalmindx.mssblqg.mongodb.net/?retryWrites=true&w=majority";

const connectToDb = () => {
  try {
    const client = new MongoClient(URI);
    client.connect(() => {
      const database = client.db("final-test-mindx3");
      db.inventories = database.collection("inventories");
      db.orders = database.collection("orders");
      db.users = database.collection("users");
    });
  } catch (error) {
    console.log("connect fails");
  }
};

module.exports = { connectToDb, db };
