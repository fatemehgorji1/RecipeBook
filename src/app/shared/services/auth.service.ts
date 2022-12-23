import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
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
  private urlSignUp: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClSArImXUXK_Q77Vxr_ULo3KT1BPcUEp8'
  private urlLogin: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClSArImXUXK_Q77Vxr_ULo3KT1BPcUEp8';
  constructor(
    private http: HttpClient
  ) { }

  signUp(email: string, password: string) {
    return this.http.post<IAuth>(this.urlSignUp, {
      email: email,
      password: password,
      returnSecureToken: true

    }).pipe(catchError(errorRes => {
      let errorMessage = 'an error unknown occurred';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email is already used';
      }
      return throwError(errorMessage);
    }))
  }

  login(email: string, password: string) {
    return this.http.post<IAuth>(this.urlLogin, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {

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
      }
      return throwError(errorMessage);
    }))
  }


}

