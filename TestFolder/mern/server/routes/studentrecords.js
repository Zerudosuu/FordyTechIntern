import express from "express";
import connectToDB from "../db/connection"; //! this will help us to connect with database
import { ObjectId } from "mongodb"; //! this will help us to convert string to object id

// this is an instance of the express router that we use to define the routes
// this router will be added as the middleware and will take care of the requestss starting from wth the path /studentrecords
const router = express.Router();

// this section will get all the list of students since its the first path ."/"
// the router requires 3 parameters to be passed to the router function howewer the reques and the response are needed to get the data
router.get("/", async (req, res) => {
  let collection = await db.collection("students");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//this section get the all the details on the specified student and retun the results
router.get("/:id", async (req, res) => {
  let collection = await db.collection("students");
  let query = { _id: ObjectId(req.params.id) };
  let results = await collection.findOne(query);

  if (!results) results.send("No record found").status(404);
  else res.send(results).status(200);
});

// this section POST request mearning that it will add record to the collection. it requires a body to be provided to the collection.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
    };
    let collection = await db.collection("students");
    let results = await collection.insertOne(newDocument);
    res.send(results).status(204);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Adding Student");
  }
});
// the Patch request is when you are updateing a student record along with the data similar to the variables on the collections
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
      },
    };

    let collection = await db.collection("students");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating student");
  }
});

// to delete a record from the database
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection("students");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
