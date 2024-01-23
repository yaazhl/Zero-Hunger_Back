const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const { json } = require("express");
const mongoClient = mongodb.MongoClient;
const app = express();
const URL =
    "mongodb+srv://kat369:Kathiravan1995@project-m-tool.xjuxrpd.mongodb.net/?retryWrites=true&w=majority";
const DB = "Zero-Hunger";



app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.post("/create", async function (req, res) {
    console.log(req.body)
    try {
        const connection = await mongoClient.connect(URL);

        const db = connection.db(DB);

        const project = await db.collection("food").insertOne(req.body)

        await connection.close();

        res.json(project.insertedId)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "try again later" });
    }
});



app.get("/all", async function (req, res) {
    console.log(req.body)
    try {
        const connection = await mongoClient.connect(URL);

        const db = connection.db(DB);

        const users = await db.collection("food").find().toArray()

        await connection.close();

        res.json(users)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "try again later" });
    }
});




app.get("/", async function (req, res) {
    try {
        res.json("Hello World...");
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "try again later" });
    }
});

app.listen(process.env.PORT || 3100);
