import { IsNotEmpty } from 'class-validator';

export class IngredientDto {
  id: number;
  name: string;
}

export class InsertIngredientDto {
  @IsNotEmpty()
  name: string;
}
