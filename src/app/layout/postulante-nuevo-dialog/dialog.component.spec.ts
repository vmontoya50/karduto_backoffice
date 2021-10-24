import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostulanteNuevoComponent } from './dialog.component';

describe('DialogPostulanteNuevoComponent', () => {
  let component: DialogPostulanteNuevoComponent;
  let fixture: ComponentFixture<DialogPostulanteNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPostulanteNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPostulanteNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
