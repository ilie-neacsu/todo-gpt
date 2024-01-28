import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: Repository<TodoItem>,
  ) {}

  async create(description: string): Promise<TodoItem> {
    const todoItem = this.todoItemRepository
      .create({ description });
    return this.todoItemRepository.save(todoItem);
  }

  async findAll(): Promise<TodoItem[]> {
    return this.todoItemRepository.find();
  }

  async findOne(id: number): Promise<TodoItem> {
    const todoItem = await this.todoItemRepository
      .findOne({ where: { id } });
    if (!todoItem) {
      throw new NotFoundException(`Todo item with id ${id} not found`);
    }
    return todoItem;
  }

  async update(id: number, description: string): Promise<TodoItem> {
    const todoItem = await this.findOne(id); // Reuses the findOne method above
    todoItem.description = description;
    return this.todoItemRepository.save(todoItem);
  }

  async remove(id: number): Promise<void> {
    const result = await this.todoItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo item with ID ${id} not found`);
    }
  }

  async markAsCompleted(id: number): Promise<TodoItem> {
    const todoItem = await this.todoItemRepository.findOneBy({ id });
    if (!todoItem) {
      throw new NotFoundException(`Todo item with id ${id} not found`);
    }

    todoItem.done = true;
    return this.todoItemRepository.save(todoItem);
  }

}
