import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RightOffcanvasComponent } from '../../../shared/modals/right-offcanvas/right-offcanvas.component';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { TextareaComponent } from '../../../shared/fields/textarea/textarea.component';
import { TranslatorService } from '../../services/translator.service';
import { AVAILABLE_LANGUAGES_SOURCE } from '../../enum/source-languages.list';
import { AVAILABLE_LANGUAGES_TARGET } from '../../enum/target-languages.list';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Translation } from '../../interfaces/translation.interface';
import { SuportedLanguagesSource } from '../../enum/suported-languages-source.enum';
import { SuportedLanguagesTarget } from '../../enum/suported-languages-target.enum';

@Component({
  selector: 'app-translator',
  imports: [CommonModule, RightOffcanvasComponent, InputButtonComponent, TextareaComponent, ReactiveFormsModule],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.scss'
})
export class TranslatorComponent {
  sourceLanguages = AVAILABLE_LANGUAGES_SOURCE;
  targetLanguages = AVAILABLE_LANGUAGES_TARGET;
  translation: string = '';
  sent: boolean = false;

  @Input() translatorId?: string;

  form = new FormGroup({
    source: new FormControl(''),
    target: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })

  constructor(private translator: TranslatorService) { }

  translate() {
    this.translation = '';

    if (this.form.invalid) {
      return;
    }

    this.sent = true;

    const content: Translation = {
      source: this.form.get('source')?.value as SuportedLanguagesSource,
      target: this.form.get('target')?.value as SuportedLanguagesTarget,
      content: this.form.get('content')?.value || ''
    }

    this.translator.translate(content).subscribe({
        next: (res) => {
          this.sent = false
          this.translation = res.data.text;
        }
      })
    }

  }
