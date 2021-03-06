import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TagColorDto, TagDto } from '@app/models';
import { TagActions } from '@app/store/tag/state/tag.actions';
import { TagsService } from '@app/shared/components/tags/tags.service';
import { switchMap, tap } from 'rxjs/operators';

export interface TagStateModel {
  items: TagDto[];
  colors: TagColorDto[];
}

const defaults = {
  items: [],
  colors: [],
};

@State<TagStateModel>({
  name: 'tag',
  defaults,
})
@Injectable()
export class TagState {

  @Selector()
  static state(state: TagStateModel) {
    return state;
  }

  @Selector()
  static tags(state: TagStateModel) {
    return state.items;
  }

  constructor(
    private tags: TagsService,
  ) {
  }

  @Action(TagActions.Create)
  add({dispatch}: StateContext<TagStateModel>, {payload}: TagActions.Create) {
    return this.tags.create(payload).pipe(
      switchMap(() => dispatch(TagActions.GetAll)),
    );
  }

  @Action(TagActions.Delete)
  delete({dispatch}: StateContext<TagStateModel>, {payload}: TagActions.Delete) {
    return this.tags.delete(payload).pipe(
      switchMap(() => dispatch(TagActions.GetAll)),
    );
  }

  @Action(TagActions.Update)
  update({dispatch}: StateContext<TagStateModel>, {payload}: TagActions.Update) {
    const {id, name} = payload;
    return this.tags.update(id, {name}).pipe(
      switchMap(() => dispatch(TagActions.GetAll)),
    );
  }

  @Action(TagActions.GetAll)
  getAll({setState, getState}: StateContext<TagStateModel>) {
    return this.tags.getAll().pipe(
      tap((tags) => {
        const state = getState();
        setState({...state, items: [...tags]});
      }),
    );
  }

  @Action(TagActions.GetColors)
  getColors({setState, getState}: StateContext<TagStateModel>) {
    return this.tags.getColors().pipe(
      tap((colors) => {
        const state = getState();
        setState({...state, colors: [...colors]});
      })
    )
  }
}
