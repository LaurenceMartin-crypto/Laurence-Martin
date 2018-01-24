import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHostScreenComponent } from './join-host-screen.component';

describe('JoinHostScreenComponent', () => {
  let component: JoinHostScreenComponent;
  let fixture: ComponentFixture<JoinHostScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinHostScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinHostScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
