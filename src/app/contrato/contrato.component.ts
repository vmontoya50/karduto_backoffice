import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ApiService } from 'app/api.service';
import {fuseAnimations} from '../../@fuse/animations';

interface Contrato {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ContratoComponent implements OnInit {

  displayFilter: Contrato[] = [
    {value: 'id', viewValue: 'id'},
    {value: 'codigo', viewValue: 'referencia'},
    {value: 'nombre', viewValue: 'nombre'}
];


  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _fuseProgressBarService: FuseProgressBarService,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) { }

  displayedColumns: string[] =
  [
   'id',
   'name'
  ];


  dataSource;
  dataEmpleado = new Array();

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('contrato')
        .subscribe( data => {

          // console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataEmpleado = this.dataSource.data;
          // console.log('CONTRATO::', this.dataEmpleado );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void{

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('contrato?page=' + page)
            .subscribe( data => {

                // console.log('CONSULTA::', data);
                this.dataSource = data;

                this.dataEmpleado = this.dataSource.data;
                // console.log('EMPLEADO::', this.dataEmpleado );
                this._fuseProgressBarService.hide();

            });

        console.log('NEXT', $event);
    }


    // Nuevo empleado
   go(row): any{
       this.router.navigate(['contrato/nuevo/' + row.id]);
   }

    _setSearch($event): any{
        // console.log('EVENT_FILTRO::', $event);
        if ($event){

            this.dataEmpleado = $event;

        }
    }

  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();

  }

}
