import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { ScreeningResponseDto } from './dto/screening-response.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { ScreeningsService } from './screenings.service';

@Controller('screenings')
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Post()
  create(@Body() dto: CreateScreeningDto): Promise<ScreeningResponseDto> {
    return this.screeningsService.create(dto);
  }

  @Get('reports/next-three')
  getNextThree(): Promise<ScreeningResponseDto[]> {
    return this.screeningsService.getNextThree();
  }

  @Get()
  findAll(): Promise<ScreeningResponseDto[]> {
    return this.screeningsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ScreeningResponseDto> {
    return this.screeningsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateScreeningDto,
  ): Promise<ScreeningResponseDto> {
    return this.screeningsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.screeningsService.remove(id);
  }
}
