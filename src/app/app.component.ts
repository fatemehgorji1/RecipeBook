import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedPage!: number;
  constructor(
    private router: Router
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

  }

  invalidate() {
    if (this.router.url.endsWith('/recipes')) {
      this.selectedPage = 0;
    }
    if (this.router.url.endsWith('/shoppingList')) {
      this.selectedPage = 1;
    }
  }
}

