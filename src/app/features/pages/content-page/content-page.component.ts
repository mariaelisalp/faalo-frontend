import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, filter, mapTo, merge, mergeMap, of, share, startWith, tap } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { TextareaComponent } from '../../../shared/fields/textarea/textarea.component';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { Content } from '../../interfaces/content.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MediumLabelComponent } from '../../../shared/labels/medium-label/medium-label.component';
import { OverflowMenuComponent } from '../../../shared/navigation/overflow-menu/overflow-menu.component';
import { ModuleType } from '../../enum/module-type.enum';
import { ContentResponse } from '../../interfaces/response/content-response.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { NotesOffcanvasComponent } from '../../components/notes-offcanvas/notes-offcanvas.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { DangerButtonComponent } from '../../../shared/buttons/danger-button/danger-button.component';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { ExampleTableComponent } from '../../components/example-table/example-table.component';
import { TopicsTreeComponent } from '../../../shared/navigation/topics-tree/topics-tree.component';
import { HSDropdown, HSOverlay } from 'preline/dist';

@Component({
  selector: 'app-content-page',
  imports: [ReactiveFormsModule, BasicLayoutComponent, CommonModule, RouterModule, CenterModalComponent, 
    TextareaComponent, InputFieldComponent, MediumLabelComponent, DangerButtonComponent, OverflowMenuComponent, NotesOffcanvasComponent,
    FormsModule, InputButtonComponent, ExampleTableComponent, TopicsTreeComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent implements AfterViewInit{

  isSidebarOpen = true;
  count = 0;
  saveIndicator$ = of('changes saved');
  languageId: number;
  public contentId: number;
  public topicId: number;
  public moduleType: ModuleType;
  public content!: ContentResponse;
  html: SafeHtml = '';

  @ViewChild('hs-dropdown-custom-icon-trigger') modalElement!: ElementRef;
  @ViewChild('hsScaleAnimationModal') modal!: ElementRef;
  @ViewChild(TopicsTreeComponent) treeComponent!: TopicsTreeComponent;

  form = new FormGroup({
    title: new FormControl<string>('Untitled', Validators.required),
    content: new FormControl<string>('', Validators.required)
  });

  constructor(private contentService: ContentService, private activatedRoute: ActivatedRoute, private router: Router,
    private sanitizer: DomSanitizer, private location: Location, ) {

    this.languageId = this.activatedRoute.snapshot.params['languageId'];
    this.contentId = this.activatedRoute.snapshot.params['id'];
    this.topicId = this.activatedRoute.snapshot.queryParams['topic'];
    console.log(this.topicId, 'topicid');
    this.moduleType = ModuleType.CONTENT
  }

  ngAfterViewInit() {

    if (typeof HSOverlay || typeof HSDropdown !== 'undefined') {
      HSOverlay.autoInit();
      HSDropdown.autoInit();
    }
  }

  back(){
    this.location.back();
  }

  ngOnInit() {
    this.getContent();

    const inputToSave$ = this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share()
    );

    const savesInProgress$ = inputToSave$.pipe(
      tap(() => this.count++),
      mapTo(of("Saving...").pipe(
        delay(3000)
      )),
    );

    const savesCompleted$ = inputToSave$.pipe(
      mergeMap(value => {
        const content: Content = {
          title: value.title ?? '',
          content: value.content ?? ''
        };
        return this.saveChanges(content);
      }),
      tap(() => {
        this.count--;
      }),
      filter(() => !this.count),
      mapTo(of("Saved!"))
    );

    this.saveIndicator$ = merge(
      savesInProgress$.pipe(mapTo("Saving...")),
      savesCompleted$.pipe(mapTo("Saved!"))
    ).pipe(
      startWith("All changes saved.")
    );

    inputToSave$.subscribe(console.log);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  saveChanges(content: Content) {

    return this.contentService.update(content, this.contentId, this.languageId, this.topicId);
  }

  async updatePreview(value: string) {

    const markdown = await marked.parse((value));
    const clean = DOMPurify.sanitize(markdown);

    this.html = this.sanitizer.bypassSecurityTrustHtml(clean);
    //this.form.get('content')?.setValue(this.html, { emitEvent: false });
  }

  getContent() {
    this.contentService.findOne(this.languageId, this.contentId).subscribe({
      next: (res) => {
        this.content = res.data;

        this.form.patchValue({
          title: this.content.title,
          content: this.content.content
        });

        this.updatePreview(this.content.content);
      }
    });
  }

  delete() {
    this.contentService.delete(this.contentId, this.languageId).subscribe({
      next: () => {
        this.router.navigate(['/', this.languageId, 'content']);
      }
    });
  }

}
