import { IngredientDto } from '../ingredients/ingredients.dto';

export class IceScreamDto {
  id: number;
  name: string;
  ingredients: IngredientDto[];
}

export class InsertIceScreamDto {
  name: string;
  ingredients: number[];
}
