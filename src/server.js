import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import orderRoutes from "./routes/orderRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

//routes
app.get("/", (req, res) => {
  res.send("Server ready");
});
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/tables", tableRoutes);

//test db connection
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    //sync with db
    await sequelize.sync();
    console.log("Database synchronized");

    //server start
    app.listen(port, () => {
      console.log(`Serve at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDb();
