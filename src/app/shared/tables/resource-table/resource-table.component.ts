import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ResourceResponse } from '../../../features/interfaces/response/resource-response.interface';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../../features/services/resource.service';
import { ActivatedRoute } from '@angular/router';
import { CenterModalComponent } from '../../modals/center-modal/center-modal.component';
import { DangerButtonComponent } from '../../buttons/danger-button/danger-button.component';
import { MediumModalComponent } from '../../modals/medium-modal/medium-modal.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormLabelComponent } from '../../labels/form-label/form-label.component';
import { InputButtonComponent } from '../../buttons/input-button/input-button.component';
import { TopicResponse } from '../../../features/interfaces/response/topic-response.interface';
import { FileUploadComponent } from '../../upload/file-upload/file-upload.component';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { HSOverlay } from 'preline/dist';
import { validateFileSize, validateFileType } from '../../../core/validators/file.validator';

@Component({
  selector: 'app-resource-table',
  imports: [CommonModule, CenterModalComponent, DangerButtonComponent, MediumModalComponent, ReactiveFormsModule, FormLabelComponent,
    InputButtonComponent, FileUploadComponent, InputFieldComponent,],
  templateUrl: './resource-table.component.html',
  styleUrl: './resource-table.component.scss'
})
export class ResourceTableComponent {

  @Input() resourceList: ResourceResponse[] = [];
  @Input() collections: TopicResponse[] = [];
  @Output() editResource = new EventEmitter<any>();
  errorMessage: string = '';
  fileValid: boolean = true;
  currentResource: ResourceResponse = {
    id: 0,
    name: '',
    type: '',
    description: '',
    access: '',
    fileName: '',
    language: 0,
    topic: 0,
    createdAt: '',
    updatedAt: ''
  }
  selectedFile: File | null = null;
  languageId: number;
  selectedId: number | null = null;
  modalIsOpen = false;
  selectedType: string = '';

  editForm = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    description: new FormControl(),
    collection: new FormControl(),
    access: new FormControl(),
  })

  constructor(private resourceService: ResourceService, private activatedRoute: ActivatedRoute) {
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  ngOnInit() {

    this.editForm.get('type')?.valueChanges.subscribe((value) => {

      this.selectedType = this.editForm.get('type')?.value;
    });

  }

  ngAfterViewInit() {
    HSOverlay.autoInit();
  }

  open(url: string) {
    window.open(url)
  }

  setId(id: number) {
    this.selectedId = id;
    this.getResource();
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  getResourceValues() {
    this.editForm.patchValue({
      name: this.currentResource.name,
      type: this.currentResource.type,
      description: this.currentResource.description,
      collection: this.currentResource.topic,
      access: this.currentResource.access,
    })
  }

  getResource() {
    this.resourceService.findOne(this.selectedId!, this.languageId).subscribe({
      next: (res) => {
        this.currentResource = res.data
        this.getResourceValues();
      }
    })
  }

  openFile(topicId: number) {
    this.resourceService.findFile(this.languageId, topicId).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');

      URL.revokeObjectURL(fileURL);
    });
  }

  validateFile(file: File) {
    if (!validateFileSize(file)) {
      this.errorMessage = 'Esse arquivo é muito grande';

      return false
    }

    if (!validateFileType(file)) {
      this.errorMessage = 'Formato de arquivo não suportado'

      return false;
    }

    return true;
  }

  updateResource() {
    if (this.selectedId) {
      const resource = new FormData();
      resource.append('name', this.editForm.get('name')?.value);
      resource.append('type', this.editForm.get('type')?.value);
      resource.append('description', this.editForm.get('description')?.value);

      if (this.selectedType == 'URL') {
        resource.append('access', this.editForm.get('access')?.value || '');
      }
      else {
        if (this.selectedFile) {
          this.fileValid = this.validateFile(this.selectedFile);

          if (this.fileValid) {
            resource.append('file', this.selectedFile);
          }
          else {
            return;
          }
        }
      }

      const collection = this.editForm.get('collection')?.value;

      this.resourceService.update(resource, this.selectedId, this.languageId, +collection).subscribe({
        next: (res) => {
          //this.getResources();
        }
      })
    }
  }

  deleteResource() {
    if (this.selectedId) {
      this.resourceService.delete(this.selectedId, this.languageId).subscribe({
        next: () => {
          this.selectedId = null;
        }
      });
    }
  }

}
