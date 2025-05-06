import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondInputFieldComponent } from './second-input-field.component';

describe('SecondInputFieldComponent', () => {
  let component: SecondInputFieldComponent;
  let fixture: ComponentFixture<SecondInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
