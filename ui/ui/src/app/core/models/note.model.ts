import { TagDto } from './tag.model';

export interface NoteDto {
  id: number;
  groupId: number;
  title: string;
  description?: string;

  checked: boolean;

  createAt: string;
  updateAt: string;

  tags: TagDto[];
  todos: TodoDto[];
}

export interface TodoDto {
  id: number;
  checked: boolean;
  noteId: number;
  title: string;
  order?: number;
}

export interface UpdateOrderDto {
  entityId: number;
  order: number;
}

export interface NoteCreateDto {
  groupId?: number;
  title: string;
  description?: string;
}

export interface TodoCreateDto {
  title: string;
}
