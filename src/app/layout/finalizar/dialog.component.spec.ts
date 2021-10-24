import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarDialogComponent } from './dialog.component';

describe('FinalizarDialogComponent', () => {
  let component: FinalizarDialogComponent;
  let fixture: ComponentFixture<FinalizarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
