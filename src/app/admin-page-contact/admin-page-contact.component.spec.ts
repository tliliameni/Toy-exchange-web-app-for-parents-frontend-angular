import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageContactComponent } from './admin-page-contact.component';

describe('AdminPageContactComponent', () => {
  let component: AdminPageContactComponent;
  let fixture: ComponentFixture<AdminPageContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
