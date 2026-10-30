import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsInt()
  @Min(1)
  @Max(1000)
  capacity!: number;
}
