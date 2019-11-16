import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMailinglistComponent } from './edit-mailinglist.component';

describe('EditMailinglistComponent', () => {
  let component: EditMailinglistComponent;
  let fixture: ComponentFixture<EditMailinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMailinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMailinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
