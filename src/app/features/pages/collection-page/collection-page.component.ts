import { Component, ElementRef, ViewChild } from '@angular/core';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { EditableTableComponent } from '../../../shared/tables/editable-table/editable-table.component';
import { MediumModalComponent } from '../../../shared/modals/medium-modal/medium-modal.component';
import { CommonModule, Location } from '@angular/common';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ResourceResponse } from '../../interfaces/response/resource-response.interface';
import { TopicService } from '../../services/topic.service';
import { ModuleType } from '../../enum/module-type.enum';
import { ResourceTableComponent } from '../../../shared/tables/resource-table/resource-table.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLabelComponent } from '../../../shared/labels/form-label/form-label.component';
import { FileUploadComponent } from '../../../shared/upload/file-upload/file-upload.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { DangerButtonComponent } from '../../../shared/buttons/danger-button/danger-button.component';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import { TopicResponse } from '../../interfaces/response/topic-response.interface';
declare global {
  interface Window {
    HSOverlay: any;
  }
}

@Component({
  selector: 'app-collection-page',
  imports: [BasicLayoutComponent, InputButtonComponent, FileUploadComponent, CenterModalComponent, FormLabelComponent, InputFieldComponent,
    ResourceTableComponent, MediumModalComponent, CommonModule, ReactiveFormsModule, RouterModule, DangerButtonComponent, FormsModule],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.scss'
})
export class CollectionPageComponent {
  languageId: number;
  collectionId: number
  name?: string;
  selectedType: string = '';
  resources: ResourceResponse[] = [];
  modalIsOpen = false;
  searchTerm: string = '';

  @ViewChild('hsScaleAnimationModal') modalElement!: ElementRef;

  form = new FormGroup({

  })

  collectionForm = new FormGroup({
    collection: new FormControl('', Validators.required)
  })

  constructor(private location: Location, private resourceService: ResourceService, private activatedRoute: ActivatedRoute, private topic: TopicService) {
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
    this.collectionId = this.activatedRoute.snapshot.params['collectionId'];
  }

  ngOnInit() {
    this.getResources();
    this.getCollection();
  }

  back() {
    this.location.back()
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

  getResources() {
    this.resourceService.findMany(this.languageId, this.collectionId).subscribe({
      next: (res) => {
        this.resources = res.data
      }
    })
  }

  getCollection() {
    this.topic.findOne(this.languageId, this.collectionId, ModuleType.RESOURCE).subscribe({
      next: (res) => {
        this.name = res.data.name;
        this.collectionForm.get('collection')?.setValue(this.name);
      }
    })
  }

  handleEdit(resource: ResourceResponse) {
    this.collectionForm.patchValue({
      collection: resource.name
    });

    const modal = window.HSOverlay?.getInstance('#hs-scale-animation-modal');
    modal?.open();
  }

  saveResourceChanges() { }

  saveCollectionChange() {
    const collection = {
      name: this.collectionForm.get('collection')?.value || ''
    }

    this.topic.update(this.languageId, this.collectionId, collection).subscribe({
      next: (res) => {
        this.getCollection()
      }
    })
  }

  moveResourcesToRoot() {
    const topic = { id: null }

    for (const content of this.resources) {
      this.resourceService.updateTopic(this.languageId, content.id, topic).subscribe(() => {
        console.log('chegando tudo')
      });
      console.log('movido');
    }

    this.deleteCollection();
  }

  deleteCollection() {
    this.topic.delete(this.languageId, this.collectionId).subscribe();
  }

  deleteResource() { }

}
