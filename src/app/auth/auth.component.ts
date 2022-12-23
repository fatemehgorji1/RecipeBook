import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, IAuth } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isModeTextBtn = false;
  isSpinner = false;
  form!: FormGroup;
  error: string = '';
  successMessage = '';



  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
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

    if (this.isModeTextBtn) {

      authObs = this.authService.signUp(email, password);

    }
    else {

      authObs = this.authService.login(email, password);

    }

    authObs.subscribe(res => {
      console.log(res);

      this.isSpinner = false;

    },
      errorRes => {
        this.error = errorRes;
        this.isSpinner = false;
      })

    this.form.reset();
  }

}
