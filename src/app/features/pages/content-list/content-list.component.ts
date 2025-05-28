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

@Component({
  selector: 'app-content-list',
  imports: [BasicLayoutComponent, CommonModule, InputButtonComponent,
    CenterModalComponent, ReactiveFormsModule, InputFieldComponent, ContentButtonComponent, RouterModule],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent {
  isSidebarOpen = true;
  public topics: TopicResponse[] = [];
  public contents: ContentResponse[] = [];
  languageId: number;
  topicId?: number
  topicName: string = '';
  moduleType = ModuleType.CONTENT;
  showTopicField: boolean = false;

  form = new FormGroup({
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

      console.log(this.contents)

    });

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
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      this.topicService.create(topic, this.languageId).subscribe({
        next: () => {
          this.findManyTopics();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  findManyTopics() {

    this.topicService.findMany(this.languageId, this.moduleType, this.topicId).subscribe((res) => {
      this.topics = res.data;
    }
    );
  }

  findOneTopic() {
    if (this.topicId) {

      this.topicService.findOne(this.languageId, this.topicId, this.moduleType).subscribe((res) => {
        this.topicName = res.data.name;
      })
    }
  }

  findManyContents() {
    this.contentService.findMany(this.languageId, this.topicId).subscribe({
      next: (res) => {
        this.contents = res.data;
        console.log(this.contents)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  addContentPage() {
    const content: Content = {
      title: '',
      content: ''
    }

    if (this.topicId) {
      this.contentService.create(content, this.languageId,).subscribe({
        next: (res) => {
          this.router.navigate([`/${this.languageId}/content/${res.data.id}`], { queryParams: { topic: this.topicId }});
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
