import Table from "../models/tableModel.js";
import XLSX from "xlsx";

export const getAllTables = async (req, res) => {
  try {
  
    const table = await Table.find();

    if (!table) {
      return res.status(404).json({ error: "Tables not found" });
    }

    res.status(200).json(table);
  } catch (error) {
    console.error("Error getting table by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findOne({ _id: id });

    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.status(200).json(table.data);
  } catch (error) {
    console.error("Error getting table by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    const newTable = new Table({
      data,
    });

    await newTable.save();

    res
      .status(201)
      .json({ message: "Excel data inserted successfully", newTable });
  } catch (error) {
    console.error("Error uploading Excel file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTable = async (req, res) => {
  try {
    const id = req.params.id;
    await Table.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { itemId, tableId } = req.params;
    const table = await Table.findOne({ _id: tableId });

    if (!table) {
      res.status(400).json({ message: "Table not found." });
    }

    const itemIndex = table.data.findIndex(
      (item) => item.id === parseInt(itemId, 10)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found." });
    }

    table.data.splice(itemIndex, 1);
    await table.save();
    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
