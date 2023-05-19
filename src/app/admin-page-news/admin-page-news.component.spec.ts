import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageNewsComponent } from './admin-page-news.component';

describe('AdminPageNewsComponent', () => {
  let component: AdminPageNewsComponent;
  let fixture: ComponentFixture<AdminPageNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
