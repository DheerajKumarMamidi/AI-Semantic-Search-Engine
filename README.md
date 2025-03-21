
# 🚀 AI-Powered Semantic Search Engine

## 🌟 Introduction
The **AI-Powered Semantic Search Engine** is a full-stack application that uses **Node.js**, **MongoDB**, and **Xenova/multi-qa-MiniLM-L6-cos-v1** to perform contextual search.  
Instead of traditional keyword-based search, it utilizes **vector embeddings** and **cosine similarity** to find the most relevant results.

---

## 🔧 Features
- **User Management:** Add, delete, and retrieve user profiles stored in MongoDB.  
- **Vector Embeddings:** Generate vector representations of bios using the **Xenova** transformer model.  
- **Semantic Search:** Perform contextual search by comparing the query vector with stored user vectors.  
- **Cosine Similarity:** Rank users by the similarity score.  
- **Postman Integration:** Easily test the API endpoints using **Postman**.  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Vector Embedding Model:** Xenova/multi-qa-MiniLM-L6-cos-v1  
- **API Testing:** Postman  

---

## 🚀 Prerequisites
Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org)  
- [MongoDB](https://www.mongodb.com/try/download/community)  
- Postman (optional for testing APIs)

---

## 📥 Installation

### 1️⃣ Clone the repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Install Xenova for embedding generation
```bash
npm install @xenova/transformers
```

### 4️⃣ Set up MongoDB
- **Local MongoDB**
```bash
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
```
- **MongoDB Atlas (Cloud)**  
    - Create a new cluster  
    - Replace the connection string in `index.js` with your Atlas connection URL  

---

## ⚙️ Running the Application

### 1️⃣ Start MongoDB
If using local MongoDB:
```bash
mongod --dbpath <your-database-path>
```

### 2️⃣ Start the server
```bash
node index.js
```

✅ You should see:
```
Server running on port 3000
```

---

## 🔥 API Endpoints

### ✅ Add Users
- **Endpoint:** `POST http://localhost:3000/add-users`
- **Request Body:**
```json
{
    "users": [
        {
            "name": "Alice",
            "email": "alice@example.com",
            "bio": "AI researcher specializing in deep learning and NLP."
        }
    ]
}
```
- **Response:**
```json
{
    "message": "Users added successfully"
}
```

---

### ✅ Get All Users
- **Endpoint:** `GET http://localhost:3000/users`
- **Response Example:**
```json
{
    "totalUsers": 2,
    "users": [
        {
            "name": "Alice",
            "email": "alice@example.com",
            "bio": "AI researcher specializing in deep learning and NLP."
        }
    ]
}
```

---

### ✅ Delete All Users
- **Endpoint:** `DELETE http://localhost:3000/users`
- **Response:**
```json
{
    "message": "All users deleted successfully",
    "deletedCount": 10
}
```

---

### ✅ Search for Users
- **Endpoint:** `POST http://localhost:3000/search`
- **Request Body:**
```json
{
    "query": "natural language processing"
}
```
- **Response Example:**
```json
[
    {
        "name": "Alice",
        "email": "alice@example.com",
        "bio": "AI researcher specializing in deep learning and NLP.",
        "similarity": 0.6275
    }
]
```

---

## 🛠️ Running in Postman
Use **Postman** to test the API endpoints:

1. **Create a new request**  
2. Use the API URLs listed above.  
3. Add the appropriate request body (for `POST` endpoints).  
4. Send the request and verify the response.  

---

## 📚 Key Concepts Explained

### 🔥 **MongoDB**
- The database used for storing user information and vector embeddings.  
- You can either use a **local MongoDB** instance or connect to a **MongoDB Atlas** cluster.  

### 🔥 **Xenova/multi-qa-MiniLM-L6-cos-v1**
- This is the pre-trained model used for text embeddings.  
- It converts text into a **vector representation** that captures its contextual meaning.  

### 🔥 **Cosine Similarity**
- The search uses **cosine similarity** to measure how similar the query embedding is to the user bios' embeddings.  
- Higher similarity scores indicate closer matches.  

---

## 🎯 Troubleshooting

### 1️⃣ MongoDB not starting
- Ensure the MongoDB service is running:
```bash
sudo systemctl start mongod
```
- Check the MongoDB logs:
```bash
sudo journalctl -u mongod
```

### 2️⃣ Port conflict
- If you see a port conflict, modify the server port in `index.js`:
```javascript
const PORT = 3001;
```
- Restart the server:
```bash
node index.js
```

---

## 🌟 Contributing
Feel free to contribute to this project by submitting **pull requests** or reporting issues.  

---

## 💡 License
This project is licensed under the **MIT License**.  

---

## 📚 GitHub Repository
You can access the complete source code for this project on GitHub:  
[AI-Semantic-Search-Engine](https://github.com/DheerajKumarMamidi/AI-Semantic-Search-Engine)
