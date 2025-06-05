import { AfterViewInit, Component } from '@angular/core';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { CommonModule, Location } from '@angular/common';
import { WordService } from '../../services/word.service';
import { ActivatedRoute } from '@angular/router';
import { SecondaryButtonComponent } from '../../../shared/buttons/secondary-button/secondary-button.component';
import { RoundedButtonComponent } from '../../../shared/buttons/rounded-button/rounded-button.component';
import { MediumModalComponent } from '../../../shared/modals/medium-modal/medium-modal.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { NoteFieldComponent } from '../../../shared/fields/note-field/note-field.component';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { Word } from '../../interfaces/word.interface';
import { FormLabelComponent } from '../../../shared/labels/form-label/form-label.component';
import { WordResponse } from '../../interfaces/response/word-response.interface';
import { ModuleType } from '../../enum/module-type.enum';
import { NotesOffcanvasComponent } from '../../components/notes-offcanvas/notes-offcanvas.component';
import { HSOverlay, HSStaticMethods } from 'preline/dist';

@Component({
  selector: 'app-vocabulary-page',
  imports: [BasicLayoutComponent, SecondaryButtonComponent, RoundedButtonComponent, CenterModalComponent, ReactiveFormsModule,
    InputFieldComponent, NoteFieldComponent, InputButtonComponent, FormLabelComponent, CommonModule, NotesOffcanvasComponent],
  templateUrl: './vocabulary-page.component.html',
  styleUrl: './vocabulary-page.component.scss'
})
export class VocabularyPageComponent {

  name: string = '';
  words: WordResponse[] = [];
  languageId: number;
  vocabularyId: number
  moduleType = ModuleType.VOCABULARY;

  constructor(private location: Location, private wordService: WordService, private route: ActivatedRoute) {
    this.languageId = this.route.snapshot.params['languageId'];
    this.vocabularyId = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.queryParams['vocabulary'];
  }

  wordForm = new FormGroup({
    word: new FormControl('', Validators.required),
    translation: new FormControl('', Validators.required),
    description: new FormControl('')
  })

  back() {
    this.location.back();
  }

  ngOnInit() {
    this.getWords();
  }

  createWord() {
    if (this.wordForm.invalid) {
      return;
    }

    const word: Word = {
      word: this.wordForm.get('word')?.value || '',
      translation: this.wordForm.get('translation')?.value || '',
      definition: this.wordForm.get('definition')?.value || ''
    }

    this.wordService.create(word, this.vocabularyId).subscribe();
  }

  getWords() {
    this.wordService.findMany(this.vocabularyId).subscribe({
      next: (res) => {
        this.words = res.data
      }
    })
  }

}
