import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly search: string;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly category: any = [];

  @ApiPropertyOptional({})
  @IsOptional()
  readonly minPrice: number;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly maxPrice: number;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly location: string;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly minBuilt: number;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly maxBuilt: number;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly minLength: number;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly maxLength: number;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly minBeam: number;

  @ApiPropertyOptional({})
  @IsOptional()
  readonly maxBeam: number;

  @ApiPropertyOptional({})
  @IsString()
  readonly sort: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}