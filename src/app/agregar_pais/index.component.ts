import { Component, OnInit } from '@angular/core';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-agregar-moneda-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AgregarPaisComponent implements OnInit {

  constructor(
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private _matDialog: MatDialog,
      public api: ApiService,
      private router: Router
  ) { }

  displayedColumns: string[] =
      [
        'nombre',
        'accion'
      ];


  dataSource;
  dataMonedas = new Array();

    displayFilter: Food[] = [
        {value: 'nombre', viewValue: 'nombre'},
        {value: 'created_at', viewValue: 'Fecha creación'}
    ];

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('pais')
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataMonedas = this.dataSource.data;
          console.log('PAIS::', this.dataMonedas );
          this._fuseProgressBarService.hide();

        });
  }

  // Eliminar
  delete(id): void{

    this._fuseProgressBarService.show();
    this.api.delete('pais/' + id)
        .subscribe( data => {
          console.log('DELETE::', data);
          this.dataTable();
          this._fuseProgressBarService.hide();
        });
  }

  next($event): void{

    this._fuseProgressBarService.show();
    this.api.get('pais?page=' + $event.pageIndex)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataMonedas = this.dataSource.data;
          console.log('REGCONTRATO::', this.dataMonedas );
          this._fuseProgressBarService.hide();

        });

    console.log('NEXT', $event);
  }

  goToLink(url): void{

        window.open( this.api.base + url.archive, '_blank');
  }

  // Nuevo empleado
  go(row): any{
    this.router.navigate(['contrato/nuevo/' + row.id]);
  }

  _setSearch($event): any{
    console.log('EVENT_FILTRO::', $event);
    if ($event){

      this.dataMonedas = $event;

    }
  }

  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();

  }
}
