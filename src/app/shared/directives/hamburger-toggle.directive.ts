import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2
} from '@angular/core';
import { ShowDropDirective } from 'src/app/shared/directives/show-drop.directive';

@Directive({
  selector: '[appHamburgerToggle]'
})
export class HamburgerToggleDirective {

  @HostBinding('class.show') isActive: boolean = false;
  constructor(
    private el: ElementRef,
    private render: Renderer2,

  ) { }
  @HostListener('click') toggleActive() {

    this.isActive = !this.isActive;
    const div = this.el.nativeElement.querySelector('.navbar-collapse');

    if (div) {
      if (this.isActive) {
        this.render.addClass(div, 'show');
      }
      else {
        this.render.removeClass(div, 'show');
      }
    }

  }

}
