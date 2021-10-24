import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.scss']
})
export class SalirComponent implements OnInit {

  constructor(
      private api: ApiService,
      private router: Router
  ) {

  }

  ngOnInit() {

      this.api.out();

  }

}
