import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../../../core/services/user';

import { Users } from './users';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;

  beforeEach(async () => {
    const userService = jasmine.createSpyObj<UserService>('UserService', ['getAll', 'delete']);
    userService.getAll.and.returnValue(of([]));
    userService.delete.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
