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

@Component({
  selector: 'app-vocabulary-list',
  imports: [CommonModule, BasicLayoutComponent, ImageCardComponent, InputButtonComponent, CenterModalComponent, ReactiveFormsModule,
     InputFieldComponent, RouterModule],
  templateUrl: './vocabulary-list.component.html',
  styleUrl: './vocabulary-list.component.scss'
})
export class VocabularyListComponent {

  vocabularies: VocabularyResponse[] = [];
  collections: TopicResponse[] = [];
  languageId: number;


  formVocab = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  formCol = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private location: Location, private vocabularyService: VocabularyService, private topicService: TopicService, 
    private activatedRoute:ActivatedRoute){
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  back(){
    this.location.back();
  }

  ngOnInit(){
    this.getVocabularies();
    this.getCollections();
  }

  createCollection(){
    if(this.formCol.invalid){
      return;
    }

    const collection: Topic = {
      name: this.formCol.get('name')?.value || '',
      moduleType: ModuleType.VOCABULARY
    }

    this.topicService.create(collection, this.languageId).subscribe({
      next: (res) => {
        
      }
    })
  }

  createVocabulary(){
    if(this.formVocab.invalid){
      return;
    }

    const vocabulary: Vocabulary = {
      name: this.formVocab.get('name')?.value || '',
    }

    this.vocabularyService.create(vocabulary, this.languageId).subscribe({

    })
  }

  getCollections(){
    this.topicService.findAll(this.languageId, ModuleType.VOCABULARY).subscribe({
      next: (res) => {
        this.collections = res.data;
      }
    });
  }

  getVocabularies(){
    this.vocabularyService.findMany(this.languageId).subscribe({
      next: (res) => {
        this.vocabularies = res.data;
      }
    });
  }

  updateCollection(){}

}
