import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { User } from 'src/app/user';
export interface IAuth {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;

}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<any>(null);
  private urlSignUp: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClSArImXUXK_Q77Vxr_ULo3KT1BPcUEp8'
  private urlLogin: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClSArImXUXK_Q77Vxr_ULo3KT1BPcUEp8';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  signUp(email: string, password: string) {

    return this.http.post<IAuth>(this.urlSignUp, {
      email: email,
      password: password,
      returnSecureToken: true

    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn

      )
    }))
  }

  login(email: string, password: string) {
    return this.http.post<IAuth>(this.urlLogin, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn

      )
    }))
  }
  logOut() {
    if (this.user) {
      this.user.next(null);
      this.router.navigate(['/auth']);

    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const refreshToken = new Date(
      new Date().getTime() + +expiresIn * 1000
    )
    const user = new User(
      email,
      userId,
      token,
      refreshToken
    )
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {

    let errorMessage = 'an error unknown occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {

      case 'INVALID_PASSWORD':
        errorMessage = 'The password entered is not correct';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The email entered was not found';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Email is already used';
        break;
    }
    return throwError(errorMessage);
  }
}

