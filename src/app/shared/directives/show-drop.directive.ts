import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appShowDrop]'
})

export class ShowDropDirective {

  @HostBinding('class.show') show: boolean = false;

  @HostListener('click') toggleOpen() {
    this.show = !this.show;
    const div = this.el.nativeElement.querySelector('.dropdown-menu');

    if (div) {
      if (this.show) {
        this.render.addClass(div, 'show');
      } else {
        this.render.removeClass(div, 'show');
      }
    }

  }
  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

}
