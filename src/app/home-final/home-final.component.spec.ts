import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFinalComponent } from './home-final.component';

describe('HomeFinalComponent', () => {
  let component: HomeFinalComponent;
  let fixture: ComponentFixture<HomeFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFinalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
