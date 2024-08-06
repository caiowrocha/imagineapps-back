import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosEntity } from 'src/modules/todos/entities/todos.entity';
import { TodoModule } from 'src/modules/todos/todos.module';

@Module({
  imports: [TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'database',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'imagineapps_database',
	entities: [TodosEntity],
	synchronize: true,
  }), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
