import sequelize from "../config/database.js";

export const getTables = async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query("SHOW TABLES");
    const tables = results.map((table) => Object.values(table)[0]);
    res.json({ tables });
  } catch (error) {
    console.log("Error fetching tables", error);
    res.status(500).json({ error: "Unable to fetch tables" });
  }
};

export const getTableData = async (req, res) => {
  const { tableName } = req.params;

  try {
    //validate table name
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
      return res.status(400).json({ error: "Invalid table name" });
    }

    //take all data from table to show
    const [results] = await sequelize.query(`SELECT * FROM ${tableName}`);
    res.json({ data: results });
  } catch (error) {
    console.log("Error fetching data", error);
    res.status(500).json({ error: "Unable to fetch table data" });
  }
};
