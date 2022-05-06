import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get()
  search(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('terms') terms: string,
  ): Promise<IceScreamDto[]> {
    return this.iceScreamService.search({
      terms,
      offset,
      limit,
    });
  }
}
