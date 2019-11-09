import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaillistDialogComponent } from './new-maillist-dialog.component';

describe('NewMaillistDialogComponent', () => {
  let component: NewMaillistDialogComponent;
  let fixture: ComponentFixture<NewMaillistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMaillistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMaillistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
