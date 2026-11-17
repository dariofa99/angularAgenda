import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../../../core/services/user';

import { UserForm } from './user-form';

describe('UserForm', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;

  beforeEach(async () => {
    const userService = jasmine.createSpyObj<UserService>(
      'UserService',
      ['getById', 'create', 'update'],
    );
    userService.getById.and.returnValue(
      of({ id: 1, name: 'Test', email: 'test@example.com', password: 'secret123' }),
    );
    userService.create.and.returnValue(
      of({ id: 1, name: 'Test', email: 'test@example.com', password: 'secret123' }),
    );
    userService.update.and.returnValue(
      of({ id: 1, name: 'Test', email: 'test@example.com', password: 'secret123' }),
    );

    await TestBed.configureTestingModule({
      imports: [UserForm],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
