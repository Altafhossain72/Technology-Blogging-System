import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {FbAuthResponse, User} from '../../../shared/interfaces/interfaces';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  get token(): string | null {
    const expireDate = new Date(localStorage.getItem('expiresIn'));
    if (new Date().getTime() > expireDate.getTime()) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('token');
    }
  }

// Устанавливаем user.returnSecureToken = true, что бы получить вместе с token - поле expiresIn
  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

// Сохраняем токен в localStorage, если response != null, иначе чистим localStorage.
  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + (+response.expiresIn * 1000) );
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('expiresIn', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

// Приватный метод для перехвата ошибок, который передаем в catchError(), в методе login() > .pipe( catchError( __ ) )
  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Incorrect password');
        break;
    }
    return throwError(message);
    // const {message} = error.error.error;
  }
}
