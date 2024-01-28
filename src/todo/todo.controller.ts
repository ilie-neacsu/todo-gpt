import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoItem } from './entities/todo-item.entity';

@Controller('todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body('description') description: string): Promise<TodoItem> {
    return this.todoService.create(description);
  }

  @Get()
  async findAll(): Promise<TodoItem[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TodoItem> {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('description') description: string
  ): Promise<TodoItem> {
    return this.todoService.update(id, description);
  }

  @Patch(':id/done')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAsCompleted(@Param('id') id: number): Promise<void> {
    await this.todoService.markAsCompleted(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.todoService.remove(id);
  }

}
