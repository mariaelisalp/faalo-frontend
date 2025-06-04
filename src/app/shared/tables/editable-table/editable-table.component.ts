import { Component, Input } from '@angular/core';
import { ExampleResponse } from '../../../features/interfaces/response/example-response.interface';
import { CommonModule } from '@angular/common';
import { NoteFieldComponent } from '../../fields/note-field/note-field.component';
import { ResourceResponse } from '../../../features/interfaces/response/resource-response.interface';

@Component({
  selector: 'app-editable-table',
  imports: [CommonModule, NoteFieldComponent],
  templateUrl: './editable-table.component.html',
  styleUrl: './editable-table.component.scss'
})
export class EditableTableComponent {

  @Input() exampleList: ExampleResponse[] = [];

}
