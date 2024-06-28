import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListWindowComponent } from './user-list-window.component';

describe('UserListWindowComponent', () => {
  let component: UserListWindowComponent;
  let fixture: ComponentFixture<UserListWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
