import { Component, OnInit } from '@angular/core';
import { FirmasLibService } from '../../firmas-lib.service';

@Component({
  selector: 'lib-view-firma',
  templateUrl: './view-firma.component.html',
  styleUrls: ['./view-firma.component.css']
})
export class ViewFirmaComponent implements OnInit {

  constructor(
    public firmasService: FirmasLibService
  ) { }

  ngOnInit() {
  }

}
