import { Body, Controller, Post, Get, Param, Delete, Patch, ParseIntPipe } from "@nestjs/common";
import { CreateTodoDto } from "src/modules/todos/dto/create-todo.dto";
import { UpdateTodoDto } from "src/modules/todos/dto/update-todo.dto";
import { TodoService } from "src/modules/todos/todos.service";

@Controller('todos')
export class TodoController {
	constructor(private todoService: TodoService) {}

	@Post()
	async createTodo(@Body() data: CreateTodoDto): Promise<any> {
		try {
			await this.todoService.createTodo(data);
			return {
				sucess: true,
				message: 'Todo criado com sucesso'
			};
		} catch (error) {
			return {
				success: false,
				message: error.message
			}
		}
	}

	@Get()
	async findAllTodos() {
		try {
			const data = await this.todoService.findAllTodos();
			return data;
		} catch (error) {
			return {
				sucess: false,
				message: error.message
			}
		}
	}

	@Get(':id')
	async findOneTodo(@Param('id') id: string | number) {
		try {
			const todo = await this.todoService.findTodoById(+id);
			return todo;
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: error.message,
			  };
		}
	}

	@Delete(':id')
	async deleteOneTodo(@Param('id') id: string | number) {
		try {
			await this.todoService.deleteTodo(+id);
			return {
				sucess: true,
				message: 'Todo deletado com sucesso.'
			}
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: error.message,
			  };
		}
	}

	@Patch(':id')
	async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
		try {
			await this.todoService.updateTodo(id, updateTodoDto);
			return {
				sucess: true,
				message: 'Todo atualizado com sucesso.'
			}
		} catch(error) {
			console.log(error);
			return {
				success: false,
				message: error.message,
			  };
		}
	}
}