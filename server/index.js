//as we added type:module, it follow import syntax
//else it uses 'require'

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("You are in dalle clone app");
});

const startServer = async () => {
  try {
    connectToDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("server has started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
