import {Component, OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';

interface Food {
  value: string;
  viewValue: string;
}

interface Contrato {
  id: string;
  name: string;
  create_by: string;
}


@Component({
  selector: 'contrato-grupo-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ContratoGrupoDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public copiaUno = new Array();
  public copiaDos;
  public user: Contrato;
  public dataSource;
  public treeControl;
  public agregar;
  public dataContrato;
  public contrato;
  public nuevo;




  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<ContratoGrupoDialogComponent>,
      private api: ApiService,
  ) {
    console.log('DATA::', data);
    // Guardo datos en variable local
    this.dialogData = data;
    // Guardo la busqueda
    this.filter = data.filter;
    this.clase = data.CLA;
    // Creo Formulario Angular
    // this.dialogForm = this.formGroup();
  }

  public formGroup(): FormGroup {

    return new FormGroup({
      id_archivo: new FormControl('', []),
      id_contrato: new FormControl('', []),
      copias_uno: new FormControl('', []),
      copias_dos: new FormControl('', [])
    });

  }

  _setArchivo(event, contrato, socket): void{
      if (event){

        console.log('EVENT::', event);
        console.log('CONTRATO::', contrato);

        let uno = contrato.copias_uno;
        let dos = contrato.copias_dos;

        if (socket === 1){ uno = event; }
        if (socket === 2){ dos = event; }

        this.api.put('archivogrupo', {id: contrato.id_grupo, copias_uno: uno, copias_dos: dos})
           .subscribe( data => {
             console.log('CONSULTA::', data);
             this.api.hide();
        });

      }


  }
  _setCabecera(event, contrato): void{

        console.log('EVENT_CABECERA::', event);
        console.log('CONTRATO::', contrato);
        this.api.put('archivogrupo', {id: contrato.id_grupo, header: event})
           .subscribe( data => {
             console.log('CONSULTA::', data);
             this.api.hide();
        });
  }

  _setDialog(): void{

    // const form = this.dialogForm.value;
    // console.log('FORM::', form);
    this.api.show();
    // form.create_by = this.user.id;
    this.api.post('archivo', {nombre: 'Contrato Victor'})
        .subscribe( data => {
          console.log('CONSULTA::', data);
          this.api.hide();

        });

/*
    this.api.post('archivogrupo', {id_archivo: 1, id_contrato: 5})
        .subscribe( data => {
          console.log('CONSULTA::', data);
          this.api.hide();

        });*/

  }

  _setContrato(id): void {

    console.log('Agregando archivo id ' + id + ' y el id de contrato es ' + this.contrato);

    this.api.post('archivogrupo', {id_archivo: id, id_contrato: this.contrato})
        .subscribe(data => {
          console.log('CONSULTA::', data);
          this.dataTable();
          this.agregar = null;
          this.api.hide();
        });
  }

  _add(id): void{
    this.agregar = id;
  }
  _nuevo(): void{

      this.api.post('archivo', {nombre: this.nuevo})
          .subscribe( data => {
              console.log('CONSULTA::', data);
              this.dataTable();
              this.api.hide();

          });
  }

  dataTable(): void{

    this.api.get('archivolist')
        .subscribe( data => {

          console.log('TURNO::', data);
          this.dataSource = data;

        });
  }

  // Buscar contratos
  dataCont(): void{

    this.api.show();
    this.api.get('contrato')
        .subscribe( data => {

          this.dataContrato = data;
          console.log('CONTRATOS::', this.dataContrato );
          this.api.hide();

        });
  }

  _deleteArchivo(id): void{


    this.api.delete('archivo/' + id)
        .subscribe( data => {
          console.log('DELETE::', data);
          this.dataTable();
        });
  }

  _delete(id): void{


    this.api.delete('archivogrupo/' + id)
        .subscribe( data => {
          console.log('DELETE::', data);
          this.dataTable();
        });
  }

  ngOnInit(): any {

    this.dataTable();
    this.dataCont();
    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });


  }

}
