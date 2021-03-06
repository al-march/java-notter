import { NoteDto } from './note.model';

export interface GroupCreateDto {
  title: string;
  dashboardId?: number;
  description?: string;
}

export interface GroupDto {
  id: number;
  dashboardId: number;
  title: string;
  description?: string;

  createdAt: string;
  updatedAt: string;

  notes: NoteDto[];
  noteCount?: number;
}
