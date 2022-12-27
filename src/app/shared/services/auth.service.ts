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
  registered?: boolean;

}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<any>(null);
  tokenExpiration: any;

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

  logOut() {//خارج میشود 

    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpiration) {
      clearTimeout(this.tokenExpiration);
    }
    this.tokenExpiration = null;
  }

  autoLogin() {
    //زمانی ک رفرش میکنیم توی حالت لاگین میماند

    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiration: string

    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiration)
    )

    if (loadedUser.token) {
      //معتبر بودن توکن
      this.user.next(loadedUser);
      const tokenExpiration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      if (tokenExpiration) {
        this.autoLogOut(tokenExpiration);
      }
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpiration = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //وارد شدن کاربر از طریق لاگین یا ثبت نام
    const expireDate = new Date(
      new Date().getTime() + expiresIn * 1000
    )
    const user = new User(
      email,
      userId,
      token,
      expireDate
    )

    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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

