import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  name: String,
  carbvalue: Number,
  quantityvalue: Number,
  unity: String,
  type: String,
  userid: String,
});
