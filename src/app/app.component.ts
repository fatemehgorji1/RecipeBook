import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedPage!: number;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.invalidate();
      }
    })
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.invalidate();
    });

    this.authService.autoLogin();

  }

  invalidate() {
    if (this.router.url.endsWith('/auth')) {
      this.selectedPage = 0;
    }
    if (this.router.url.endsWith('/recipes')) {
      this.selectedPage = 1;
    }
    if (this.router.url.endsWith('/shoppingList')) {
      this.selectedPage = 2;
    }
  }
}

