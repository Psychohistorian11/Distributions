import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoissonComponent } from './poisson.component';

describe('PoissonComponent', () => {
  let component: PoissonComponent;
  let fixture: ComponentFixture<PoissonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoissonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoissonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
