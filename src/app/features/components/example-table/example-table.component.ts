import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModuleType } from '../../enum/module-type.enum';
import { ExampleResponse } from '../../interfaces/response/example-response.interface';
import { ExampleService } from '../../services/example.service';
import { CommonModule } from '@angular/common';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { EditableTableComponent } from '../../../shared/tables/editable-table/editable-table.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Example } from '../../interfaces/example.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-example-table',
  imports: [CommonModule, InputButtonComponent, EditableTableComponent, CenterModalComponent, InputButtonComponent, ReactiveFormsModule],
  templateUrl: './example-table.component.html',
  styleUrl: './example-table.component.scss'
})
export class ExampleTableComponent {

  public examples: ExampleResponse[] = [];
  @Input() moduleId!: number;
  @Input() id?: string;
  @Input() moduleType!: ModuleType;
  @ViewChild('hsScaleAnimationModalExample') modal!: ElementRef;

  form = new FormGroup({
    example: new FormControl('', Validators.required)
  });

  constructor(private exampleService: ExampleService){

  }

  ngOnInit(){
    this.getExamples();
  }

  getExamples(){
    this.exampleService.findMany(this.moduleType, this.moduleId).subscribe({
      next: (res) => {
        this.examples = res.data;
      }
    })
  }

  create(){
    if(this.form.invalid){
      return;
    }

    const example: Example = {
      content: this.form.get('example')?.value || '',
      moduleType: this.moduleType
    }

    this.exampleService.create(example, this.moduleId).subscribe({
      next: () => {
        this.getExamples();
      }
    })
  }

  delete(){
    //this.exampleService.delete(, this.moduleId)
  }
}
