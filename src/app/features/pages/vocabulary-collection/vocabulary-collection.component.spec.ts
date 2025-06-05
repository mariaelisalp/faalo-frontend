import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyCollectionComponent } from './vocabulary-collection.component';

describe('VocabularyCollectionComponent', () => {
  let component: VocabularyCollectionComponent;
  let fixture: ComponentFixture<VocabularyCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
