import { Body, Controller, Post } from '@nestjs/common';
import { IngredientDto, InsertIngredientDto } from './ingredients.dto';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  insert(@Body() body: InsertIngredientDto): Promise<IngredientDto> {
    const { name } = body;
    return this.ingredientsService.insert(name);
  }
}
