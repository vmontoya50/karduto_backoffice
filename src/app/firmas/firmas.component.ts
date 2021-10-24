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
  selector: 'app-firmas',
  templateUrl: './firmas.component.html',
  styleUrls: ['./firmas.component.scss'],
    animations   : fuseAnimations
})
export class FirmasComponent implements OnInit {



    displayFilter: Food[] = [
        {value: 'nombre', viewValue: 'Nombre'},
        {value: 'apellido', viewValue: 'Apellido'},
        {value: 'mail_salida', viewValue: 'Correo'},
        {value: 'documento_numero', viewValue: 'N° Documento'}
    ];

    copy;

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
  ['created_at',
  'nombre',
  'mail_salida',
  'accion'];


  dataSource;
  dataFirmas = new Array();

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('firma')
        .subscribe( data => {

          // console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataFirmas = this.dataSource.data;
          // console.log('POSTULANTE::', this.dataFirmas );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void{

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('firma?page=' + page)
            .subscribe( data => {

                // console.log('CONSULTA::', data);
                this.dataSource = data;

                this.dataFirmas = this.dataSource.data;
                // console.log('POSTULANTE::', this.dataFirmas );
                this._fuseProgressBarService.hide();

            });

        console.log('NEXT', $event);
    }

    
  goToLink(url): void{

    window.open(  url.archivo_firma_url, '_blank');
  }

    _delete(id): void{

        this.api.delete('firma/' + id)
            .subscribe( data => {
                console.log('DELETE::', data);
                this.dataTable();
            });
    }

    _firmar(_id): void{

        this.api.post('firma' , { id: _id })
            .subscribe( data => {
                console.log('FIRMAR::', data);
                // this.dataTable();
            });
    }

    // Nuevo firmas
   newFirmas(): any{

   }

   estadoIcon(name): any{
    let icon = '';

    if (name !== null){
        icon = 'check_circle_outline';
    }

    if (name === 'APRO'){
        icon = 'schedule';
    }

    if (name === null){
        icon = 'schedule';
    }

    if (name === 'RECH'){
        icon = 'cancel';
    }

    return icon;
}

estadoColor(name): any{
  let icon: any = '';

  if (name !== null){
      icon = '#8BD649';
  }

  if (name === 'APRO'){
      icon = '#FFC107';
  }

  if (name === null){
      icon = '#FFC107';
  }

  if (name === 'RECH'){
      icon = '#CB4B16' ;
  }
  return icon;
}

copyText(val: string): any{

  let selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  this.copy = true;
  setTimeout(()=> {
    this.copy = false;
  }, 2000);

  this.api.toast('open', 'Url firma copiado en el porta papeles.', 2000, 'success');

}


    _setSearch($event): any{
      // console.log('EVENT_FILTRO::', $event);
      if ($event){

          this.dataFirmas = $event;

      }
    }

    // tslint:disable-next-line:typedef
  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();
    /*this.api.onFirmasChanged.subscribe( x => {
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
