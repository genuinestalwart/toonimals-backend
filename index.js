const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

app.get("/", (req, res) => {
	res.redirect("https://toonimals-frontend.vercel.app/");
});

const run = async () => {
	try {
		// await client.connect();
		const animalsColl = client.db("ToonimalsDB").collection("animals");
		const categoriesColl = client
			.db("ToonimalsDB")
			.collection("categories");

		//

		app.get("/categories", async (req, res) => {
			const result = await categoriesColl.find().toArray();
			res.send(result);
		});

		app.post("/categories", async (req, res) => {
			const result = await categoriesColl.insertOne(req.body);
			res.send(result);
		});

		app.get("/animals", async (req, res) => {
			const { category } = req.query;

			const query = category
				? { category: { $regex: category, $options: "i" } }
				: {};

			const result = await animalsColl.find(query).toArray();
			res.send(result);
		});

		app.post("/animals", async (req, res) => {
			const result = await animalsColl.insertOne(req.body);
			res.send(result);
		});
	} finally {
		// await client.close();
	}
};

run();

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
