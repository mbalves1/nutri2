import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    private readonly ingredientsService: IngredientsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createIngredientDto: CreateIngredientDto,
    @Req() request: Request,
  ) {
    const user = this.getUserIdFromToken(request);
    const ingredient = { ...createIngredientDto, userid: user };
    return this.ingredientsService.create(ingredient);
  }

  getUserIdFromToken(request: Request): string | null {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtService.verify(token) as {
      id: string;
    };

    if (!decodedToken || !decodedToken.id) {
      return null;
    }

    return decodedToken.id;
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() request: Request) {
    const userId = this.getUserIdFromToken(request);
    if (!userId) {
      return;
    }
    const ingredients = await this.ingredientsService.findAll(userId);
    return ingredients;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientsService.remove(+id);
  }
}
