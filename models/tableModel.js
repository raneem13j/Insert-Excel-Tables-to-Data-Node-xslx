import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tableSchema = new Schema(
  {
    data: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
 
  );
  
const Table = model("Table", tableSchema);
export default Table;
