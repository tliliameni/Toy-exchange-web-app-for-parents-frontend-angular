import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageArticleComponent } from './admin-page-article.component';

describe('AdminPageArticleComponent', () => {
  let component: AdminPageArticleComponent;
  let fixture: ComponentFixture<AdminPageArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
