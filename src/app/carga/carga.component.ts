import { Component, OnInit, Pipe } from '@angular/core';
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
import xlsxParser from 'xlsx-parse-json';
import * as moment from 'moment';
import * as internal from 'assert';
import {  PipeTransform } from '@angular/core';


interface Food {
    value: string; 
    viewValue: string;
}

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss'],
    animations   : fuseAnimations
})
export class cargaComponent implements OnInit {



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
  datacarga = new Array();
  public fileReaded: File;
  public cargadas = 0;
  public cantVacantes = 0;
  public locales = [];
  public resultado = [];
  public dataCargada;
  public procesar = true;
  public dataLocales = [];
  public validos = [];
  public dataDispo;
  public isLoading = false;
  filterpost = '';
  // Me todos publicos


  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('cliente/paginado')
        .subscribe( data => {

          // console.log('CONSULTA::', data);
          this.dataSource = data;

          this.datacarga = this.dataSource.data;
          // console.log('POSTULANTE::', this.datacarga );
          this._fuseProgressBarService.hide();

        });
  }

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of this.dataDispo.data){
        if(post['local_numero'].indexOf(arg)){
            resultPosts.push(post);
        }
    }
    return resultPosts;
    
  }

  next($event): void{

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('cliente/paginado?page=' + page)
            .subscribe( data => {

                // console.log('CONSULTA::', data);
                this.dataSource = data;

                this.datacarga = this.dataSource.data;
                // console.log('POSTULANTE::', this.datacarga );
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

/** Numero 	Abierto	 Estado 	 En nombre de 	 N° Local 	Tipo de Servicio 	 N° Externos 	Fecha de Inicio
 * 	Fecha de Termino	Hora inicio	Hora termino	Tipo de Jornada 	 Días 	Proveedor	 Semana 	Nombre de Local	 
 *  Formato 	 Zona 	 Dirección 	 Comuna 
 */

  public _csv2Array(fileInput: any) {

    this.fileReaded = fileInput.target.files[0];
    xlsxParser
      .onFileSelection(this.fileReaded)
      .then(data => {
      //  console.log("XXX::", data);
        this.dataCargada = data;
        let datosValidos = [];
        let datosInValidos = [];
        const ite = Object.keys(data);
        for (const key of ite) {
          for (var i = 0; i < data[key].length; ++i) {

            if (
              data[key][i]["Numero"]  != '' &&
              data[key][i]["Abierto"]  != '' &&
              data[key][i]["Estado"]  != '' &&
              data[key][i]["En nombre de"] != "" &&
              data[key][i]["N° Local"]  != '' &&
              data[key][i]["Tipo de Servicio"] != '' &&
              data[key][i]["N° Externos"] != '' &&
              data[key][i]["Fecha de Inicio"] != '' &&
              data[key][i]["Fecha de Termino"] &&
              data[key][i]["Hora inicio"] != '' &&
              data[key][i]["Hora termino"] != '' &&
              data[key][i]["Tipo de Jornada"] != '' &&
              data[key][i]["Días"] != '' &&
              data[key][i]["Proveedor"] != '' &&
              data[key][i]["Semana"] != '' &&
              data[key][i]["Nombre de Local"] != '' &&
              data[key][i]["Formato"] != '' &&
              data[key][i]["Zona"] != '' &&
              data[key][i]["Dirección"] != '' &&
              data[key][i]["Comuna"] != '' 
            ) {

                let datosLimpios = [];

                datosLimpios["numero"] = data[key][i]["Numero"] ;
                datosLimpios["abierto"] = data[key][i]["Abierto"] ;
                datosLimpios["estado"] = data[key][i]["Estado"] ;
                datosLimpios["solicitante"] =  data[key][i]["En nombre de"];
                datosLimpios["local_numero"] = data[key][i]["N° Local"] ;
                datosLimpios["tipo"] =  data[key][i]["Tipo de Servicio "];
                datosLimpios["externos"] =  data[key][i]["N° Externos"];
                datosLimpios["inicio"] =  data[key][i]["Fecha de Inicio"];
                datosLimpios["termino"] =  data[key][i]["Fecha de Termino"];
                datosLimpios["hora_inicio"] =  data[key][i]["Hora inicio"];
                datosLimpios["hora_termino"] =   data[key][i]["Hora termino"];
                datosLimpios["jornada"] =   data[key][i]["Tipo de Jornada "];
                datosLimpios["dias"] =   data[key][i]["Días"];
                datosLimpios["proveedor"] =  data[key][i]["Proveedor"];
                datosLimpios["semana"] =  parseInt(data[key][i]["Semana"]);
                datosLimpios["local_nombre"] =  data[key][i]["Nombre de Local"];
                datosLimpios["formato"] =  data[key][i]["Formato"];
                datosLimpios["zona"] =  data[key][i]["Zona"];
                datosLimpios["direccion"] =  data[key][i]["Dirección"];
                datosLimpios["comuna"] =  data[key][i]["Comuna"];


               // console.log("DATA::", datosLimpios);
               // console.log("DATA_ORIGEN::", data);

                datosValidos.push(
                  {
                    numero: data[key][i]["Numero"] ,
                    abierto: this.api.convertDatefullFormatValidate(data[key][i]["Abierto"]) ,
                    estado: data[key][i]["Estado"] ,
                    solicitante:  data[key][i]["En nombre de"],
                    local_numero: data[key][i]["N° Local"] ,
                    tipo:  data[key][i]["Tipo de Servicio "],
                    externos:  data[key][i]["N° Externos"],
                    inicio:  this.api.convertDatefullFormatValidate(data[key][i]["Fecha de Inicio"]),
                    termino:  this.api.convertDatefullFormatValidate(data[key][i]["Fecha de Termino"]),
                    hora_inicio:  data[key][i]["Hora inicio"],
                    hora_termino:   data[key][i]["Hora termino"],
                    jornada:   data[key][i]["Tipo de Jornada "],
                    dias:   data[key][i]["Días"],
                    proveedor:  data[key][i]["Proveedor"],
                    semana:  parseInt(data[key][i]["Semana"]),
                    local_nombre:  data[key][i]["Nombre de Local"],
                    formato:  data[key][i]["Formato"],
                    zona:  data[key][i]["Zona"],
                    direccion:  data[key][i]["Dirección"],
                    comuna:  data[key][i]["Comuna"]
                   });

                this.cargadas++;
                this.cantVacantes += parseFloat(data[key][i]["N° Externos"]);

               if(this.locales[data[key][i]["Nombre de Local"]]!= null){
                this.locales[data[key][i]["Nombre de Local"]]++;
               }else{
                this.locales[data[key][i]["Nombre de Local"]]=1;
               }

            } else {
              datosInValidos.push(data[key][i]);
            }
          }
         // console.log('CUMPLE::', datosValidos);
         // console.log('NoCUMPLE::', datosInValidos);
        //  console.log('Comuna::', this.locales);
          this.validos = datosValidos;
          for (let elemento in this.locales) { 
           // console.log('elemento::', elemento);
           // console.log(this.locales[elemento]);
            this.dataLocales.push({nombre:elemento.trim(), cantidad:this.locales[elemento]});
           }
           //console.log('dataLocales::',this.dataLocales);
          // Reseteo de boton de archivo
          fileInput.target.value = "";
        }
      });
  }

  postCarga(ing){
    
    this.api.post('disposicion' , ing)
    .subscribe( data => {
       // console.log('Disposicion::', data);
       
       this.api.hide();
       this.isLoading = false;
       alert("Se cargo el archivo con exito!");
        return data;
        // this.dataTable();
    });

  }

  
  goToLink(url): void{
    console.log("URL",url);
    window.open( this.api.base + url, '_blank');
  }

  colorSema(data){
    let color = 'gris'
    let cantidad = this.cantidad(data);

    if(cantidad == data['externos']){
      color = 'verde';
    }
    
    if(cantidad > 0 && cantidad != data['externos']){
      color = 'azul';
    }

    return color;
  }

  cantidad(data){

    //Defino las variables de los parametros para el cumplimiendo de la vacante
    let meta = data.dias;
    var dias = [];
    let validos = 0;


    for(let i=0; i < data.vacante.length; i++){
     
      var fecha1 = moment(data.vacante[i].fecha_inicio);
      var fecha2 = moment(data.vacante[i].fecha_fin);
      let d: any = fecha2.diff(fecha1, 'days') + 1;

      if(data.vacante[i].fecha_inicio  && data.vacante[i].fecha_fin && d == 1){
        d = d + 1;
      }

      if(fecha1 != null){
          //console.log(data.vacante[i].fecha_inicio + ", " +data.vacante[i].fecha_fin);
         // console.log(i + " - " + data.vacante[i].vacante + "DIAS_VIENEN::",( Number(dias[data.vacante[i].vacante]) ? dias[data.vacante[i].vacante] : 0 ) );
          //console.log(i + " - " + data.vacante[i].vacante + "DIAS_DIF::", Math.floor(d));
        //  console.log("---------------------------------");
         // console.log(i + " - " + data.vacante[i].vacante + "DIAS_DIF::",(Number(dias[data.vacante[i].vacante])  ? Math.floor(dias[data.vacante[i].vacante]) : 0 ) + Math.floor(d));
          dias[data.vacante[i].vacante] = (Number(dias[data.vacante[i].vacante]) ?  Math.floor(dias[data.vacante[i].vacante]) : 0 ) + Math.floor(d);
        //  console.log('guardado', dias[data.vacante[i].vacante]);
         // console.log('/////////////////////////////////////');
      }
     
    }

    if(data.vacante.length>0){
     // console.log(data);
      //console.log("DIAS", dias);
//console.log("META", meta);
     // console.log("===================");
      for(let i=0; i < dias.length; i++){
        if(meta == dias[i]){
          validos+=1;
        }
      }
  
    }

    return validos;
  }

  // Nuevo carga
  newcarga(): any{
    this.isLoading = true;
    this.api.show();
      // console.log('DATOS VALIDOS', this.validos);
      for (let elemento in this.validos) { 
       // console.log('elemento::', elemento);
       // console.log(this.validos[elemento]);
       }
       
       let resp = this.postCarga(this.validos);
  }

    _setSearch($event): any{
      if ($event){

          this.datacarga = $event;

      }
    }

  sendRegistro(_id){
    this.api.show();
    console.log('Disposicion__id::', _id);
    this.api.post('disposicion/registrar' , {id:_id})
    .subscribe( data => {
        console.log('Disposicion::', data);
        this.api.hide();
    });



  }
  sendAnexo(_id){
    this.api.show();
    console.log('Disposicion__id::', _id);
    this.api.post('disposicion/anexo' , {id:_id})
    .subscribe( data => {
        console.log('Disposicion::', data);
        this.dataGet();
        alert("Lista generada con exito!");
        this.api.hide();
    });
  }

  dataGet(): void{

    //this._fuseProgressBarService.show();
    console.log('POSTULANTE::');
    this.api.get('disposicion')
        .subscribe( data => {
           this.dataDispo = data;
           console.log('CONSULTA::', data);
          //this.dataSource = data;

          //this.datacarga = this.dataSource.data;
          // console.log('POSTULANTE::', this.datacarga );
          //this._fuseProgressBarService.hide();

        });
  }

    // tslint:disable-next-line:typedef
  ngOnInit() {
    this.dataGet();
    // Consulto los datos de la tabla
    this.dataTable();
    /*this.api.oncargaChanged.subscribe( x => {
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
