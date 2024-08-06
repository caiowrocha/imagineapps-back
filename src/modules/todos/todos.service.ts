import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodosEntity } from 'src/modules/todos/entities/todos.entity';
import { Todo } from 'src/modules/todos/interfaces/todo.interface';
import { UpdateTodoDto } from 'src/modules/todos/dto/update-todo.dto';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodosEntity)
    private todosRepository: Repository<TodosEntity>,
  ) {}

  async findAllTodos(titleOrDescription?: string): Promise<TodosEntity[]> {
    return await this.todosRepository.find({
		order: {
			id: 'DESC'
		}
	});
  }

  async createTodo(data: CreateTodoDto): Promise<CreateTodoDto> {
    try {
      const entity = Object.assign(new TodosEntity(), data);
      return await this.todosRepository.save(entity);
    } catch (error) {
	  console.log(error);
      throw new HttpException(
        {
          message: 'Não foi possível criar o Todo.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findTodoById(id: number): Promise<TodosEntity> {
	try {
		const todo = await this.todosRepository.findOneBy({
			id: id
		});

		if(!todo) {
			throw new NotFoundException('Desculpe, esse Todo não foi encontrado.');
		}
		return todo;
	}
	catch (error) {
		console.log(error)
		throw new HttpException(
		  {
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			error:
			  'Desculpe, tivemos um erro interno.',
		  },
		  HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}
  }

  async updateTodo(id: number, updateTodo: UpdateTodoDto): Promise<TodosEntity> {
		let existingTodo = await this.findTodoById(id);

		existingTodo = Object.assign(existingTodo, updateTodo);

		await this.todosRepository.save(existingTodo);

		return existingTodo;
  }

  async deleteTodo(id: number): Promise<TodosEntity> {
	const existingTodo = await this.findTodoById(id);
	return await this.todosRepository.remove(existingTodo);
  }
}
