import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';

import { AuthService, IAuth } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild(PlaceholderDirective) alert !: PlaceholderDirective;
  isModeTextBtn = false;
  isSpinner = false;
  form!: FormGroup;
  errorMessage: string = '';;
  successMessage: string = '';
  alertSub !: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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

  //events

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
        // this.onHandlerError(errorRes);
        this.errorMessage = errorRes;
        this.isSpinner = false;

      })

    this.form.reset();
  }

  onClose() {
    this.errorMessage = '';
  }
  // private onHandlerError(message: string) {

  //   const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  //   const vcRefAlert = this.alert.vcRef;
  //   vcRefAlert.clear();

  //   const componentRef = vcRefAlert.createComponent(alertFactory);

  //   componentRef.instance.message = message;
  //   this.alertSub = componentRef.instance.close.subscribe(() => {
  //     this.alertSub.unsubscribe();
  //     vcRefAlert.clear();
  //   })

  // }

}
