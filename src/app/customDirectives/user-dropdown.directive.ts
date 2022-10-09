import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appUserDropdown]'
})
export class UserDropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

}
