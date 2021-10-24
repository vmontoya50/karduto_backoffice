import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {fuseAnimations} from '../../@fuse/animations';
import {ContactsContactFormDialogComponent} from '../usuarios/contact-form/contact-form.component';
import {UsuariosService} from '../usuarios/usuarios.service';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UsersComponent implements OnInit {
    dialogRef: any;
  constructor(
      // private _contactsService: UsuariosService,
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
        'banco',
        'tipo',
        'numero',
        'pais'
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
    this.api.get('usuarios/list')
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataEmpleado = this.dataSource.data;
          console.log('REGCONTRATO::', this.dataEmpleado );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void {
      if ($event.pageIndex != null) {

          this._fuseProgressBarService.show();
          const page = $event.pageIndex + 1;
          this.api.get('usuarios/list?page=' + page)
              .subscribe(data => {

                  console.log('CONSULTA::', data);
                  this.dataSource = data;
                  this._fuseProgressBarService.hide();

              });

      }
  }
    /**
     * New contact
     */
    newContact(): void
    {
        this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            },
            width: '600px',
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                //this._contactsService.updateContact(response.getRawValue());
            });
    }

  goToLink(url): void{

        window.open( this.api.base + url.archive, '_blank');
  }

  // Nuevo empleado
  go(row): any{
    this.router.navigate(['cuentas/ver/' + row.id]);
  }

  _setSearch($event): any{
    console.log('EVENT_FILTRO::', $event);
    if ($event){

      this.dataEmpleado = $event;

    }
  }

  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();

  }
}
