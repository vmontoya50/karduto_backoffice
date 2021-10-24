import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { finiquitoComponent } from './finiquito.component';

describe('finiquitoComponent', () => {
  let component: finiquitoComponent;
  let fixture: ComponentFixture<finiquitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ finiquitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(finiquitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
