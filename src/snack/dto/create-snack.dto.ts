import { IngredientEntity } from '../../ingredients/entities/ingredient.entity';

export class CreateSnackDto {
  createdAt: Date;
  type: string;
  ingredients: IngredientEntity[];
}
