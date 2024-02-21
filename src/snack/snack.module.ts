import { Module } from '@nestjs/common';
import { SnackService } from './snack.service';
import { SnackController } from './snack.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SnackSchema } from './schemas/snack.schema';
import { IngredientSchema } from '../ingredients/schemas/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Snack', schema: SnackSchema },
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
  ],
  controllers: [SnackController],
  providers: [SnackService],
})
export class SnackModule {}
