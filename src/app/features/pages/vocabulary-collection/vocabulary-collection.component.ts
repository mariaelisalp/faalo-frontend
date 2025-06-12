import { Component } from '@angular/core';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VocabularyResponse } from '../../interfaces/response/vocabulary-response';
import { CommonModule, Location } from '@angular/common';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { TopicService } from '../../services/topic.service';
import { VocabularyService } from '../../services/vocabulary.service';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { DangerButtonComponent } from '../../../shared/buttons/danger-button/danger-button.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuleType } from '../../enum/module-type.enum';
import { ImageCardComponent } from '../../../shared/buttons/image-card/image-card.component';
import { HSDropdown, HSOverlay, HSStaticMethods } from 'preline/dist';

@Component({
  selector: 'app-vocabulary-collection',
  imports: [BasicLayoutComponent, CommonModule, CenterModalComponent, InputFieldComponent, InputButtonComponent, DangerButtonComponent,
    ReactiveFormsModule, RouterModule, ImageCardComponent, FormsModule],
  templateUrl: './vocabulary-collection.component.html',
  styleUrl: './vocabulary-collection.component.scss'
})
export class VocabularyCollectionComponent {
  name: string = '';
  vocabularies: VocabularyResponse[] = [];
  languageId: number;
  collectionId: number;
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private topicService: TopicService, private vocabularyService: VocabularyService, private location: Location) {
    this.name = this.route.snapshot.queryParams['name'];
    this.languageId = this.route.snapshot.params['languageId'];
    this.collectionId = this.route.snapshot.params['id'];
  }

  back() {
    this.location.back();
  }

  collectionForm = new FormGroup({
    collection: new FormControl(this.name, Validators.required)

  })

  ngOnInit() {
    this.getVocabularies();
    this.getCollection();
  }

  get filteredVocabularies() {
    if (!this.searchTerm.trim()) {
      return this.vocabularies;
    }

    return this.vocabularies.filter(vocabulary =>
      vocabulary.name.toLowerCase().includes(this.searchTerm)
    );
  }

  getVocabularies() {
    this.vocabularyService.findMany(this.languageId, this.collectionId).subscribe({
      next: (res) => {
        this.vocabularies = res.data;
      }
    })
   }

  getCollection() {
    this.topicService.findOne(this.languageId, this.collectionId, ModuleType.VOCABULARY).subscribe({
      next: (res) => {
        this.name = res.data.name;
        this.collectionForm.get('collection')?.patchValue(this.name);
      }
    })
  }

  updateCollection() {
    const collection = {
      name: this.collectionForm.get('collection')?.value || ''
    }

    this.topicService.update(this.languageId, this.collectionId, collection).subscribe({
      next: (res) => {
        this.getCollection()
      }
    })
  }

  deleteCollection() {
    this.topicService.delete(this.languageId, this.collectionId).subscribe();
  }

  ngAfterViewInit() {
    HSOverlay.autoInit();
    HSStaticMethods.autoInit();
  }

}
