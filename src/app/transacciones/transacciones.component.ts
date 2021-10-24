import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {fuseAnimations} from '../../@fuse/animations';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TransaccionesComponent implements OnInit {

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
        'direccion',
        'tipo_identificacion_emisor',
        'emisor_name',
        'owner_name',
        'asignado_name',
        'cuenta_saliente',
        'cuenta_entrante',
        'tasa',
        'monto_entrante',
        'calculado',
        'fecha',
        'accion'
      ];


  dataSource;
  dataTrans = new Array();
  user;

    displayFilter: Food[] = [
        {value: 'id', viewValue: 'id'},
        {value: 'emisor_name', viewValue: 'Nombre del emisor'},
        {value: 'tasa', viewValue: 'Tasa'},
        {value: 'created_at', viewValue: 'Fecha creación'}
    ];

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('transacciones/index?userId=' + this.user.id)
        .subscribe( result => {

          this.dataSource = result;
          this.dataTrans = this.dataSource.data;
          console.log('TRANSACCIONES::', this.dataTrans );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void{
    if ($event.pageIndex != null){

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('transacciones/index?page=' + page + '&userId=' + this.user.id)
            .subscribe( data => {

                console.log('CONSULTA::', data);
                this.dataSource = data;

                this.dataTrans = this.dataSource.data;
                console.log('REGCONTRATO::', this.dataTrans );
                this._fuseProgressBarService.hide();

            });

    }

    console.log('NEXT', $event);
  }

  goToLink(url): void{

        window.open( this.api.base + url.archive, '_blank');
  }

  // Nuevo empleado
  go(row): any{
    this.router.navigate(['transacciones/ver/' + row.id]);
  }


  estadoIcon(name): any{
        let icon = '';

        if (name === 'FINA'){
            icon = 'check_circle_outline';
        }

        if (name === 'APRO'){
            icon = 'schedule';
        }

        if (name === 'PEND'){
            icon = 'schedule';
        }

        if (name === 'RECH'){
            icon = 'cancel';
        }

        return icon;
  }
  estadoColor(name): any{
      let icon: any = '';

      if (name === 'FINA'){
          icon = '#8BD649';
      }

      if (name === 'APRO'){
          icon = '#FFC107';
      }

      if (name === 'PEND'){
          icon = '#FFC107';
      }

      if (name === 'RECH'){
          icon = '#CB4B16' ;
      }
      return icon;
  }

  _setSearch($event): any{
    console.log('EVENT_FILTRO::', $event);
    if ($event){

      this.dataTrans = $event;
      this.dataSource.data = $event;

    }
  }

  ngOnInit() {
      this.api.onUserChanged.subscribe( user => {
          console.log('USERSTORAGE::', user);
          this.user = user;
      });
    // Consulto los datos de la tabla
    this.dataTable();

  }
}
