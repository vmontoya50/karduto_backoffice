import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistroContratoComponent } from './resgistro-contrato.component';

describe('ResgistroContratoComponent', () => {
  let component: ResgistroContratoComponent;
  let fixture: ComponentFixture<ResgistroContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResgistroContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgistroContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
