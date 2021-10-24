import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {fuseAnimations} from '../../@fuse/animations';
import {MailService} from '../mail/mail.service';
import {HttpClient} from '@angular/common/http';

interface Food {
    value: string;
    viewValue: string;
}

interface Transaccion {
    id: string;
    archivo_saliente?: string;
    estado?: string;
}

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PendientesComponent implements OnInit {

  constructor(
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private _matDialog: MatDialog,
      public api: ApiService,
      private http: HttpClient,
      private router: Router
  ) { }

  displayedColumns: string[] =
      [
          'tipo_identificacion_emisor',
          'emisor_name',
          'asignado_name',
          'cuenta_saliente',
          'cuenta_entrante',
          'tasa',
          'monto_entrante',
          'calculado',
          'accion'
      ];


  dataSource;
  dataEmpleado = new Array();

    displayFilter: Food[] = [
        {value: 'id', viewValue: 'id'},
        {value: 'name', viewValue: 'nombre'},
        {value: 'created_at', viewValue: 'Fecha creación'}
    ];

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('transacciones?estado=APRO')
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataEmpleado = this.dataSource;
          console.log('PORAPROBAR::', this.dataEmpleado );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void{

    this._fuseProgressBarService.show();
    this.api.get('transacciones?estado=APRO&page=' + $event.pageIndex)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataEmpleado = this.dataSource.data;
          console.log('REGCONTRATO::', this.dataEmpleado );
          this._fuseProgressBarService.hide();

        });

    console.log('NEXT', $event);
  }

   aprobar(row): any{

        const path = this.api.url + 'transacciones';
        const data: Transaccion = {
            id: row.id,
            estado: 'PEND',
        };

        this.http.put(path, data).subscribe(
            (r) => {
                console.log('confirmar r', r);
                this.dataTable();
                this.api.toast('open', 'Transaccion aprobada.');
            }
        );
    }

   cancelar(row): any{

        const path = this.api.url + 'transacciones';
        const data: Transaccion = {
            id: row.id,
            estado: 'RECH',
        };

        this.http.put(path, data).subscribe(
            (r) => {
                console.log('confirmar r', r);
                this.dataTable();
                this.api.toast('open', 'Transaccion rechazada.');
            }
        );
    }

  goToLink(url): void{

        window.open( this.api.base + url.archive, '_blank');
  }

   estadoIcon(name): any{
      let icon = '';

      if (name === 'APRO'){
          icon = 'check_circle_outline';
      }

      if (name === 'PEND'){
          icon = 'cancel';
      }
      console.log('!!!', name);
      console.log('!!!', icon);

      return icon;
  }

  // Nuevo empleado
  go(row): any{
    this.router.navigate(['contrato/nuevo/' + row.id]);
  }

  _setSearch($event): any{
    console.log('EVENT_FILTRO::', $event);
    if ($event){

      this.dataEmpleado = $event;

    }
  }

  npend(): void{
  }

  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();

  }
}
