import express from "express";
import { getTableData, getTables } from "../controllers/tableController.js";

const router = express.Router();

router.get("/", getTables);
router.get("/:tableName", getTableData);

export default router;
