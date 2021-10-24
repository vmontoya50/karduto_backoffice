import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalDrawFirmasComponent } from '../components/modal-draw-firmas/modal-draw-firmas.component';

@Directive({
  selector: '[libOpenFirma]'
})
export class OpenFirmaDirective {

  constructor(
    private dialog: MatDialog
  ) { }
  @HostListener('click', ['$event']) onClick($event) {
    this.dialog.open(ModalDrawFirmasComponent, {
      width: '50%',
      height: '80%'
      // data: {name: this.name, animal: this.animal}
    });
  }

}
