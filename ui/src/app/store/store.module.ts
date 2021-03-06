import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@app/environment';
import { UserFacade, UserState } from '@app/store/user';
import { GroupFacade, GroupState } from '@app/store/group';
import { TagFacade, TagState } from '@app/store/tag';
import { NoteFacade, NoteState } from '@app/store/note';
import { NoteMenuFacade, NoteMenuState } from '@app/store/ui/note-menu';
import { DashboardFacade, DashboardState } from '@app/store/dashboard';

@NgModule({
  providers: [
    UserFacade,
    GroupFacade,
    TagFacade,
    NoteFacade,
    NoteMenuFacade,
    DashboardFacade,
  ],
  imports: [
    NgxsModule.forRoot([
        UserState,
        GroupState,
        TagState,
        NoteState,
        NoteMenuState,
        DashboardState,
      ],
      {
        developmentMode: !environment.production,
      }),
  ],
})
export class StoreModule {
}
