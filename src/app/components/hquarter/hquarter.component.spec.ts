import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HquarterComponent } from './hquarter.component';

describe('HquarterComponent', () => {
  let component: HquarterComponent;
  let fixture: ComponentFixture<HquarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HquarterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
