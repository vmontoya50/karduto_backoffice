import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanteDialogComponent } from './dialog.component';

describe('VacanteDialogComponent', () => {
  let component: VacanteDialogComponent;
  let fixture: ComponentFixture<VacanteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacanteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
