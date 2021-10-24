import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostulanteEditComponent } from './dialog.component';

describe('DialogPostulanteEditComponent', () => {
  let component: DialogPostulanteEditComponent;
  let fixture: ComponentFixture<DialogPostulanteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPostulanteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPostulanteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
