import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProblemCategoryService } from './problem-category.service';
import { CreateProblemCategoryDto } from './dto/create-problem-category.dto';
import { UpdateProblemCategoryDto } from './dto/update-problem-category.dto';
import { ProblemCategory } from './entities/problem-category.entity';
import { ReturnProblemCategoryDto } from './dto/return-problem-category.dto';

@Controller('problem-category')
export class ProblemCategoryController {
  constructor(
    private readonly problemCategoryService: ProblemCategoryService,
  ) {}

  @Post()
  async createProblemCategory(
    @Body() createProblemCategoryDto: CreateProblemCategoryDto,
  ): Promise<ProblemCategory> {
    const problemCategory =
      await this.problemCategoryService.createProblemCategory(
        createProblemCategoryDto,
      );
    return problemCategory;
  }

  @Get()
  async findProblemCategories(): Promise<ProblemCategory[]> {
    const problemCategory = this.problemCategoryService.findProblemCategories();
    return problemCategory;
  }

  @Get(':id')
  async findProblemCategory(
    @Param('id') id: string,
  ): Promise<ReturnProblemCategoryDto> {
    const problemCategory =
      await this.problemCategoryService.findProblemCategoryById(id);
    return {
      problemCategory,
      message: 'Categoria de problema encontrada',
    };
  }

  @Put(':id')
  async updateProblemCategory(
    @Param('id') id: string,
    @Body() updateProblemCategoryDto: UpdateProblemCategoryDto,
  ) {
    return this.problemCategoryService.updateProblemCategory(
      id,
      updateProblemCategoryDto,
    );
  }

  @Delete(':id')
  async deleteProblemCategory(@Param('id') id: string) {
    await this.problemCategoryService.deleteProblemCategory(id);
    return {
      message: 'Categoria de problema excluída com sucesso',
    };
  }
}