import { Component } from '@angular/core';
import { FirmasLibService } from 'app/firma-modal/firmas-lib.service';


@Component({
  selector: 'firma-externa',
  templateUrl: './firma-externa.component.html'
})
export class FirmaExterna {
  title = 'firmas-module';
  constructor(
    public firmasService: FirmasLibService
  ) {}
}