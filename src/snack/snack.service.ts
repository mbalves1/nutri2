import { Injectable } from '@nestjs/common';
import { CreateSnackDto } from './dto/create-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SnackEntity } from './entities/snack.entity';
import { IngredientEntity } from '../ingredients/entities/ingredient.entity';

@Injectable()
export class SnackService {
  constructor(
    @InjectModel('Snack') private readonly snackModel: Model<SnackEntity>,

    @InjectModel('Ingredient')
    private readonly ingredientModel: Model<IngredientEntity>,
  ) {}

  async create(createSnackDto: CreateSnackDto) {
    const ingredientIds = createSnackDto.ingredients.map(
      (ingredient) => ingredient._id,
    );

    const findByIdIngredients = await this.ingredientModel
      .find()
      .where('_id', ingredientIds)
      .exec();

    console.log(findByIdIngredients);

    const createSnack = await new this.snackModel({
      ...createSnackDto,
      ingredients: findByIdIngredients,
    });

    return createSnack.save();
  }

  async findAll() {
    return await this.snackModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} snack`;
  }

  update(id: number, updateSnackDto: UpdateSnackDto) {
    return `This action updates a #${id} snack`;
  }

  remove(id: number) {
    return `This action removes a #${id} snack`;
  }
}
