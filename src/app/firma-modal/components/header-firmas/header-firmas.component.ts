import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalDrawFirmasComponent } from '../modal-draw-firmas/modal-draw-firmas.component';

@Component({
  selector: 'lib-header-firmas',
  templateUrl: './header-firmas.component.html',
  styleUrls: ['./header-firmas.component.css']
})
export class HeaderFirmasComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  // openDialog(): void {
  //   this.dialog.open(ModalDrawFirmasComponent, {
  //     width: '50%',
  //     height: '80%'
  //     // data: {name: this.name, animal: this.animal}
  //   });

  // }

  ngOnInit() {
  }

}
