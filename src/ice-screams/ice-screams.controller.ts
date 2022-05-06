import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<IceScreamDto> {
    const iceScream = await this.iceScreamService.getById(id);
    if (!iceScream)
      throw new NotFoundException(`IceScream with id ${id} not found`);

    return iceScream;
  }
}
