import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthFacade } from '../../../core/facades/auth.facade';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    const authFacade = jasmine.createSpyObj<AuthFacade>('AuthFacade', ['login']);
    authFacade.login.and.returnValue(
      of({ token: 'mock-token-test', user: { id: 1, name: 'Test', email: 'test@example.com' } }),
    );

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthFacade, useValue: authFacade },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
