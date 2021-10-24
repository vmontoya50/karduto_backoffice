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
  selector: 'app-postulante',
  templateUrl: './postulante.component.html',
  styleUrls: ['./postulante.component.scss'],
    animations   : fuseAnimations
})
export class PostulanteComponent implements OnInit {



    displayFilter: Food[] = [
        {value: 'id', viewValue: 'id'},
        {value: 'codigo', viewValue: 'referencia'},
        {value: 'nombres', viewValue: 'nombres'},
        {value: 'apellido_paterno', viewValue: 'apellido_paterno'},
        {value: 'apellido_materno', viewValue: 'apellido_materno'},
        {value: 'rut', viewValue: 'rut'},
        {value: 'pasaporte', viewValue: 'pasaporte'},
        {value: 'email', viewValue: 'email'},
        {value: 'nacionalidad', viewValue: 'nacionalidad'},
        {value: 'celular', viewValue: 'celular'},
        {value: 'fecha_nacimiento', viewValue: 'fecha nacimiento'},
        {value: 'estado_civil', viewValue: 'estado civil'},
        {value: 'n_cuenta', viewValue: 'numero de cuenta'},
        {value: 'banco', viewValue: 'banco'},
        {value: 'calle', viewValue: 'calle'},
        {value: 'numero_direccion', viewValue: 'numero direccion'},
        {value: 'comuna', viewValue: 'comuna'},
        {value: 'ciudad', viewValue: 'ciudad'},
        {value: 'region', viewValue: 'region'},
        {value: 'salud', viewValue: 'salud'},
        {value: 'afp', viewValue: 'afp'},
        {value: 'codigo_banco', viewValue: 'codigo banco'},
        {value: 'observaciones', viewValue: 'observaciones'},
        {value: 'disponibilidad', viewValue: 'disponibilidad'},
        {value: 'disponibilidad_turno', viewValue: 'disponibilidad turno'},
        {value: 'experiencia', viewValue: 'experiencia'},
        {value: 'talla_polera', viewValue: 'talla polera'},
        {value: 'talla_pantalon', viewValue: 'talla pantalon'},
        {value: 'talla_zapato', viewValue: 'talla zapato'},
        {value: 'talla_polar', viewValue: 'talla polar'},
        {value: 'fecha_poatulacion', viewValue: 'fecha postulacion'},
        {value: 'telefono', viewValue: 'telefono'},
        {value: 'identidad', viewValue: 'identidad'},
        {value: 'tienda', viewValue: 'tienda'},
        {value: 'turno', viewValue: 'turno'},
        {value: 'activo', viewValue: 'activo'}
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
  'nombres',
  'apellido_paterno',
  'apellido_materno',
  'identificacion',
  'fecha_postulacion'];


  dataSource;
  dataPostulante = new Array();

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('postulante')
        .subscribe( data => {

          // console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataPostulante = this.dataSource.data;
          // console.log('POSTULANTE::', this.dataPostulante );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void{

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('postulante?page=' + page)
            .subscribe( data => {

                // console.log('CONSULTA::', data);
                this.dataSource = data;

                this.dataPostulante = this.dataSource.data;
                // console.log('POSTULANTE::', this.dataPostulante );
                this._fuseProgressBarService.hide();

            });

        console.log('NEXT', $event);
    }

    // Nuevo postulante
   newPostulante(): any{

   }

    _setSearch($event): any{
      // console.log('EVENT_FILTRO::', $event);
      if ($event){

          this.dataPostulante = $event;

      }
    }

    // tslint:disable-next-line:typedef
  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();
    this.api.onPostulanteChanged.subscribe( x => {
        // console.log('CAMBIOBVSJ::', x);
        this.dataTable();
    });

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
