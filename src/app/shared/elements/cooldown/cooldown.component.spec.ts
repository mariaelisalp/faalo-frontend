import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooldownComponent } from './cooldown.component';

describe('CooldownComponent', () => {
  let component: CooldownComponent;
  let fixture: ComponentFixture<CooldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooldownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
