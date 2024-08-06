import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({
    message: 'O título é obrigatório.',
  })
  @IsString()
  title: string;

  @IsNotEmpty({
    message: 'A descrição é obrigatória.',
  })
  @IsString()
  description: string;

  @IsNotEmpty({
    message: 'O deadline é obrigatório.',
  })
  @IsDateString()
  deadline: Date;
}
