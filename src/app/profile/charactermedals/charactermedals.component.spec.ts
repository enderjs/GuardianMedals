import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactermedalsComponent } from './charactermedals.component';

describe('CharactermedalsComponent', () => {
  let component: CharactermedalsComponent;
  let fixture: ComponentFixture<CharactermedalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactermedalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactermedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
