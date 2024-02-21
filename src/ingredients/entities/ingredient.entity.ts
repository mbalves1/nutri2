import { Document } from 'mongoose';

export class IngredientEntity extends Document {
  name: string;
  carbvalue: number;
  quantityvalue: number;
  unity: string;
  type: string;
  userid: string;
}
