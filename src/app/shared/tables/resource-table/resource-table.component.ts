import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceResponse } from '../../../features/interfaces/response/resource-response.interface';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../../features/services/resource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource-table',
  imports: [CommonModule],
  templateUrl: './resource-table.component.html',
  styleUrl: './resource-table.component.scss'
})
export class ResourceTableComponent {

  @Input() resourceList: ResourceResponse[] = [];
  @Output() editResource = new EventEmitter<any>();
  languageId: number;

  constructor(private resourceService: ResourceService, private activatedRoute: ActivatedRoute) { 
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  open(url: string) {
    window.open(url)
  }

  openFile(topicId: number) {
    this.resourceService.findFile(this.languageId, topicId).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');

      URL.revokeObjectURL(fileURL);
    });
  }

  onEdit(resource: ResourceResponse) {
    this.editResource.emit(resource);
  }
}
