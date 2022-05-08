const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middel aware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vmjei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const servicecollection = client.db("data").collection("servic");

    app.get("/data", async (req, res) => {
      const query = {};
      const cursor = servicecollection.find(query);
      const service = await cursor.toArray();
      res.send(service);
    });

    app.get("/data/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await servicecollection.findOne(query);
      res.send(service);
    });

    app.post("/data", async (req, res) => {
      const newData = req.body;
      const result = await servicecollection.insertOne(newData);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("BOOK INVENTORY CRUD IS RUNNING");
});
app.listen(port, () => {
  console.log("LISTING CRUD IS RUNNING", port);
});
