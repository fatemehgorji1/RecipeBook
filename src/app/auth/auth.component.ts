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
  form!: FormGroup;
  isSpinner = false;
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
    if (this.form.invalid) {
      return;
    }
    this.isSpinner = true;
    if (this.isModeTextBtn) {

      this.authService.signUp(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      ).subscribe(res => {
        this.isSpinner = false;
        console.log(res);
      }, errorRes => {
        this.isSpinner = false;
        console.log(errorRes);
      })

    }
    else {
      //...
      this.isSpinner = false
    }
    //console.log(this.form.value);
    this.form.reset();
  }

}
