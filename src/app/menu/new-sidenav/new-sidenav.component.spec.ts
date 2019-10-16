import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSidenavComponent } from './new-sidenav.component';

describe('NewSidenavComponent', () => {
  let component: NewSidenavComponent;
  let fixture: ComponentFixture<NewSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
