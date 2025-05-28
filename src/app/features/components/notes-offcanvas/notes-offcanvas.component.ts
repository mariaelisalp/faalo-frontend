import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NoteResponse } from '../../interfaces/response/note-response.interface';
import { ModuleType } from '../../enum/module-type.enum';
import { CommonModule } from '@angular/common';
import { RightOffcanvasComponent } from '../../../shared/modals/right-offcanvas/right-offcanvas.component';
import { NoteFieldComponent } from '../../../shared/fields/note-field/note-field.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, map, Observable, of, Subscription } from 'rxjs';
import { Note } from '../../interfaces/note.interface';

@Component({
  selector: 'app-notes-offcanvas',
  imports: [CommonModule, RightOffcanvasComponent, NoteFieldComponent, ReactiveFormsModule],
  templateUrl: './notes-offcanvas.component.html',
  styleUrl: './notes-offcanvas.component.scss'
})
export class NotesOffcanvasComponent implements OnInit {

  public notes: NoteResponse[] = [];
  @Input() moduleId!: number;
  @Input() id?: string;
  @Input() moduleType!: ModuleType;
  @Input() isOpen: boolean = false;
  notesForm!: FormGroup;
  private saveSubscriptions: Subscription[] = [];
  private savingInProgress = false;

  constructor(private notesService: NoteService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loadNotes();
  }

  ngOnDestroy() {
    // Cancela todas as assinaturas para evitar memory leaks
    this.saveSubscriptions.forEach(sub => sub.unsubscribe());
  }

  createForm() {
    this.notesForm = this.fb.group({
      notes: this.fb.array([])
    });
  }

  loadNotes() {
    this.notesService.findMany(this.moduleId, this.moduleType).subscribe({
      next: (res) => {
        this.notes = res.data;
        const notesArray = this.notesForm.get('notes') as FormArray;
        
        // Limpa o array atual em caso de recarregamento
        while (notesArray.length) {
          notesArray.removeAt(0);
        }

        // Adiciona cada nota ao FormArray
        this.notes.forEach(note => {
          const noteGroup = this.createNoteFormGroup(note);
          notesArray.push(noteGroup);
          
          // Configura o autosave para esta nota específica
          this.setupAutoSave(notesArray.length - 1, noteGroup);
        });
      },
      error: (err) => {
        console.error('Erro ao carregar notas:', err);
      }
    });
  }

  createNoteFormGroup(note: NoteResponse): FormGroup {
    return this.fb.group({
      id: [note.id],
      content: [note.content]
    });
  }

  setupAutoSave(index: number, noteGroup: FormGroup) {
    // Observa mudanças neste grupo de formulário específico
    const subscription = noteGroup.valueChanges.pipe(
      debounceTime(1000), // Aguarda 1 segundo de inatividade
      distinctUntilChanged((prev, curr) => {
        // Compara apenas o conteúdo, ignorando mudanças no ID
        return prev.content === curr.content;
      }),
      filter(() => !this.savingInProgress) // Evita salvar se já houver um salvamento em curso
    ).subscribe(value => {
      this.saveNote(value, index);
    });

    this.saveSubscriptions.push(subscription);
  }

  saveNote(noteValue: any, index: number) {
    this.savingInProgress = true;
    
    const note: Note = {
      content: noteValue.content,
      moduleType: this.moduleType
    };

    this.notesService.update(note, noteValue.id, this.moduleId).pipe(
      finalize(() => {
        this.savingInProgress = false;
      })
    ).subscribe({
      next: (res) => {
        console.log(`Nota ${index} salva com sucesso:`, res);
      },
      error: (err) => {
        console.error(`Erro ao salvar nota ${index}:`, err);
      }
    });
  }

  addNoteArea() {
    const note: Note = {
      content: '',
      moduleType: this.moduleType
    };

    this.notesService.create(note, this.moduleId).subscribe({
      next: (res) => {
        const createdNote = res.data;
        const notesArray = this.notesForm.get('notes') as FormArray;
        
        const noteGroup = this.createNoteFormGroup(createdNote);
        notesArray.push(noteGroup);
        
        // Configura o autosave para a nova nota
        this.setupAutoSave(notesArray.length - 1, noteGroup);
      },
      error: (err) => {
        console.error('Erro ao criar nota:', err);
      }
    });
  }

  removeNoteArea(index: number) {
    const notesArray = this.notesForm.get('notes') as FormArray;
    const noteToRemove = notesArray.at(index).value;
    
    // Remove a assinatura correspondente
    if (this.saveSubscriptions[index]) {
      this.saveSubscriptions[index].unsubscribe();
      this.saveSubscriptions.splice(index, 1);
    }
    
    // Exclui a nota do backend
    if (noteToRemove.id) {
      this.notesService.delete(this.moduleId, noteToRemove.id).subscribe({
        next: () => {
          console.log(`Nota ${index} excluída com sucesso`);
        },
        error: (err) => {
          console.error(`Erro ao excluir nota ${index}:`, err);
        }
      });
    }
    
    // Remove do formulário
    notesArray.removeAt(index);
  }

  get notesControls() {
    return (this.notesForm.get('notes') as FormArray).controls;
  }

}