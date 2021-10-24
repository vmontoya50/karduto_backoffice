import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFirmasComponent } from './header-firmas.component';

describe('HeaderFirmasComponent', () => {
  let component: HeaderFirmasComponent;
  let fixture: ComponentFixture<HeaderFirmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFirmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
