import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { cargaComponent } from './carga.component';

describe('cargaComponent', () => {
  let component: cargaComponent;
  let fixture: ComponentFixture<cargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ cargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(cargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
