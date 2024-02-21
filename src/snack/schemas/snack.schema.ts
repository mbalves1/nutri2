import * as mongoose from 'mongoose';

export const SnackSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: String,
  ingredients: Object,
});
