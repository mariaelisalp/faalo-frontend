import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { TopicService } from '../../services/topic.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Topic } from '../../interfaces/topic.interface';
import { ModuleType } from '../../enum/module-type.enum';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TopicResponse } from '../../interfaces/response/topic-response.interface';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { ContentService } from '../../services/content.service';
import { Content } from '../../interfaces/content.interface';
import { ContentResponse } from '../../interfaces/response/content-response.interface';
import { ContentButtonComponent } from '../../../shared/buttons/content-button/content-button.component';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { TopicsTreeComponent } from '../../../shared/navigation/topics-tree/topics-tree.component';
import { HSAccordion, HSOverlay } from 'preline/dist';
import { OverflowMenuComponent } from '../../../shared/navigation/overflow-menu/overflow-menu.component';
import { DangerButtonComponent } from '../../../shared/buttons/danger-button/danger-button.component';

@Component({
  selector: 'app-content-list',
  imports: [BasicLayoutComponent, CommonModule, InputButtonComponent,
    CenterModalComponent, ReactiveFormsModule, InputFieldComponent, ContentButtonComponent, RouterModule, TopicsTreeComponent,
    OverflowMenuComponent, DangerButtonComponent],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent {
  isSidebarOpen = true;
  public topics: TopicResponse[] = [];
  public contents: ContentResponse[] = [];
  languageId: number;
  topicId!: number
  topicName: string = '';
  moduleType = ModuleType.CONTENT;
  showTopicField: boolean = false;

  form = new FormGroup({
    topic: new FormControl('', [Validators.required])
  });

  editForm = new FormGroup({
    topic: new FormControl('', [Validators.required])
  });

  constructor(private location: Location, private topicService: TopicService, private activatedRoute: ActivatedRoute,
    private router: Router, private contentService: ContentService) {
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  back() {
    this.location.back();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {

      this.contents = [];

      this.topicId = params['topic'];

      this.findManyTopics();
      this.findOneTopic()
      this.findManyContents();

    });

  }

  ngAfterViewInit() {
    HSAccordion.autoInit();
    HSOverlay.autoInit();
  }

  createTopic() {
    if (this.form.invalid) {
      return;
    }

    const topic: Topic = {

      name: this.form.get('topic')?.value || '',
      moduleType: this.moduleType
    }

    if (this.topicId) {
      this.topicService.createSubtopic(this.languageId, topic, this.topicId).subscribe({
        next: () => {
          this.findManyTopics();
        },
      });
    }
    else {
      this.topicService.create(topic, this.languageId).subscribe({
        next: () => {
          this.findManyTopics();
        },
      });
    }
  }

  updateTopic() {

    if (this.editForm.invalid) {
      return;
    }

    const topic = {
      name: this.editForm.get('topic')?.value || '',
    }

    this.topicService.update(this.languageId, this.topicId, topic).subscribe({
      next: (res) => {
        this.topicName = res.data.name;
      }
    }
    );
  }

  findManyTopics() {

    this.topicService.findMany(this.languageId, this.moduleType, this.topicId).subscribe((res) => {
      this.topics = res.data;
    });
  }

  findOneTopic() {
    if (this.topicId) {

      this.topicService.findOne(this.languageId, this.topicId, this.moduleType).subscribe((res) => {
        this.topicName = res.data.name;

        this.editForm.patchValue({
          topic: this.topicName
        });
      })
    }
  }

  findManyContents() {
    this.contentService.findMany(this.languageId, this.topicId).subscribe({
      next: (res) => {
        this.contents = res.data;
      },
    });
  }

  moveContentsToRoot() {
    const topic = { id: null }

    for (const content of this.contents) {
      this.contentService.updateTopic(this.languageId, content.id, topic).subscribe();
    }

    this.deleteTopic();

  }

  deleteTopic() {
    this.topicService.delete(this.languageId, this.topicId).subscribe();
  }

  addContentPage() {
    const content: Content = {
      title: '',
      content: ''
    }

    if (this.topicId) {
      this.contentService.create(content, this.languageId,).subscribe({
        next: (res) => {
          this.router.navigate([`/${this.languageId}/content/${res.data.id}`], { queryParams: { topic: this.topicId } });
        }
      });
    }
    else {
      this.contentService.create(content, this.languageId,).subscribe({
        next: (res) => {
          this.router.navigate([`/${this.languageId}/content/${res.data.id}`]);
        }
      });
    }

  }

}
