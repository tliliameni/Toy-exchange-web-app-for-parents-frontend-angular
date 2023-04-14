import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedToyComponent } from './animated-toy.component';

describe('AnimatedToyComponent', () => {
  let component: AnimatedToyComponent;
  let fixture: ComponentFixture<AnimatedToyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedToyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedToyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
