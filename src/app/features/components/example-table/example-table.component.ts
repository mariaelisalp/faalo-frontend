import { AfterViewChecked, Component, Input, } from '@angular/core';
import { ModuleType } from '../../enum/module-type.enum';
import { ExampleResponse } from '../../interfaces/response/example-response.interface';
import { ExampleService } from '../../services/example.service';
import { CommonModule } from '@angular/common';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Example } from '../../interfaces/example.interface';
import { HSOverlay } from 'preline/dist';

@Component({
  selector: 'app-example-table',
  imports: [CommonModule, InputButtonComponent, CenterModalComponent, InputButtonComponent, ReactiveFormsModule],
  templateUrl: './example-table.component.html',
  styleUrl: './example-table.component.scss'
})
export class ExampleTableComponent implements AfterViewChecked{

  public examples: ExampleResponse[] = [];
  @Input() moduleId!: number;
  @Input() id?: string;
  @Input() moduleType!: ModuleType;
  selectedId!: number;

  form = new FormGroup({
    example: new FormControl('', Validators.required)
  });

  editForm = new FormGroup({
    example: new FormControl('')
  })

  constructor(private exampleService: ExampleService){}

  ngAfterViewChecked(): void {
    HSOverlay.autoInit();
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

  getExample(){
    this.exampleService.findOne(this.selectedId, this.moduleId).subscribe({
      next: (res) => {
        this.editForm.patchValue({
          example: res.data.content
        })
      }
    })
  }

  setId(id: number){
    this.selectedId = id;
    this.getExample();
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

  editExample() {
    if(this.editForm.invalid){
      return;
    }

    const example: Example = {
      content: this.editForm.get('example')?.value || '',
      moduleType: this.moduleType
    }

    this.exampleService.update(example, this.selectedId, this.moduleId).subscribe({
      next: () => {

      }
    })
  }

  deleteExample(id: number) {
    this.exampleService.delete(id, this.moduleId).subscribe(
      () => {
        this.getExamples();
      }
    );
  }
}
