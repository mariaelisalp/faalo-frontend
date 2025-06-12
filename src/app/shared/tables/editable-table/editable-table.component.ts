import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExampleResponse } from '../../../features/interfaces/response/example-response.interface';
import { CommonModule } from '@angular/common';
import { NoteFieldComponent } from '../../fields/note-field/note-field.component';

@Component({
  selector: 'app-editable-table',
  imports: [CommonModule, NoteFieldComponent],
  templateUrl: './editable-table.component.html',
  styleUrl: './editable-table.component.scss'
})
export class EditableTableComponent {

  @Input() exampleList: ExampleResponse[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(example: any) {
    this.edit.emit(example);
  }

  onDelete(example: any) {
    this.delete.emit(example);
  }

}
