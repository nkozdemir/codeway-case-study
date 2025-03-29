import express from "express";
import cors from "cors";
import configRoutes from "./routes/configRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Default endpoint for the root "/"
app.get("/", (req, res) => {
    res.send("API is running");
});  

app.use("/api", configRoutes);

export default app;
