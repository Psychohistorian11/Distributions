import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinomialComponent } from './binomial.component';

describe('BinomialComponent', () => {
  let component: BinomialComponent;
  let fixture: ComponentFixture<BinomialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinomialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BinomialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
