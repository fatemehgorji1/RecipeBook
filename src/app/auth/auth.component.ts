import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, IAuth } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isModeTextBtn = false;
  isSpinner = false;
  form!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ])
    })
  }

  onChangeModeBtn() {
    this.isModeTextBtn = !this.isModeTextBtn;
  }

  onSubmit() {

    let authObs!: Observable<IAuth>;

    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    if (this.form.invalid) {
      return;
    }

    this.isSpinner = true;

    if (this.isModeTextBtn === true) {
      authObs = this.authService.signUp(email, password);
    }
    else {
      authObs = this.authService.login(email, password);
    }

    authObs.subscribe(res => {

      console.log(res);
      this.router.navigate(['/recipes']);
      this.successMessage = ' success ' + res.email;
      this.isSpinner = false;
    },
      errorRes => {

        this.errorMessage = errorRes;
        this.isSpinner = false;

      })

    this.form.reset();
  }

}
