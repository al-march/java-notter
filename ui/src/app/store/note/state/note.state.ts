import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { NoteDto } from '@app/models';
import { NoteActions } from '@app/store/note/state/note.actions';
import { NotesService } from '@app/notes';
import { GroupFacade } from '@app/store/group';
import { switchMap } from 'rxjs/operators';

export interface NoteStateModel {
  notes: NoteDto[];
}

const defaults = {
  notes: []
};

@State<NoteStateModel>({
  name: 'note',
  defaults
})
@Injectable()
export class NoteState {

  constructor(
    private notes: NotesService,
    private groupFacade: GroupFacade,
  ) {
  }

  @Action(NoteActions.Create)
  create({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Create) {
    return this.notes.create(payload).pipe(
      switchMap(() => this.groupFacade.getOne(payload.groupId || -1))
    );
  }

  @Action(NoteActions.Update)
  update({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Update) {
    return this.notes.update(payload).pipe(
      switchMap(() => this.groupFacade.getOne(payload.groupId || -1))
    );
  }

  @Action(NoteActions.Remove)
  remove({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Remove) {
    return this.notes.delete(payload).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.AddTodo)
  addTodo({getState, setState}: StateContext<NoteStateModel>, {payload, note}: NoteActions.AddTodo) {
    return this.notes.addTodo(payload, note).pipe(
      switchMap(() => this.groupFacade.getOne(note.groupId || -1))
    );
  }

  @Action(NoteActions.UpdateTodo)
  updateTodo({getState, setState}: StateContext<NoteStateModel>, {payload, note}: NoteActions.UpdateTodo) {
    return this.notes.updateTodo(payload, note).pipe(
      switchMap(() => this.groupFacade.getOne(note.groupId || -1))
    );
  }

  @Action(NoteActions.DeleteTodo)
  deleteTodo({getState, setState}: StateContext<NoteStateModel>, {todoId, note}: NoteActions.DeleteTodo) {
    return this.notes.deleteTodo(todoId, note).pipe(
      switchMap(() => this.groupFacade.getOne(note.groupId || -1))
    );
  }

  @Action(NoteActions.UpdateTodoOrder)
  updateTodoOrder({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.UpdateTodoOrder) {
    return this.notes.updateTodoOrder(payload);
  }

  @Action(NoteActions.UpdateNoteOrder)
  updateNoteOrder({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.UpdateNoteOrder) {
    return this.notes.updateNoteOrder(payload);
  }
}
