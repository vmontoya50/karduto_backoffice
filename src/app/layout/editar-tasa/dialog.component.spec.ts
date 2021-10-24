import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTasaDialogComponent } from './dialog.component';

describe('ContatoNuevoDialogComponent', () => {
  let component: EditarTasaDialogComponent;
  let fixture: ComponentFixture<EditarTasaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTasaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTasaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
