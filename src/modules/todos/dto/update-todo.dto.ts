import { IsDate, IsDateString, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'O título é obrigatório.',
  })
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'A descrição é obrigatória.',
  })
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'O deadline é obrigatório.',
  })
  @IsDateString()
  deadline: Date;
}