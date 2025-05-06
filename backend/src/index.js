import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express';
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/MongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

if (process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get('/{*any}',(req, res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB()
})

