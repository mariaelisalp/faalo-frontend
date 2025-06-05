import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ResourceResponse } from '../../../features/interfaces/response/resource-response.interface';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../../features/services/resource.service';
import { ActivatedRoute } from '@angular/router';
import { CenterModalComponent } from '../../modals/center-modal/center-modal.component';
import { DangerButtonComponent } from '../../buttons/danger-button/danger-button.component';

@Component({
  selector: 'app-resource-table',
  imports: [CommonModule, CenterModalComponent, DangerButtonComponent],
  templateUrl: './resource-table.component.html',
  styleUrl: './resource-table.component.scss'
})
export class ResourceTableComponent {

  @Input() resourceList: ResourceResponse[] = [];
  @Output() editResource = new EventEmitter<any>();
  languageId: number;
  selectedId: number | null = null;

  constructor(private resourceService: ResourceService, private activatedRoute: ActivatedRoute) {
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  open(url: string) {
    window.open(url)
  }

  setId(id: number) {
    this.selectedId = id;
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

  deleteResource() {
    if (this.selectedId) {
      this.resourceService.delete(this.selectedId, this.languageId).subscribe({
        next: () => {
          this.closeModal();
          this.selectedId = null;
        }
      });
    }
  }

  closeModal() {
    const modalEl = document.getElementById('delete-resource-modal');
    window.HSOverlay.close(modalEl);
  }

  ngOnInit() {
    setTimeout(() => {
      if (typeof (window as any).HSOverlay !== 'undefined') {
        (window as any).HSOverlay.autoInit();
      }
    }, 100);
  }
}
