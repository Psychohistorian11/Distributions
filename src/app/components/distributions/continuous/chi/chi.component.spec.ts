import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiComponent } from './chi.component';

describe('ChiComponent', () => {
  let component: ChiComponent;
  let fixture: ComponentFixture<ChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
