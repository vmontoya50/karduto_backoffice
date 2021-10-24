import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ApiService } from 'app/api.service';
import {fuseAnimations} from '../../@fuse/animations';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// tslint:disable-next-line:class-name
interface finiquito {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-finiquito',
  templateUrl: './finiquito.component.html',
  styleUrls: ['./finiquito.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class finiquitoComponent implements OnInit {

  displayFilter: finiquito[] = [
    {value: 'contenido', viewValue: 'Documento'},
    {value: 'name', viewValue: 'Nombre'}
];



  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _fuseProgressBarService: FuseProgressBarService,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private http: HttpClient,
  ) { }

  displayedColumns: string[] =
  [
   'id',
   'name',
   'created_at',
   'fecha_inicio',
   'fecha_fin'
  ];


  dataSource;
  dataEmpleado = new Array();
  dataFiniquito = new Array();

  // Me todos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('regfiniquito')
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataFiniquito = this.dataSource.data;
          console.log('finiquito::', this.dataFiniquito );
          this._fuseProgressBarService.hide();

        });
  }

    next($event): void{

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('regfiniquito?page=' + page)
            .subscribe( data => {

                console.log('CONSULTA::', data);
                this.dataSource = data;

                this.dataFiniquito = this.dataSource.data;
                console.log('FINIQUITO::', this.dataFiniquito );
                this._fuseProgressBarService.hide();

            });

        console.log('NEXT', $event);
  }

  goToLink(url): void{

        window.open( this.api.base + url.archive, '_blank');
  }
  goFile(url): void{

        window.open( this.api.url + 'feriado/export', '_blank');
  }

    // Formateo la fecha
    fech_formar(fecha): string{
      const format = fecha.split('-');

      return format[2] + '/' + format[1] + '/' + format[0];
    }

    // Nuevo empleado
   go(row): any{
       this.router.navigate(['finiquito/nuevo/' + row.id]);
   }

    _setSearch($event): any{
        console.log('EVENT_FILTRO::', $event);
        if ($event){

            this.dataFiniquito = $event;

        }
    }

    _setFile(event): any{
        console.log('FILE::', event);

        const files = event.srcElement.files
        if (!files) {
            return;
        }

        const path = this.api.url + 'feriado/import';
        const formData: FormData = new FormData();

        for (let i = 0; i < files.length; i++) {

            formData.append('archivo', files[i], files[i].name);

        }
        // formData.append('data', JSON.stringify(data));
        this.http.post(path, formData).subscribe(
                (r) => {

                    console.log('got r', r);
                    const mensaje = r;
                    this.api.toast('open', 'Cargo con exito.');

                }
        );

    }

  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();

  }

}
