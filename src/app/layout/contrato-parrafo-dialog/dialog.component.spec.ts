import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContratoParrafoComponent } from './dialog.component';

describe('DialogContratoParrafoComponent', () => {
  let component: DialogContratoParrafoComponent;
  let fixture: ComponentFixture<DialogContratoParrafoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContratoParrafoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContratoParrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
