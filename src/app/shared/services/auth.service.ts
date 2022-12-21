import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
interface IAuth {
  expires_in: string
  token_type: string
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClSArImXUXK_Q77Vxr_ULo3KT1BPcUEp8'

  constructor(
    private http: HttpClient
  ) { }
  signUp(email: string, password: string) {
    return this.http.post<IAuth>(this.url, {
      email: email,
      password: password
    })
  }
}

