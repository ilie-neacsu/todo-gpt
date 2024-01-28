import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './entities/todo-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
