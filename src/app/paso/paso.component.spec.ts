import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoComponent } from './Paso.component';

describe('PasoComponent', () => {
  let component: PasoComponent;
  let fixture: ComponentFixture<PasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
