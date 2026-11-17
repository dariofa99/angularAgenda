import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('sends the stored token as a Bearer authorization header', () => {
    sessionStorage.setItem('auth_token', 'mock-token-test');

    http.get('/api/users').subscribe();

    const request = httpTestingController.expectOne('/api/users');
    expect(request.request.headers.get('Authorization')).toBe('Bearer mock-token-test');
    request.flush([]);
  });

  it('does not add an authorization header when no token is stored', () => {
    http.get('/api/users').subscribe();

    const request = httpTestingController.expectOne('/api/users');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    request.flush([]);
  });
});
