import { AfterViewInit, Component } from '@angular/core';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { CommonModule, Location } from '@angular/common';
import { WordService } from '../../services/word.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { HSDropdown, HSOverlay, HSStaticMethods, HSTooltip } from 'preline/dist';
import { DangerButtonComponent } from '../../../shared/buttons/danger-button/danger-button.component';
import { VocabularyService } from '../../services/vocabulary.service';
import { Vocabulary } from '../../interfaces/vocabulary.interface';
import { TranslatorComponent } from '../../components/translator/translator.component';

@Component({
  selector: 'app-vocabulary-page',
  imports: [BasicLayoutComponent, SecondaryButtonComponent, RoundedButtonComponent, CenterModalComponent, ReactiveFormsModule,
    InputFieldComponent, NoteFieldComponent, InputButtonComponent, FormLabelComponent, CommonModule, NotesOffcanvasComponent, 
    DangerButtonComponent, RouterModule, TranslatorComponent],
  templateUrl: './vocabulary-page.component.html',
  styleUrl: './vocabulary-page.component.scss'
})
export class VocabularyPageComponent {

  name: string = '';
  words: WordResponse[] = [];
  languageId: number;
  vocabularyId: number
  moduleType = ModuleType.VOCABULARY;
  isPopoverOpenIndex: number | null = null;

  constructor(private location: Location, private wordService: WordService, private route: ActivatedRoute, private router: Router, private vocabularyService: VocabularyService) {
    this.languageId = this.route.snapshot.params['languageId'];
    this.vocabularyId = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.queryParams['vocabulary'];
  }

  wordForm = new FormGroup({
    word: new FormControl('', Validators.required),
    translation: new FormControl('', Validators.required),
    definition: new FormControl('')
  });

  editWordForm = new FormGroup({
    word: new FormControl('', Validators.required),
    translation: new FormControl('', Validators.required),
    definition: new FormControl('')
  });

  editVocabularyForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  back() {
    this.location.back();
  }

  ngOnInit() {
    this.getWords();
    this.getVocabulary();
  }

  ngAfterViewInit() {
    HSStaticMethods.autoInit();
    HSOverlay.autoInit();
    HSDropdown.autoInit();
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

    this.wordService.create(word, this.vocabularyId).subscribe(
      () => {
        this.getWords();
      }
    );
  }

  getWords() {
    this.wordService.findMany(this.vocabularyId).subscribe({
      next: (res) => {
        this.words = res.data
      }
    })
  }

  getVocabulary() {
    console.log(this.name)

    this.editVocabularyForm.patchValue({
      name: this.name
    })

  }

  updateVocabulary() {
    if (this.editVocabularyForm.invalid) {
      return;
    }

    const vocabulary: Vocabulary = {
      name: this.editVocabularyForm.get('name')?.value || ''
    }

    this.vocabularyService.update(vocabulary, this.languageId, this.vocabularyId).subscribe(() => {
      this.name = vocabulary.name

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { vocabulary: this.name },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });
  }

  deleteVocabulary() {
    this.vocabularyService.delete(this.languageId, this.vocabularyId).subscribe({
      next: () => {
        this.router.navigate([`${this.languageId}/vocabulary`]);
      }
    })

  }

  togglePopover(index: number): void {
    if (this.isPopoverOpenIndex == index) {
      this.isPopoverOpenIndex = null; 
    } else {
      this.isPopoverOpenIndex = index; 
    }
  }

  isPopoverOpen(index: number): boolean {
    return this.isPopoverOpenIndex == index;
  }

  updateWord() {
    /*this.wordService.findOne(this.vocabularyId, id).subscribe({
      next: (res) => {
        this.editWordForm.patchValue({
          word: res.data.word,
          translation: res.data.translation,
          definition: res.data.definition
        });
      }
    });

    if(this.editWordForm.invalid){
      return;
    }

    const word: Word = {
      word: this.editWordForm.get('word')?.value || '',
      translation: this.editWordForm.get('translation')?.value || '',
      definition: this.editWordForm.get('definition')?.value || ''
    }

    this.wordService.update(word, this.vocabularyId, id).subscribe();*/
  }

  deleteWord(id: number) {
    this.wordService.delete(this.vocabularyId, id).subscribe({
      next: () => {
        
      }
    });
  }

}
