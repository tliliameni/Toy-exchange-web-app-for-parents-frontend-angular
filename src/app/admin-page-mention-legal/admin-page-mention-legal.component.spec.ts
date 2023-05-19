import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageMentionLegalComponent } from './admin-page-mention-legal.component';

describe('AdminPageMentionLegalComponent', () => {
  let component: AdminPageMentionLegalComponent;
  let fixture: ComponentFixture<AdminPageMentionLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageMentionLegalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageMentionLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
