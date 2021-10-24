import {Component, OnInit, Inject, ViewEncapsulation, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {DateAdapter} from '@angular/material/core';
import {catchError, debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import * as moment from 'moment';

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
  selector: 'vacante-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class VacanteDialogComponent implements OnInit {

  // Variables
  public dispoId;
  public vacanteId;
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public user: Contrato;
  public filteredOptions;
  public segundoPaso = false;
  public f_inicio;
  public f_fin;
  public campaignOne;
  public campaignTwo;
  public agregar = false;
  public contratos = [];
  public isChecked = false;
  lista;
  listaOp = [];
  listaVacante = [];
  listaContrato = [];
  options: string[] = [];
  minDate = new Date();
  maxDate = new Date();
  
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<VacanteDialogComponent>,
      public api: ApiService,
  ) {

    let Navidad = new Date();
    let mes = Navidad.getMonth();
    //this.minDate = new Date((Navidad.getFullYear()-1), mes, Navidad.getDate());
    //this.maxDate = new Date((Navidad.getFullYear()+1), mes, Navidad.getDate());

    console.log('DATA::', data);
    // Guardo datos en variable local
    this.dialogData = data;

    this.dispoId = data.dispo.id;

    // Parametrizo el calendario
    let f_inicio = data.dispo.inicio.split("-");
    let f_termino = data.dispo.termino.split("-");

    let ini = f_inicio[1]+ "/" + f_inicio[0]+ "/" + f_inicio[2];
    this.minDate = new Date(f_inicio[1]+ "/" + f_inicio[0]+ "/" + f_inicio[2]); 
    this.f_inicio = f_inicio[2]+ "-" + f_inicio[1]+ "-" + f_inicio[0];
    this.f_fin = f_termino[2]+ "-" + f_termino[1]+ "-" + f_termino[0];
    console.log(f_inicio[0] + '+ "/" +' + f_inicio[1] + '+ "/" +' + f_inicio[2]);
    console.log(this.minDate);
    this.maxDate = new Date(f_termino[1]+ "/" + f_termino[0]+ "/" + f_termino[2]);
    console.log(f_termino[0] + '+ "/" +' + f_termino[1] + '+ "/" +' + f_termino[2]);
    console.log(this.maxDate);
    // Guardo la busqueda
    this.filter = data.filter;
    this.clase = data.CLA;
    // Creo Formulario Angular
    this.dialogForm = this.formGroup();

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, 7, 13)),
      end: new FormControl(new Date(year, 7, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, 7, 15)),
      end: new FormControl(new Date(year, 7, 19))
    });

  }

  public formGroup(): FormGroup {

    return new FormGroup({
      disposicion_id: new FormControl(this.data.dispo.id, []),
      descripcion: new FormControl('', [Validators.required]),
      fecha_inicio: new FormControl('', [Validators.required]),
      fecha_fin: new FormControl('', [Validators.required]),
      empleado_id: new FormControl('', [Validators.required]),
      vacante: new FormControl('', [Validators.required]),
    });

  }

  convertDateFormat(str): any{
    console.log('DateFormat::', str);
    console.log(str._i);

    return str._i.year + '/' + (str._i.month + 1) + '/' + str._i.date;

  }

  convertDateFormatTwo(str): any{
    console.log('DateFormat::', str);
    console.log(str._i);

    let dia = str._i.date;
    let mes = (str._i.month + 1);
    if(mes<10){
        mes = '0'+mes;
    }
    if(dia<10){
      dia = '0'+dia;
    }

    return str._i.year + '-' + mes + '-' + dia;

  }

  colorSema(data){
    console.log('colorData::', data);
    let color = 'gris';

    if('compleatdo'== data['estado']){
      color = 'verde';
    }
    
    if('pendiente' == data['estado']){
      color = 'azul';
    }

    return color;
  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    form.fecha_inicio = this.convertDateFormat(form.fecha_inicio);
    form.fecha_fin = this.convertDateFormat(form.fecha_fin);
    if(!this.isChecked){
      form.estado = "pendiente";
    }else{
      form.estado = "completado";
    }
    this.api.show();
    this.api.post('vacante', form)
        .subscribe( data => {
          console.log('CONSULTA::', data);
          this.matDialogRef.close(data);
          this.api.hide();
        });

  }

  _setCierre(): void{

    this.matDialogRef.close();
    this.api.show();

  }

  dataGetDispo(id): void{

    //this._fuseProgressBarService.show();
    console.log('POSTULANTE::');
    this.api.get('disposicion/'+id)
        .subscribe( data => { 
           console.log('CONSULTA::', data);
           this.data.dispo = data.data;
           console.log('RELOAD::', this.data);
           this.calendario(this.vacanteId);
        });
  }


  dataGetContratoxempleado(): void{
    const form = this.dialogForm.value;
    if(form.empleado_id == ''){
      alert("Debe llenar el campo empleado!");
      return ;
    }
    console.log('FORM::', form);
    form.fecha_inicio = this.f_inicio;
    form.fecha_fin =  this.f_fin;
    //this._fuseProgressBarService.show();
    console.log('contratoxempleado::');
    this.api.post('contratoxempleado', form)
    .subscribe( data => {
      console.log('CONSULTA::', data);
      this.listaContrato = data;
      this.api.hide();
      this.segundoPaso=true;
    });

  }


  _delete(id): void{

    this.api.delete('vacante/' + id)
        .subscribe( data => {
            console.log('DELETE::', data);
            this.dataGetDispo(this.dispoId);
           
        });
}

  dateRange1 = [new Date(2021, 10, 1), new Date(2021, 10, 1)]
  dateRange2 = [new Date(2020, 9, 8), new Date(2020, 9, 8)]

  myFilter = (d: Date): boolean => {
    // Prevent dates in ranges from being selected.
    return !(d >= this.dateRange1[0] && d <= this.dateRange1[1]) 
      && !(d >= this.dateRange2[0] && d <= this.dateRange2[1])
  }

  
  consLista(cuanto=1){
    for(let i=0; i < cuanto; i++){
      this.listaOp.push({name: 'Vacantes ' + (i+1), numero: (i+1)});
    }
    console.log("XXX::", this.listaOp);
  }

  calendario(numero){
    console.log("____" + numero);
    let rango = [];
    this.listaVacante = [];
    let e = 0;
    for(let i=0; i < this.data.dispo.vacante.length; i++){
    
        if(numero == this.data.dispo.vacante[i].vacante){
        //  console.log(this.data.dispo.vacante[i]);
          this.listaVacante.push(this.data.dispo.vacante[i]);
          const inicio = this.data.dispo.vacante[i].fecha_inicio.trim().split('-');
          const fin = this.data.dispo.vacante[i].fecha_fin.trim().split('-');

          this.dateRange2 = [new Date(inicio[0], inicio[1], inicio[2]), new Date(fin[0], fin[1], fin[2])]
          rango[e] =  [new Date(inicio[0], (inicio[1]-1), inicio[2]), new Date(fin[0], (fin[1]-1), fin[2])];
          console.log("-> ", inicio[0], (inicio[1]-1), inicio[2]);
          e++;
  
        }

        console.log( '=> LISTA CONTRATO::',this.listaContrato);
        console.log( '=> CONTEO CONTRATO::',this.listaContrato.length);

        console.log( this.listaContrato.length, rango.length);
        /*
        for(let q=this.listaContrato.length; q < rango.length; q++){
            console.log('::',q);
            if(this.listaContrato[q]){
              console.log('this.listaContrato[q]::', this.listaContrato[q]);
              const inicio = this.listaContrato[q].fecha_inicio.trim().split('-');
              const fin = this.listaContrato[q].fecha_fin.trim().split('-');
              rango[q] =  [new Date(inicio[0], (inicio[1]-1), inicio[2]), new Date(fin[0], (fin[1]-1), fin[2])];
             // console.log("-> ", inicio[0], (inicio[1]-1), inicio[2]);
            }
        }*/

        
        this.myFilter = (d: Date): boolean => {
          let valBool = true;
          for(let h=0; h < rango.length; h++){
            if (d >= rango[h][0] && d <= rango[h][1]){
              valBool = false;
            }
          }
          // Prevent dates in ranges from being selected.
          return valBool;
        }
    }
/*
    if(this.data.dispo.vacante.length == 0){
      
      console.log( '=> LISTA CONTRATO::',this.listaContrato);
      console.log( '=> CONTEO CONTRATO::',this.listaContrato.length);
      
      console.log( this.listaContrato.length, rango.length);

      for(let h=0; h < this.listaContrato.length; h++){
        console.log('::',h);
        console.log('this.listaContrato[h]::',this.listaContrato[h]);
        const inicio = this.listaContrato[h].fecha_inicio.trim().split('-');
        const fin = this.listaContrato[h].fecha_fin.trim().split('-');
        rango[h] =  [new Date(inicio[0], (inicio[1]-1), inicio[2]), new Date(fin[0], (fin[1]-1), fin[2])];

      }

      
      this.myFilter = (d: Date): boolean => {
        let valBool = true;
        for(let h=0; h < rango.length; h++){
          if (d >= rango[h][0] && d <= rango[h][1]){
            valBool = false;
          }
        }
        // Prevent dates in ranges from being selected.
        return valBool;
      }
    }*/
    //console.log('listaPush',this.listaVacante);
  }

  goToLink(url): void{
    console.log("URL",url);
    console.log("URL",url.archive);
    window.open( this.api.base + url.archive, '_blank');
  }

  diff(f1, f2){
    var fecha1 = moment(f1);
    var fecha2 = moment(f2);
    let d: any = fecha2.diff(fecha1, 'days') + 1;

    console.log("/>",);
    return d;
  }

  ngOnInit(): any {

    this.consLista(this.data.dispo.externos);

    this.dialogForm
    .get('empleado_id')
    .valueChanges.pipe(
        debounceTime(300),
        tap(() => this.api.show()),
        switchMap(value =>
            (typeof value === 'string' || value instanceof String) ?  this.api.get('empleado/search/nombres/' + value)
                .pipe(finalize(() => this.api.hide())) : []
        )
    ).subscribe(data => {

      this.filteredOptions  = data;
      console.log('AUTOFILTER::', this.filteredOptions);
      this.options = this.filteredOptions;

    });


    this.dialogForm
    .get('vacante')
    .valueChanges.subscribe(data => {
      this.vacanteId = data;
      console.log('VACANTE_CHANGE::', data);
      this.calendario(data);
    });


    this.dialogForm
    .get('fecha_fin')
    .valueChanges.subscribe(data => {
      console.log('fecha_fin_CHANGE::', data);
      const form = this.dialogForm.value;
      console.log('FORM_CHANGE::', form);
      this.contratos = [];

      for(let h=0; h < this.listaContrato.length; h++){
        if(this.listaContrato[h].fecha_inicio && data){
          console.log('::',h);
          console.log('this.listaContrato[h]::', this.listaContrato[h]);
          console.log('condicional ',  this.listaContrato[h].fecha_inicio + " " + this.convertDateFormatTwo(data));
          console.log('condicional 2',  this.listaContrato[h].fecha_fin + " " + this.convertDateFormatTwo(form.fecha_inicio));
          if(this.convertDateFormatTwo(form.fecha_inicio) <= this.listaContrato[h].fecha_fin){
            console.log("XXXXXXXXX--------->");
          }
  
          if( this.diff(this.listaContrato[h].fecha_inicio, this.convertDateFormatTwo(data)) > 0 &&
              this.convertDateFormatTwo(form.fecha_inicio) <= this.listaContrato[h].fecha_fin){
              console.log('Hay contrato para el periodo::', this.listaContrato[h]);
              this.contratos.push(this.listaContrato[h]);
          }else{
            console.log('No hay contrato para el periodo::', this.listaContrato[h]);
          }
          
          const inicio = this.listaContrato[h].fecha_inicio.trim().split('-');
          const fin = this.listaContrato[h].fecha_fin.trim().split('-');
          //rango[h] =  [new Date(inicio[0], (inicio[1]-1), inicio[2]), new Date(fin[0], (fin[1]-1), fin[2])];  
        }

      }
      this.agregar = true;
    });


    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });


  }

}
