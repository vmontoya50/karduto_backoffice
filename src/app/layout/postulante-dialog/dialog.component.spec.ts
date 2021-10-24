import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostulanteComponent } from './dialog.component';

describe('DialogPostulanteComponent', () => {
  let component: DialogPostulanteComponent;
  let fixture: ComponentFixture<DialogPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
