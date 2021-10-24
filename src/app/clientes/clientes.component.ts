import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../usuarios/usuarios.service';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {fuseAnimations} from '../../@fuse/animations';
import {FuseConfigService} from '../../@fuse/services/config.service';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
    animations   : fuseAnimations
})
export class ClientesComponent implements OnInit {



    displayFilter: Food[] = [
        {value: 'codigo', viewValue: 'codigo'},
        {value: 'descripcion', viewValue: 'descripcion'}
    ];

  constructor(
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private _matDialog: MatDialog,
      private api: ApiService,
      private router: Router
  ) {

  }

  displayedColumns: string[] =
  ['id',
  'descripcion',
  'accion'];


  dataSource;
  dataClientes = new Array();

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('cliente/paginado')
        .subscribe( data => {

          // console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataClientes = this.dataSource.data;
          // console.log('POSTULANTE::', this.dataClientes );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void{

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('cliente/paginado?page=' + page)
            .subscribe( data => {

                // console.log('CONSULTA::', data);
                this.dataSource = data;

                this.dataClientes = this.dataSource.data;
                // console.log('POSTULANTE::', this.dataClientes );
                this._fuseProgressBarService.hide();

            });

        console.log('NEXT', $event);
    }

    _delete(id): void{

        this.api.delete('cliente/' + id)
            .subscribe( data => {
                console.log('DELETE::', data);
                this.dataTable();
            });
    }

    // Nuevo clientes
   newClientes(): any{

   }

    _setSearch($event): any{
      // console.log('EVENT_FILTRO::', $event);
      if ($event){

          this.dataClientes = $event;

      }
    }

    // tslint:disable-next-line:typedef
  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();
    /*this.api.onClientesChanged.subscribe( x => {
        // console.log('CAMBIOBVSJ::', x);
        this.dataTable();
    });*/

  }


  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void
  {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
