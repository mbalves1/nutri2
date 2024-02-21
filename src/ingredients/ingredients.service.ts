import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IngredientEntity } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel('Ingredient')
    private readonly ingredientModel: Model<IngredientEntity>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const ingredient = new this.ingredientModel(createIngredientDto);
    return await ingredient.save();
  }

  async findAll(userid: string) {
    console.log(userid);
    return await this.ingredientModel
      .find({
        userid: userid,
      })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
