import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CancomponentDeactive {
  canDeactiveComp: () => any
}
@Injectable({
  providedIn: 'root'
})
export class CanDeactiveGaurdService implements CanDeactivate<CancomponentDeactive> {

  constructor() { }
  canDeactivate(component: CancomponentDeactive, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactiveComp();
  }

}
