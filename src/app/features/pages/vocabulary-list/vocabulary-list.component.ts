import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { ImageCardComponent } from '../../../shared/buttons/image-card/image-card.component';
import { VocabularyService } from '../../services/vocabulary.service';
import { VocabularyResponse } from '../../interfaces/response/vocabulary-response';
import { TopicResponse } from '../../interfaces/response/topic-response.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Topic } from '../../interfaces/topic.interface';
import { ModuleType } from '../../enum/module-type.enum';
import { Vocabulary } from '../../interfaces/vocabulary.interface';
import { TopicService } from '../../services/topic.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { SecondaryButtonComponent } from '../../../shared/buttons/secondary-button/secondary-button.component';
import { HSOverlay } from 'preline/dist';
import { FormLabelComponent } from '../../../shared/labels/form-label/form-label.component';

@Component({
  selector: 'app-vocabulary-list',
  imports: [CommonModule, BasicLayoutComponent, ImageCardComponent, InputButtonComponent, CenterModalComponent, ReactiveFormsModule,
    InputFieldComponent, RouterModule, SecondaryButtonComponent, FormLabelComponent],
  templateUrl: './vocabulary-list.component.html',
  styleUrl: './vocabulary-list.component.scss'
})
export class VocabularyListComponent {

  vocabularies: VocabularyResponse[] = [];
  collections: TopicResponse[] = [];
  modalIsOpen = false;
  languageId: number;


  formVocab = new FormGroup({
    name: new FormControl('', Validators.required),
    collection: new FormControl('')
  });

  formCol = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private location: Location, private vocabularyService: VocabularyService, private topicService: TopicService,
    private activatedRoute: ActivatedRoute) {
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  back() {
    this.location.back();
  }

  openModal() {
    this.getCollections();
    this.modalIsOpen = true;
  }

  ngOnInit() {
    this.getVocabularies();
    this.getCollections();
  }

  createCollection() {
    if (this.formCol.invalid) {
      return;
    }

    const collection: Topic = {
      name: this.formCol.get('name')?.value || '',
      moduleType: ModuleType.VOCABULARY
    }

    this.topicService.create(collection, this.languageId).subscribe({
      next: (res) => {
        this.getCollections();
      }
    })
  }

  createVocabulary() {
    if (this.formVocab.invalid) {
      return;
    }

    const vocabulary: Vocabulary = {
      name: this.formVocab.get('name')?.value || '',
    }

    const collection = this.formVocab.get('collection')?.value;

    if (collection) {

      this.vocabularyService.createByTopic(vocabulary, this.languageId, +collection).subscribe({
        next: (res) => {
          this.getVocabularies();
        }
      })
    }
    else {
      this.vocabularyService.create(vocabulary, this.languageId).subscribe({
        next: (res) => {
          this.getVocabularies();
        }
      });
    }
  }

  getCollections() {
    this.topicService.findAll(this.languageId, ModuleType.VOCABULARY).subscribe({
      next: (res) => {
        this.collections = res.data;
      }
    });
  }

  getVocabularies() {
    this.vocabularyService.findMany(this.languageId).subscribe({
      next: (res) => {
        this.vocabularies = res.data;
      }
    });
  }

}
