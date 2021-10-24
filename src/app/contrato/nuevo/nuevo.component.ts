import { Component, OnInit } from '@angular/core';
import {FuseSidebarService} from '../../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../../@fuse/services/config.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../../api.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {fuseAnimations} from '../../../@fuse/animations';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
  animations   : fuseAnimations
})
export class NuevoComponent implements OnInit {
  public dataContrato = new Array();
  public idContrato;
  public dataSource;
  public posLength;
  public contador: any[] = [];

  constructor(
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
      private _fuseConfigService: FuseConfigService,
      private _matDialog: MatDialog,
      private api: ApiService,
      private router: Router,
      public _route: ActivatedRoute,
  ) { }

  dataView(): any{

    this._fuseProgressBarService.show();
    this.api.get('contrato/' + this.idContrato)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;
          this.dataContrato = this.dataSource.parrafos;
          this.posLength = this.dataContrato.length;
          console.log('CANTIDAD::', this.posLength);
          console.log('PARRAFOS::', this.dataContrato);

          this.contador = [];

          for (let i = 1; i <= this.posLength; i++){
              this.contador.push({ value: i });
          }

          console.log('CONTADOR::', this.contador);
          this._fuseProgressBarService.hide();
        });
  }

  _delete(parrafo): void{

      this.api.delete('parrafo_contrato/' + parrafo.id)
          .subscribe( data => {
              console.log('DELETE::', data);
              this.dataView();
          });
  }

    _save(row): void{

        this.api.put('parrafo/' + row.parrafo_id, {id: row.parrafo_id, contenido: row.contenido})
            .subscribe( data => {
                console.log('PUT::', data);
                this.dataView();
            });
  }
  _cPosition(row, po): void{

        this.api.put('parrafo_contrato/' + row.id, {position: po})
            .subscribe( data => {
                console.log('PUT::', data);
                this.dataView();
            });
  }


    ngOnInit() {

    this._route.paramMap.pipe(
        switchMap((params: ParamMap) =>
            of(params.get('idContrato'))
        )
    ).subscribe((url) => {

      console.log('PARAMETRO::', url);
      this.idContrato = url;
      this.dataView();

    });


  }

}
