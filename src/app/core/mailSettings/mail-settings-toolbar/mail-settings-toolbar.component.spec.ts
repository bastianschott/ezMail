import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSettingsToolbarComponent } from './mail-settings-toolbar.component';

describe('MailSettingsToolbarComponent', () => {
  let component: MailSettingsToolbarComponent;
  let fixture: ComponentFixture<MailSettingsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSettingsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSettingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
