import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundToolbarComponent } from './not-found-toolbar.component';

describe('NotFoundToolbarComponent', () => {
  let component: NotFoundToolbarComponent;
  let fixture: ComponentFixture<NotFoundToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
