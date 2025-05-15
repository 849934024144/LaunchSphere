import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { strict } from 'assert';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// File path fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve uploads folder

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema & Model
const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: String,
  photo: String,
});

const User = mongoose.model("User", userSchema);

// Multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio || '',
      photo: user.photo || '',
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update Profile
// Update Profile Route
app.put("/api/user/:id", upload.single('photo'), async (req, res) => {
  try {
    const { name, email, bio } = req.body || {};
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

    if (!name && !email && !bio && !photo) {
      return res.status(400).json({ error: "At least one field is required to update" });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (bio) updateFields.bio = bio;
    if (photo) updateFields.photo = photo;

    // Use custom 'id' instead of default '_id'
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      { $set: updateFields },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get User by ID (with ObjectId validation)
app.get("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Google Auth Save
app.post("/api/google-auth", async (req, res) => {
  try {
    const { id, name, email } = req.body || {};
    if (!id || !name || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ id, name, email, password: "" });
      await user.save();
    }

    res.status(200).json({ message: "Google user saved successfully" });
  } catch (err) {
    console.error("Google Auth error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//store messages in a collection
const messageSchema = new mongoose.Schema({
  sender: {
    id: String,         // optional: user's ID
    name: String,       // optional: user's name
    photo: String,      // optional: user's photo URL
  },        // optional: user's name or ID
  content: String,       // the message text
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);


const wss = new WebSocketServer({ server }); // ← attach to the same server

wss.on('connection', (ws, req) => {
  console.log('✅ WebSocket CONNECTED');

  // ws.on('message', async (message) => {
  //   const msg = message.toString();
  //   console.log('📨 Message received:', message.toString());

  //     // 1. Save to MongoDB
  // await Message.create({
  //   sender: id, // or pass a user ID if available
  //   content: msg,
  // });
  //   // Broadcast message to all connected clients
  //   wss.clients.forEach((client) => {
  //     if (client.readyState === ws.OPEN) {
  //       client.send(message.toString());
  //     }
  //   });
  // });
   // Extract user ID and name from query parameters
  ws.on('message', async (message) => {
    
    const { senderId,senderName ,content } = JSON.parse(message);
  
    console.log('📨 Message from', senderId, ':', content);
  
    // Save to MongoDB
    await Message.create({
      sender: {name:senderId.name,
        id: senderId.id,
        photo: senderId.photo, // optional: user's photo URL
      },
      content: content,
    });
  
    // Broadcast to other clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          sender: {
            id: senderId,
            name: senderName,
            photo: senderPhoto,
          },
          content: msg,
          timestamp: new Date(),
        }));
      }
    });
    
  });
  
  app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(100);
    res.json(messages);
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  ws.on('close', () => {
    console.log('🔌 WebSocket disconnected');
  });
});




// Start Server
server.listen(port, () => {
  console.log(`🚀 Server + WebSocket running on http://localhost:${port}`);
});
