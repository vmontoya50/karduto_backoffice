import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmasComponent } from './firmas.component';

describe('FirmasComponent', () => {
  let component: FirmasComponent;
  let fixture: ComponentFixture<FirmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
