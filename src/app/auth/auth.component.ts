import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

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


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required
      ])
    })
  }
  onChangeModeBtn() {
    this.isModeTextBtn = !this.isModeTextBtn;
  }
  onSubmit() {

    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    if (this.form.invalid) {
      return;
    }
    this.isSpinner = true;

    if (this.isModeTextBtn) {

      this.authService.signUp(email, password)
        .subscribe(res => {
          console.log(res);
          this.isSpinner = false;
        },
          errorRes => {
            this.error = errorRes;
            this.isSpinner = false;
          })

    }
    else {

      this.authService.login(email, password).subscribe(res => {
        console.log(res);
        this.isSpinner = false;
      },
        errorRes => {
          console.log(errorRes);
          this.error = errorRes;
          this.isSpinner = false;
        })

    }

    this.form.reset();
  }

}
