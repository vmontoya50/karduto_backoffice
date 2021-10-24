import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoNuevoDialogComponent } from './dialog.component';

describe('ContatoNuevoDialogComponent', () => {
  let component: ContatoNuevoDialogComponent;
  let fixture: ComponentFixture<ContatoNuevoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoNuevoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoNuevoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
