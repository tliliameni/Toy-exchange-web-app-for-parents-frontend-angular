import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDialogueComponent } from './avatar-dialogue.component';

describe('AvatarDialogueComponent', () => {
  let component: AvatarDialogueComponent;
  let fixture: ComponentFixture<AvatarDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
