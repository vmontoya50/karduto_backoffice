import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFirmaComponent } from './view-firma.component';

describe('ViewFirmaComponent', () => {
  let component: ViewFirmaComponent;
  let fixture: ComponentFixture<ViewFirmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFirmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
