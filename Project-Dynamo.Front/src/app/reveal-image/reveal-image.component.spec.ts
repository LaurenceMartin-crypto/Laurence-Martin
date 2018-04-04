import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealImageComponent } from './reveal-image.component';

describe('RevealImageComponent', () => {
  let component: RevealImageComponent;
  let fixture: ComponentFixture<RevealImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
