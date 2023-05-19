import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsAdminComponent } from './about-us-admin.component';

describe('AboutUsAdminComponent', () => {
  let component: AboutUsAdminComponent;
  let fixture: ComponentFixture<AboutUsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
