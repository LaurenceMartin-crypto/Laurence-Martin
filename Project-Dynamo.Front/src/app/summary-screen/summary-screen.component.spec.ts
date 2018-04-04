import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryScreenComponent } from './summary-screen.component';

describe('SummaryScreenComponent', () => {
  let component: SummaryScreenComponent;
  let fixture: ComponentFixture<SummaryScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
