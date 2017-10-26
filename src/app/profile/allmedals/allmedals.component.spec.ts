import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmedalsComponent } from './allmedals.component';

describe('AllmedalsComponent', () => {
  let component: AllmedalsComponent;
  let fixture: ComponentFixture<AllmedalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllmedalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
