import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForPlayerComponent } from './wait-for-player.component';

describe('WaitForPlayerComponent', () => {
  let component: WaitForPlayerComponent;
  let fixture: ComponentFixture<WaitForPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
