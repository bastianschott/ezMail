import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntryToolbarComponent } from './edit-entry-toolbar.component';

describe('EditEntryToolbarComponent', () => {
  let component: EditEntryToolbarComponent;
  let fixture: ComponentFixture<EditEntryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntryToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
