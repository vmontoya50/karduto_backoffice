import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDrawFirmasComponent } from './modal-draw-firmas.component';

describe('ModalDrawFirmasComponent', () => {
  let component: ModalDrawFirmasComponent;
  let fixture: ComponentFixture<ModalDrawFirmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDrawFirmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDrawFirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
