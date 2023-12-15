import express from "express";
import upload from '../middleware/upload.js';

const router = express.Router();

import {
    getAllTables,
    getTableById,
    deleteItem,
    deleteTable,
    // editItem,
    uploadExcel,

} from "../controllers/tableController.js";


router.get('/', getAllTables);
router.get('/:id', getTableById);
router.delete('/:id', deleteTable);
router.delete('/item/:tableId/:itemId', deleteItem);
// router.put('/edit/:tableId/:itemId', editItem)
router.post('/',upload.single("excelFile"),uploadExcel);



export default router

