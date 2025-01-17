import { IsString } from 'class-validator';
export class CreateProblemCategoryDto {
  @IsString({ message: 'Informe um nome válido' })
  name: string;
  @IsString({ message: 'Informe uma descrição válida' })
  description: string;
  problem_types_ids: string[];
}
