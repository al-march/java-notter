import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { NoteDto, TagDto } from '@app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-group-page-menu',
  templateUrl: './group-page-menu.component.html',
  styleUrls: ['./group-page-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPageMenuComponent implements OnInit, OnChanges, OnDestroy {

  @Input() note: NoteDto | null = null;
  @Input() tags: TagDto[] = [];

  @Output() onUpdateNote = new EventEmitter<NoteDto>();

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: '',
    tags: []
  });

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(1500),
      tap((data) => {
        if (this.form.valid && this.note) {
          const title: string = data.title || '';
          const description: string = data.description || '';
          const tags = this.findTags(data.tags) || [];

          const note: NoteDto = {...this.note, title, description, tags};
          this.onUpdateNote.emit(note);
        }
      })
    ).subscribe();
  }

  ngOnChanges() {
    this.updateForm();
  }

  private updateForm() {
    this.form.reset();
    this.updateControl('title', this.note?.title || '');
    this.updateControl('description', this.note?.description || '');
    this.updateControl('tags', this.note?.tags.map(t => t.id) || []);
  }

  private updateControl<T>(controlName: string, value: T) {
    this.form.get(controlName)?.setValue(value);
  }

  private findTags(ids: number[]): TagDto[] {
    if (!Array.isArray(ids)) {
      return [];
    }
    return ids.reduce((acc, id) => {
      const tag = this.tags.find(t => t.id === id);
      if (tag) {
        acc.push(tag);
      }

      return acc;
    }, [] as TagDto[]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
