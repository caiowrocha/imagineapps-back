import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodosEntity } from "src/modules/todos/entities/todos.entity";
import { TodoController } from "src/modules/todos/todos.controller";
import { TodoService } from "src/modules/todos/todos.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([TodosEntity])
	],
	controllers: [TodoController],
	providers: [TodoService],
	exports: [TodoService, TypeOrmModule.forFeature([TodosEntity])]
})
export class TodoModule {}