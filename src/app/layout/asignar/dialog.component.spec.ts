import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarDialogComponent } from './dialog.component';

describe('AsignarDialogComponent', () => {
  let component: AsignarDialogComponent;
  let fixture: ComponentFixture<AsignarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
