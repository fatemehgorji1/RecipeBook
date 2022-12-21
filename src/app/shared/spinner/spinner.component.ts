import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: [
    `
  .spinner {
    position : absolute;
    top: 25%;
    left : 50%;
   }
    `
  ]
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
