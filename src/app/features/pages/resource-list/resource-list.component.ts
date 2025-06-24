import { Component, ElementRef, ViewChild } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { CommonModule, Location } from '@angular/common';
import { ResourceResponse } from '../../interfaces/response/resource-response.interface';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { TopicResponse } from '../../interfaces/response/topic-response.interface';
import { MediumModalComponent } from '../../../shared/modals/medium-modal/medium-modal.component';
import { FormLabelComponent } from '../../../shared/labels/form-label/form-label.component';
import { SelectFieldComponent } from '../../../shared/fields/select-field/select-field.component';
import { FileUploadComponent } from '../../../shared/upload/file-upload/file-upload.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../interfaces/topic.interface';
import { ModuleType } from '../../enum/module-type.enum';
import { LanguageButtonComponent } from '../../../shared/buttons/language-button/language-button.component';
import { ResourceTableComponent } from '../../../shared/tables/resource-table/resource-table.component';
import { validateFileSize, validateFileType } from '../../../core/validators/file.validator';

declare var HSOverlay: any;
@Component({
  selector: 'app-resource-list',
  imports: [BasicLayoutComponent, CommonModule, ResourceTableComponent, InputButtonComponent, InputFieldComponent, MediumModalComponent,
    FormLabelComponent, ReactiveFormsModule, SelectFieldComponent, FileUploadComponent, CenterModalComponent, LanguageButtonComponent,
    RouterModule, FormsModule
  ],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.scss'
})
export class ResourceListComponent {

  resources: ResourceResponse[] = [];
  collections: TopicResponse[] = [];
  selectedType: string = '';
  selectedFile: File | null = null;
  languageId: number;
  fileValid: boolean = false;
  searchTerm: string = '';

  modalIsOpen = false;
  errorMessage: string = '';

  @ViewChild('hsScaleAnimationModal') modalElement!: ElementRef;

  form = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    collection: new FormControl(''),
    description: new FormControl(),
    access: new FormControl('',),
  });

  collectionForm = new FormGroup({
    collection: new FormControl('', Validators.required)
  });

  constructor(private resourceService: ResourceService, private location: Location, private activatedRoute: ActivatedRoute, private topicService: TopicService) {
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  selectedResource: any;

  back() {
    this.location.back();
  }

  ngOnInit() {
    this.form.get('type')?.valueChanges.subscribe((value) => {

      this.selectedType = this.form.get('type')?.value;
    });

    this.getCollections();
    this.getResources();

  }

  ngAfterViewInit() {
    HSOverlay.autoInit();
  }

  get filteredResources() {
    if (!this.searchTerm.trim()) {
      return this.resources;
    }

    return this.resources.filter(resource =>
      resource.name.toLowerCase().includes(this.searchTerm) ||
      (
        resource.type === 'URL'
          ? resource.access?.toLowerCase().includes(this.searchTerm)
          : resource.fileName?.toLowerCase().includes(this.searchTerm)
      )

    );
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  openModal() {

    this.getCollections();
    this.modalIsOpen = true;

  }

  validateFile(file: File){
    if(!validateFileSize(file)){
      this.errorMessage = 'Esse arquivo é muito grande';

      return false
    }

    if(!validateFileType(file)){
      this.errorMessage = 'Formato de arquivo não suportado'

      return false;
    }

    return true;
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    const resource = new FormData();
    resource.append('name', this.form.get('name')?.value);
    resource.append('type', this.form.get('type')?.value);
    resource.append('description', this.form.get('description')?.value);

    if (this.selectedType == 'URL') {
      resource.append('access', this.form.get('access')?.value || '');
    }
    else {
      
      if(this.selectedFile){
        this.fileValid =  this.validateFile(this.selectedFile);
        
        if(this.fileValid){
          resource.append('file', this.selectedFile);
        }
        else{
          return;
        }
      }
    }

    for (const pair of resource.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const collection = this.form.get('collection')?.value;

    if (collection) {
 
      this.resourceService.createByTopic(resource, this.languageId, +collection).subscribe({
        next: (res) => {
          this.getResources();
        }
      })
    }

    else {
      this.resourceService.create(resource, this.languageId).subscribe({
        next: (res) => {
          this.getResources();
        }
      });
    }

  }

  createCollection() {
    if (this.collectionForm.invalid) {
      return;
    }

    const collection: Topic = {
      name: this.collectionForm.get('collection')?.value || '',
      moduleType: ModuleType.RESOURCE
    }

    this.topicService.create(collection, this.languageId).subscribe({
      next: () => {
        this.getCollections();
      }
    })
  }

  getResources() {
    this.resourceService.findAll(this.languageId).subscribe({
      next: (res) => {
        this.resources = res.data;
      }
    });
  }

  getCollections() {
    this.topicService.findAll(this.languageId, ModuleType.RESOURCE).subscribe({
      next: (res) => {
        this.collections = res.data;

        console.log(this.collections)
      }
    });
  }
}
