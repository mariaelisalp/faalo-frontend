import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ModuleType } from '../../../features/enum/module-type.enum';
import { TopicTreeNode } from '../../../features/interfaces/response/topic-tree.class';
import { TopicService } from '../../../features/services/topic.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HSAccordion } from 'preline/dist';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topics-tree',
  imports: [CommonModule, RouterModule],
  templateUrl: './topics-tree.component.html',
  styleUrl: './topics-tree.component.scss'
})
export class TopicsTreeComponent implements OnInit{
  @Input() refreshTree!: EventEmitter<void>;
  private refreshSubscription!: Subscription;
  
  languageId: number;
  tree: TopicTreeNode[] = [];

  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute){
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  ngAfterViewInit(){
    HSAccordion.autoInit(); 
  }

  toggleNode(node: TopicTreeNode){
    node.expanded = !node.expanded;
  }

  ngOnInit(): void {
    this.getTopics();
    
    this.refreshSubscription = this.refreshTree.subscribe(() => {
      this.getTopics();
    });
  }

  getTopics(){
    this.topicService.findAll(this.languageId, ModuleType.CONTENT).subscribe(
      (res) => {
        this.tree = TopicTreeNode.buildTree(res.data);
      }
    );
  }

}
