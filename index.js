import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { pipeline } from "@xenova/transformers";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = "mongodb://localhost:27017"; // Update if needed
const DB_NAME = "testDB";
const COLLECTION_NAME = "users";

const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db(DB_NAME);
const usersCollection = db.collection(COLLECTION_NAME);

// Load embedding model
const generateEmbedding = await pipeline("feature-extraction", "Xenova/multi-qa-MiniLM-L6-cos-v1");

// API to get all users in DB
app.get("/users", async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json({totalUsers: users.length,users});
  } catch (error) {
	  console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to delete all users in DB
app.delete("/users", async (req, res) => {
    try {
        const result = await usersCollection.deleteMany({});
        res.json({ message: "All users deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API to insert users
app.post("/add-users", async (req, res) => {
    try {
        const users = req.body.users; // Expecting an array of users [{name, email, bio}]
        
        if (!users || !Array.isArray(users)) {
            return res.status(400).json({ error: "Invalid users data" });
        }

        // Generate embeddings for each user
        for (let user of users) {
            const embeddingTensor = await generateEmbedding(user.bio, { pooling: "mean", normalize: true });
            user.embedding = Array.from(embeddingTensor.data); // Convert tensor to array
        }

        // Insert into MongoDB
        await usersCollection.insertMany(users);
        res.json({ message: "Users added successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to search users
app.post("/search", async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        // Generate embedding for query
        const queryEmbeddingTensor = await generateEmbedding(query, { pooling: "mean", normalize: true });
        const queryEmbedding = Array.from(queryEmbeddingTensor.data);

        // Find the closest user using cosine similarity
        const users = await usersCollection.find().toArray();
        
	const results = users.map((user) => ({
            ...user,
            similarity: cosineSimilarity(queryEmbedding, user.embedding),
        }));
	
	const THRESHOLD = 0.3; // Adjust as needed

	const filteredResults = results
   		.filter(user => user.similarity >= THRESHOLD)  // Remove low similarity results
    		.sort((a, b) => b.similarity - a.similarity)   // Sort by relevance
    		.slice(0, 5);  // Keep only top 5

res.json(filteredResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Compute similarity (cosine similarity)
        function cosineSimilarity(vec1, vec2) {
            const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
            const magnitudeA = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
            const magnitudeB = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
            return dotProduct / (magnitudeA * magnitudeB);
        }

// Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});

