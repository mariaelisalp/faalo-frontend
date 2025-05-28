import { Component, Input, OnInit } from '@angular/core';
import { ModuleType } from '../../../features/enum/module-type.enum';
import { TopicTreeNode } from '../../../features/interfaces/response/topic-tree.class';
import { TopicService } from '../../../features/services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topics-tree',
  imports: [CommonModule],
  templateUrl: './topics-tree.component.html',
  styleUrl: './topics-tree.component.scss'
})
export class TopicsTreeComponent implements OnInit{
  //@Input() moduleType!: ModuleType;
  languageId: number;
  tree: TopicTreeNode[] = [];

  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute){
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  ngOnInit(): void {
    this.topicService.findAll(this.languageId, ModuleType.CONTENT).subscribe(
      (res) => {
        console.log(res.data)
        this.tree = TopicTreeNode.buildTree(res.data);
        console.log(this.tree)
      }
    );
  }

}
