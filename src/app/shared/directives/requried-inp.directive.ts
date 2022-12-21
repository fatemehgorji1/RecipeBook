import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input'
})
export class RequriedInpDirective implements OnInit {
  ngControl!: NgControl;
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    c: NgControl
  ) {
    this.ngControl = c;
  }
  ngOnInit(): void {

    const label = this.el.nativeElement.parentNode;


    if (this.ngControl.control &&
      this.ngControl.control.validator && this.el && this.el.nativeElement) {


      if (label.nodeName === 'LABEL') {
        const validator = this.ngControl.control.validator(<any>'');
        if (validator && validator['required']) {
          this.render.addClass(label, 'required');
        }
        else {
          this.render.removeClass(label, 'required');

        }
      }

    }
  }

}
