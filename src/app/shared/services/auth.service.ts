import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { User } from 'src/app/shared/services/user';
interface UserAuth {
  password: string;
  email: string;
}
export interface Auth {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<any>(null);
  tokenExpiration = null;

  private urlSignUp: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClSArImXUXK_Q77Vxr_ULo3KT1BPcUEp8'
  private urlLogin: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClSArImXUXK_Q77Vxr_ULo3KT1BPcUEp8';
  expersionDuration: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  signUp(user: UserAuth) {

    return this.http.post<Auth>(this.urlSignUp, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      this.handleAuth(
        resData.email,
        resData.localId,
        +resData.expiresIn,
        resData.idToken
      )
    }), catchError(error => {
      return this.handleError(error);
    }))
  }

  login(user: UserAuth) {

    return this.http.post<Auth>(this.urlLogin, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(tap((resData: Auth) => {
      this.handleAuth(
        resData.email,
        resData.localId,
        +resData.expiresIn,
        resData.idToken
      )
    }), catchError(error => {
      return this.handleError(error);
    }))

  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.expersionDuration) {
      clearTimeout(this.expersionDuration);
    }
    this.expersionDuration = null;
  }
  autologin() {

    const userData: {
      email: string
      id: string;
      _token: string;
      _tokenExpersionDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }
    const loadPerson = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpersionDate)
    )
    const expersionduration = new Date(userData._tokenExpersionDate).getTime() - new Date().getTime();
    if (loadPerson) {
      this.user.next(loadPerson);
      this.autoLogOut(expersionduration);
    }
  }
  autoLogOut(timer: number) {
    this.expersionDuration = setTimeout(() => {
      this.logOut();
    }, timer);
  }
  private handleAuth(email: string, localId: string, expiresIn: number, idToken: string) {
    const tokenExpersionDate = new Date(new Date().getTime() + expiresIn * 1000)
    const person = new User(
      email,
      localId,
      idToken,
      tokenExpersionDate
    )
    this.user.next(person);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(person));
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

