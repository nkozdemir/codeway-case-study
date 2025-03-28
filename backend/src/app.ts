import express from "express";
import cors from "cors";
import configRoutes from "./routes/configRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", configRoutes);

export default app;
