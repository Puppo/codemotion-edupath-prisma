import { Body, Controller, Post } from '@nestjs/common';
import { IceScreamDto, InsertIceScreamDto } from './ice-screams.dto';
import { IceScreamsService } from './ice-screams.service';

@Controller('ice-screams')
export class IceScreamsController {
  constructor(private readonly iceScreamService: IceScreamsService) {}

  @Post()
  insert(@Body() body: InsertIceScreamDto): Promise<IceScreamDto> {
    const { name, ingredients } = body;
    return this.iceScreamService.insert(name, ingredients);
  }
}
