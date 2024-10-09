import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExponentialComponent } from './exponential.component';

describe('ExponentialComponent', () => {
  let component: ExponentialComponent;
  let fixture: ComponentFixture<ExponentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExponentialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExponentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
