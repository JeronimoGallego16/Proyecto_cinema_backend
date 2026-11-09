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
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() dto: CreateMovieDto): Promise<MovieResponseDto> {
    return this.moviesService.create(dto);
  }

  @Get('reports/oldest')
  getOldest(): Promise<MovieResponseDto> {
    return this.moviesService.getOldest();
  }

  @Get('reports/most-screenings')
  getWithMostScreenings(): Promise<MovieResponseDto> {
    return this.moviesService.getWithMostScreenings();
  }

  @Get()
  findAll(): Promise<MovieResponseDto[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MovieResponseDto> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieResponseDto> {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.moviesService.remove(id);
  }
}
