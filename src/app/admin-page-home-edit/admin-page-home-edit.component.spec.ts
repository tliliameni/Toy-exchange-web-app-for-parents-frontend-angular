import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageHomeEditComponent } from './admin-page-home-edit.component';

describe('AdminPageHomeEditComponent', () => {
  let component: AdminPageHomeEditComponent;
  let fixture: ComponentFixture<AdminPageHomeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageHomeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageHomeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
