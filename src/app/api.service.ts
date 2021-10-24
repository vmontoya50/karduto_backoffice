import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FuseNavigation} from '../@fuse/types';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastComponent} from './layout/toast/toast.component';
import {FuseProgressBarService} from '../@fuse/components/progress-bar/progress-bar.service';

interface Food {
    value: string;
    viewValue: string;
}

interface Nacionalidad {
    nacionalidad: string;
    codigo: string;
}

interface Region {
    region: string;
}

interface Comuna {
    region: string;
    comuna: string;
}

interface Banco {
    banco: string;
    codigo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    // Observables
    onTokenChanged: BehaviorSubject<any>;
    onUserChanged: BehaviorSubject<any>;
    onPostulanteChanged: BehaviorSubject<any>;

    // Variables
    token: any;
    user: any;
    cargando: any;
    //PROD
    //url = 'https://api.gruponewen.cl/api/';
    //basepdf = 'https://api.gruponewen.cl/';
    //base = 'https://api.gruponewen.cl/';
    //STAGING
    //url = 'https://apistaging.gruponewen.cl/api/';
    //basepdf = 'https://apistaging.gruponewen.cl/';
   // base = 'https://apistaging.gruponewen.cl/';
    //DESARROLLO
    url = 'http://127.0.0.1:8000/api/';
    basepdf = 'http://apistaging.gruponewen.cl/';
    base = 'http://127.0.0.1:8000/';
    //FIRMAS
    basefirma = 'http://firma.gruponewen.cl/';

    

    displaySalud: Food[] = [
        {value: 'FONASA', viewValue: 'FONASA'},
        {value: 'BANMÉDICA, S.A.', viewValue: 'BANMÉDICA, S.A.'},
        {value: 'CHUQUICAMATA, LTDA.', viewValue: 'CHUQUICAMATA, LTDA.'},
        {value: 'COLMENA GOLDEN CROSS, S.A.', viewValue: 'COLMENA GOLDEN CROSS, S.A.'},
        {value: 'CONSALUD, S.A.', viewValue: 'CONSALUD, S.A.'},
        {value: 'CRUZ BLANCA, S.A.', viewValue: 'CRUZ BLANCA, S.A.'},
        {value: 'CRUZ DEL NORTE, LTDA.', viewValue: 'CRUZ DEL NORTE, LTDA.'},
        {value: 'NUEVA MASVIDA, S.A.', viewValue: 'NUEVA MASVIDA, S.A.'},
        {value: 'FUNDACIÓN, LTDA.', viewValue: 'FUNDACIÓN, LTDA.'},
        {value: 'FUSAT, LTDA.', viewValue: 'FUSAT, LTDA.'},
        {value: 'RÍO BLANCO, LTDA.', viewValue: 'RÍO BLANCO, LTDA.'},
        {value: 'SAN LORENZO, LTDA.', viewValue: 'SAN LORENZO, LTDA.'},
        {value: 'VIDA TRES, S.A.', viewValue: 'VIDA TRES, S.A.'},
    ];

    displayAfp: Food[] = [
        {value: 'SIN AFP', viewValue: 'SIN AFP'},
        {value: 'PLANVITAL, S.A.', viewValue: 'PLANVITAL, S.A.'},
        {value: 'MODELO, S.A.', viewValue: 'MODELO, S.A.'},
        {value: 'HABITAT, S.A.', viewValue: 'HABITAT, S.A.'},
        {value: 'CUPRUM, S.A.', viewValue: 'CUPRUM, S.A.'},
        {value: 'CAPITAL, S.A.', viewValue: 'CAPITAL, S.A.'},
        {value: 'UNO, S.A.', viewValue: 'UNO, S.A.'},
        {value: 'PROVIDA, S.A.', viewValue: 'PROVIDA, S.A.'}
    ];

    displayTurno: Food[] = [
        {value: 'DIA', viewValue: 'DIA'},
        {value: 'NOCHE', viewValue: 'NOCHE'},
        {value: 'DIA Y NOCHE', viewValue: 'DIA Y NOCHE'}
    ];

    displayTurnoW: Food[] = [
        {value: 'DIA', viewValue: 'DIA'},
        {value: 'NOCHE', viewValue: 'NOCHE'}
    ];

    displayDispo: Food[] = [
        {value: 'FULL TIME', viewValue: 'FULL TIME'},
        {value: 'PART TIME', viewValue: 'PART TIME'}
    ];

    displayNacionalidad: Nacionalidad[] = [
        { nacionalidad: 'CHILENA', codigo: 'CL' },
        { nacionalidad: 'VENEZOLANA', codigo: 'VE' },
        { nacionalidad: 'PERUANA', codigo: 'PE' },
        { nacionalidad: 'COLOMBIANA', codigo: 'CO' },
        { nacionalidad: 'BOLIVIANA', codigo: 'BO' },
        { nacionalidad: 'ECUATORIANA', codigo: 'EC' },
        { nacionalidad: 'HAITIANA', codigo: 'HT' },
        { nacionalidad: 'DOMINICANA', codigo: 'DO' },
        { nacionalidad: 'CUBANA', codigo: 'CU' },
        { nacionalidad: 'COSTARRICENSE', codigo: 'CR' },
        { nacionalidad: 'ESPAÑOLA', codigo: 'ES' },
        { nacionalidad: 'ALEMANA', codigo: 'DE' },
        { nacionalidad: 'ARGENTINA', codigo: 'AR' },
        { nacionalidad: 'AUSTRALIANA', codigo: 'AU' },
        { nacionalidad: 'BIELORRUSA', codigo: 'BY' },
        { nacionalidad: 'BRASILEÑA', codigo: 'BR' },
        { nacionalidad: 'CAMERUNESA', codigo: 'CM' },
        { nacionalidad: 'CANADIENSE', codigo: 'CA' },
        { nacionalidad: 'CHINA', codigo: 'CN' },
        { nacionalidad: 'SURCOREANA', codigo: 'KR' },
        { nacionalidad: 'SALVADOREÑA', codigo: 'SV' },
        { nacionalidad: 'ESTADOUNIDENSE', codigo: 'US' },
        { nacionalidad: 'FRANCESA', codigo: 'FR' },
        { nacionalidad: 'GUATEMALTECA', codigo: 'GT' },
        { nacionalidad: 'HOLANDESA', codigo: 'NL' },
        { nacionalidad: 'HONDUREÑA', codigo: 'HN' },
        { nacionalidad: 'INDIA', codigo: 'IN' },
        { nacionalidad: 'INGLESA', codigo: 'UK' },
        { nacionalidad: 'ITALIANA', codigo: 'IT' },
        { nacionalidad: 'JAMAIQUINA', codigo: 'JM' },
        { nacionalidad: 'JAPONESA', codigo: 'JP' },
        { nacionalidad: 'MARROQUÍ', codigo: 'MA' },
        { nacionalidad: 'MEXICANA', codigo: 'MX' },
        { nacionalidad: 'NICARAGÜENSE', codigo: 'NI' },
        { nacionalidad: 'PALESTINA', codigo: 'PS' },
        { nacionalidad: 'PANAMEÑA', codigo: 'PA' },
        { nacionalidad: 'PARAGUAYA', codigo: 'PY' },
        { nacionalidad: 'PORTUGUESA', codigo: 'PT' },
        { nacionalidad: 'SERBIA', codigo: 'RS' },
        { nacionalidad: 'SUDAFRICANA', codigo: 'ZA' },
        { nacionalidad: 'UCRANIANA', codigo: 'UA' },
        { nacionalidad: 'URUGUAYA', codigo: 'UY' }
    ];

    displayBanco: Banco[] = [
        {banco: 'BANCO ESTADO', codigo: 12},
        {banco: 'BANCO SANTANDER', codigo: 37},
        {banco: 'BCI (BANCO DE CREDITO E INVERIONES)', codigo: 16},
        {banco: 'BANCO DE CHILE', codigo: 1},
        {banco: 'BANCO FALABELLA', codigo: 51},
        {banco: 'BANCO ITAU', codigo: 39},
        {banco: 'BANCO BICE', codigo: 28},
        {banco: 'BANCO RIPLEY', codigo: 53},
        {banco: 'BANCO PARIS', codigo: 57},
        {banco: 'CONSORCIO', codigo: 55},
        {banco: 'CORPBANCA', codigo: 27},
        {banco: 'BBVA', codigo: 504},
        {banco: 'CITIBANK, N.A.', codigo: 33},
        {banco: 'CONOSUR', codigo: 734},
        {banco: 'DE LA NACION ARGENTINA', codigo: 43},
        {banco: 'DESARROLLO', codigo: 507},
        {banco: 'DEUTSCHE BANK', codigo: 52},
        {banco: 'DO BRASIL', codigo: 17},
        {banco: 'EDWARDS', codigo: 29},
        {banco: 'ABN AMRO', codigo: 46},
        {banco: 'HNS', codigo: 54},
        {banco: 'HSBC BANK CHILE', codigo: 31},
        {banco: 'INTERNACIONAL', codigo: 9},
        {banco: 'JP MORGAN CHASE BANK', codigo: 41},
        {banco: 'PENTA', codigo: 56},
        {banco: 'SCOTIABANK SUD AMERICANO', codigo: 14},
        {banco: 'SECURITY', codigo: 49},
        {banco: 'THE BANK OF TOKYO-MITSUBISHI UFJ, LTD.', codigo: 45}
    ];

    displayRegion: Region[] = [
        { region:  'Región Metropolitana' },
        { region:  'Región Arica y Parinacota' },
        { region:  'Región de Antofagasta' },
        { region:  'Región de Coquimbo' },
        { region:  'Región de la Araucanía' },
        { region:  'Region de los Lagos' },
        { region:  'Región de los Ríos' },
        { region:  'Región de Magallanes' },
        { region:  'Región del Libertador Bernardo O`Higgins' },
        { region:  'Región de Tarapacá' },
        { region:  'Región de Valparaiso' },
        { region:  'Región del Bío Bío' },
        { region:  'Región del Maule' }
    ];

    displayComuna: Comuna[] = [
        {region:  'Región Arica y Parinacota', comuna:  'Arica'},
        {region:  'Región de Antofagasta', comuna:  'Antofagasta'},
        {region:  'Región de Antofagasta', comuna:  'Calama'},
        {region:  'Región de Coquimbo', comuna:  'Coquimbo'},
        {region:  'Región de Coquimbo', comuna:  'Estación Central'},
        {region:  'Región de Coquimbo', comuna:  'Illapel'},
        {region:  'Región de Coquimbo', comuna:  'La Serena'},
        {region:  'Región de Coquimbo', comuna:  'Ovalle'},
        {region:  'Región de Coquimbo', comuna:  'Salamanca'},
        {region:  'Región de la Araucanía', comuna:  'Angol'},
        {region:  'Región de la Araucanía', comuna:  'Lautaro'},
        {region:  'Región de la Araucanía', comuna:  'Padre de las casas'},
        {region:  'Región de la Araucanía', comuna:  'Pucón'},
        {region:  'Región de la Araucanía', comuna:  'Temuco'},
        {region:  'Región de la Araucanía', comuna:  'Victoria'},
        {region:  'Región de la Araucanía', comuna:  'Villarrica'},
        {region:  'Region de los Lagos', comuna:  'Castro'},
        {region:  'Region de los Lagos', comuna:  'La Unión'},
        {region:  'Region de los Lagos', comuna:  'Osorno'},
        {region:  'Region de los Lagos', comuna:  'Puerto Montt'},
        {region:  'Region de los Lagos', comuna:  'Puerto Varas'},
        {region:  'Region de los Lagos', comuna:  'Valdivia'},
        {region:  'Región de los Ríos', comuna:  'Valdivia'},
        {region:  'Región de Magallanes', comuna:  'Punta Arenas'},
        {region:  'Región de O`Higgins', comuna:  'Graneros'},
        {region:  'Región de O`Higgins', comuna:  'Machalí'},
        {region:  'Región de O`Higgins', comuna:  'Pichilemu'},
        {region:  'Región de O`Higgins', comuna:  'Rancagua'},
        {region:  'Región de O`Higgins', comuna:  'Rengo'},
        {region:  'Región de O`Higgins', comuna:  'San Fernando'},
        {region:  'Región de O`Higgins', comuna:  'San Vicente de Tagua Tagua'},
        {region:  'Región de O`Higgins', comuna:  'Santa Cruz'},
        {region:  'Región de Tarapacá', comuna:  'Alto Hospicio'},
        {region:  'Región de Tarapacá', comuna:  'Iquique'},
        {region:  'Región de Valparaiso', comuna:  'Algarrobo'},
        {region:  'Región de Valparaiso', comuna:  'Calera'},
        {region:  'Región de Valparaiso', comuna:  'Cartagena'},
        {region:  'Región de Valparaiso', comuna:  'Casa Blanca'},
        {region:  'Región de Valparaiso', comuna:  'Con Con'},
        {region:  'Región de Valparaiso', comuna:  'La Ligua'},
        {region:  'Región de Valparaiso', comuna:  'Limache'},
        {region:  'Región de Valparaiso', comuna:  'Los Andes'},
        {region:  'Región de Valparaiso', comuna:  'Maitencillo'},
        {region:  'Región de Valparaiso', comuna:  'Quillota'},
        {region:  'Región de Valparaiso', comuna:  'Quilpue'},
        {region:  'Región de Valparaiso', comuna:  'Quisco'},
        {region:  'Región de Valparaiso', comuna:  'San Antonio'},
        {region:  'Región de Valparaiso', comuna:  'San Felipe'},
        {region:  'Región de Valparaiso', comuna:  'Valparaiso'},
        {region:  'Región de Valparaiso', comuna:  'Villa Alemana'},
        {region:  'Región de Valparaiso', comuna:  'Viña del Mar'},
        {region:  'Región del Bío Bío', comuna:  'Arauco'},
        {region:  'Región del Bío Bío', comuna:  'Chillán'},
        {region:  'Región del Bío Bío', comuna:  'Concepción'},
        {region:  'Región del Bío Bío', comuna:  'Lebu'},
        {region:  'Región del Bío Bío', comuna:  'Los Angeles'},
        {region:  'Región del Bío Bío', comuna:  'Mulchen'},
        {region:  'Región del Bío Bío', comuna:  'Parral'},
        {region:  'Región del Bío Bío', comuna:  'Penco'},
        {region:  'Región del Bío Bío', comuna:  'San Carlos'},
        {region:  'Región del Bío Bío', comuna:  'Tome '},
        {region:  'Región del Maule', comuna:  'Constitucion'},
        {region:  'Región del Maule', comuna:  'Curico'},
        {region:  'Región del Maule', comuna:  'Curicó'},
        {region:  'Región del Maule', comuna:  'Linares'},
        {region:  'Región del Maule', comuna:  'Parral'},
        {region:  'Región del Maule', comuna:  'San Javier'},
        {region:  'Región del Maule', comuna:  'Talca'},
        {region:  'Región Metropolitana', comuna:  'Buin'},
        {region:  'Región Metropolitana', comuna:  'Cerrillos'},
        {region:  'Región Metropolitana', comuna:  'Cerro Navia'},
        {region:  'Región Metropolitana', comuna:  'Colina'},
        {region:  'Región Metropolitana', comuna:  'Conchalí'},
        {region:  'Región Metropolitana', comuna:  'El Bosque'},
        {region:  'Región Metropolitana', comuna:  'El Monte'},
        {region:  'Región Metropolitana', comuna:  'Estación Central'},
        {region:  'Región Metropolitana', comuna:  'Huechuraba'},
        {region:  'Región Metropolitana', comuna:  'Independencia'},
        {region:  'Región Metropolitana', comuna:  'Isla de Maipo'},
        {region:  'Región Metropolitana', comuna:  'La Cisterna'},
        {region:  'Región Metropolitana', comuna:  'La Florida'},
        {region:  'Región Metropolitana', comuna:  'La Granja'},
        {region:  'Región Metropolitana', comuna:  'La Pintana'},
        {region:  'Región Metropolitana', comuna:  'La Reina'},
        {region:  'Región Metropolitana', comuna:  'Lampa'},
        {region:  'Región Metropolitana', comuna:  'Las Condes'},
        {region:  'Región Metropolitana', comuna:  'Lo Barnechea'},
        {region:  'Región Metropolitana', comuna:  'Lo Espejo'},
        {region:  'Región Metropolitana', comuna:  'Lo Prado'},
        {region:  'Región Metropolitana', comuna:  'Macul'},
        {region:  'Región Metropolitana', comuna:  'Maipu'},
        {region:  'Región Metropolitana', comuna:  'Maipú'},
        {region:  'Región Metropolitana', comuna:  'Melipilla '},
        {region:  'Región Metropolitana', comuna:  'Molina'},
        {region:  'Región Metropolitana', comuna:  'Ñuñoa'},
        {region:  'Región Metropolitana', comuna:  'Padre Hurtado'},
        {region:  'Región Metropolitana', comuna:  'Paine'},
        {region:  'Región Metropolitana', comuna:  'Pedro Aguirre Cerda'},
        {region:  'Región Metropolitana', comuna:  'Peñaflor'},
        {region:  'Región Metropolitana', comuna:  'Peñalolén'},
        {region:  'Región Metropolitana', comuna:  'Providencia'},
        {region:  'Región Metropolitana', comuna:  'Pudahuel'},
        {region:  'Región Metropolitana', comuna:  'Puente Alto'},
        {region:  'Región Metropolitana', comuna:  'Quilicura'},
        {region:  'Región Metropolitana', comuna:  'Quinta Normal'},
        {region:  'Región Metropolitana', comuna:  'Recoleta'},
        {region:  'Región Metropolitana', comuna:  'Renca'},
        {region:  'Región Metropolitana', comuna:  'San Bernardo'},
        {region:  'Región Metropolitana', comuna:  'San Joaquín'},
        {region:  'Región Metropolitana', comuna:  'San Miguel'},
        {region:  'Región Metropolitana', comuna:  'San Ramón'},
        {region:  'Región Metropolitana', comuna:  'Santiago'},
        {region:  'Región Metropolitana', comuna:  'Talagante'},
        {region:  'Región Metropolitana', comuna:  'Vitacura'}
    ];

    

    constructor(
      private http: HttpClient,
      private router: Router,
      private _snackBar: MatSnackBar,
      private _fuseProgressBarService: FuseProgressBarService
  ) {
      // Set the defaults
      this.onUserChanged = new BehaviorSubject([]);
      this.onTokenChanged = new BehaviorSubject([]);
      this.onPostulanteChanged = new BehaviorSubject([]);
  }

    // Funciones
    headers(): any{
        const _token = localStorage.getItem('token' );
        let headers = new HttpHeaders();
        headers = headers.set( 'Authorization', 'Bearer ' + _token );
        return headers;
    }

  get(u): any{
    return this.http.get( this.url + u, {headers: this.headers()});
  }

  post(u, post): any{
    return this.http.post(this.url + u, post, {headers: this.headers()});
  }

  file(u, post, option): any{
    return this.http.post(this.url + u, post, option);
  }

  put(u, post): any{
    return this.http.put(this.url + u, post, {headers: this.headers()});
  }

  delete(u, option?): any{
     return this.http.delete(this.url + u, {headers: this.headers()});
  }

  downloadFile(route: string, filename: string = null): void{
    this.show();
    const baseUrl = this.url;
    const headers =this.headers();
    this.http.get(baseUrl + route,{headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            this.hide();
        },
        error => {
          this._fuseProgressBarService.hide();
          console.log(error);
          if(error.status == 404){
            alert('no hay resultados');
            this.hide();
          }
          
        }
    )
}


downloadFileZip(route: string, filename: string = null): void{

    const baseUrl = this.url;
    const headers =this.headers();
    this.show();
    this.http.get(baseUrl + route,{headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            this.hide();
        }
    )
}


  ini(){

      this.onTokenChanged.subscribe(token  => {
          console.log('Token', token);
      });

  }

  out(){

      this.onTokenChanged.next( '' );
      this.onTokenChanged.complete();
      this.onUserChanged.next( '' );
      this.onUserChanged.complete();
      // localStorage.clear();

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

  }

  show(): void{
      this._fuseProgressBarService.show();
      this.cargando = true;
  }

  hide(): void{
      this._fuseProgressBarService.hide();
      this.cargando = false;
  }

  convertDateFormat(str): any{
        return str._i.year + '/' + (str._i.month + 1) + '/' + str._i.date;
  }

  convertDatefullFormat(str): any{
        if (str){

            const fecha = str.split('/');
            if (fecha){
                return fecha[2] + '/' + fecha[1] + '/' + fecha[0];

            }else{
                return str;
            }

        }

  }
  convertDatefullFormatValidate(str): any{
        if (str){
            console.log("base", str);
            const fecha = str.trim().split('/');

            if(parseInt(fecha[2])<1999)
                fecha[2] = parseInt(fecha[2])+2000;

            if(parseInt(fecha[0])<10)
                fecha[0] = '0'+ fecha[0];

            if(parseInt(fecha[1])<10)
                fecha[1] = '0'+ fecha[1];

                console.log("result", fecha[2] + '/' + fecha[0] + '/' + fecha[1]);

            if (fecha){
                return fecha[2] + '/' + fecha[0] + '/' + fecha[1];

            }else{
                return str;
            }

        }

  }

  convertDatefullFormatRev(str): any{
        if (str){

            const fecha = str.split('/');
            if (fecha){
                return fecha[0] + '-' + fecha[1] + '-' + fecha[2];

            }else{
                return str;
            }

        }

  }

  toast(accion, menssage?, duration?, style?): any{

      const sAccion = '';
      const sDuration = { duration: duration }
      let pclass;

      if (style === 'success' || !style){  pclass = 'notif-success'; }
      if (style === 'warning'){  pclass = 'notif-warning'; }

      if (accion === 'open') {

          this._snackBar.open(menssage, sAccion, {
              duration: 5000,
              panelClass: pclass
          });
      }

      if (accion === 'close') {

          this._snackBar.dismiss();
      }

  }

  dataView(nameTable): any{

        let dataSource;

        this._fuseProgressBarService.show();
        this.get(nameTable)
            .subscribe( data => {

                console.log('CONSULTA::', data);
                dataSource = data;

            });

        return dataSource;
  }

  checkRut(rut): any{
        // Despejar Puntos
        let valor = rut.replace('.','');
        // Despejar Guión
        valor = valor.replace('-','');

        // Aislar Cuerpo y Dígito Verificador
        let cuerpo = valor.slice(0, -1);
        let dv = valor.slice(-1).toUpperCase();

        // Formatear RUN
        rut = cuerpo + '-' + dv;

        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if (cuerpo.length < 7) {
            return 'RUT Incompleto';
        }

        // Calcular Dígito Verificador
        let suma = 0;
        let multiplo = 2;

        // Para cada dígito del Cuerpo
        for (let i = 1; i <= cuerpo.length; i++) {

            // Obtener su Producto con el Múltiplo Correspondiente
            const index = multiplo * valor.charAt(cuerpo.length - i);

            // Sumar al Contador General
            suma = suma + index;

            // Consolidar Múltiplo dentro del rango [2,7]
            if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

        }

        // Calcular Dígito Verificador en base al Módulo 11
        const dvEsperado = 11 - (suma % 11);

        // Casos Especiales (0 y K)
        dv = (dv === 'K') ? 10 : dv;
        dv = (dv === 0) ? 11 : dv;

        // Validar que el Cuerpo coincide con su Dígito Verificador
        if (dvEsperado !== dv) {
            return 'RUT Inválido';
        }

        // Si todo sale bien, eliminar errores (decretar que es válido)

    }


getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resp => {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => {
                reject(err);
            });
    });
}

getLocation() {
    this.getPosition().then(pos => {
        let latitude = pos.lat;
        let longitude = pos.lng;

        console.log('latitude::',latitude);
        console.log('longitude::',longitude);
    });
}

  navegacion(_perfil = 'admin'){

      let perfil = [];
        switch (_perfil) {

            case 'admin': {
                perfil = [{
                    id       : 'menu',
                    title    : 'Menu',
                    translate: 'Menu',
                    type     : 'group',
                    children : [

                        {
                            id       : 'home',
                            title    : 'Home',
                            translate: 'Home',
                            type     : 'item',
                            icon     : 'home',
                            url      : '/home',
                            badge    : {}
                        },
                        {
                            id       : 'gestion',
                            title    : 'Gestion',
                            translate: 'Gestion',
                            type     : 'collapsable',
                            icon     : 'group_work',
                            children : [
                                {
                                    id       : 'usuarios',
                                    title    : 'Usuarios',
                                    translate: 'Usuarios',
                                    type     : 'item',
                                    icon     : 'account_circle',
                                    url      : '/usuarios'
                                }
                            ]
                        },
                        {
                            id       : 'salir',
                            title    : 'Salir',
                            translate: 'Salir',
                            type     : 'item',
                            icon     : 'power_settings_new',
                            url      : '/salir'
                        }
                    ]

                }];
                break;
            }

            case 'registrador': {

                perfil = [{
                    id       : 'menu',
                    title    : 'Menu',
                    translate: 'Menu',
                    type     : 'group',
                    children : [

                        {
                            id       : 'home',
                            title    : 'Home',
                            translate: 'Home',
                            type     : 'item',
                            icon     : 'home',
                            url      : '/home',
                            badge    : {}
                        },
                        {
                            id       : 'gestion',
                            title    : 'Gestion',
                            translate: 'Gestion',
                            type     : 'collapsable',
                            icon     : 'group_work',
                            children : [
                                {
                                    id       : 'usuarios',
                                    title    : 'Usuarios',
                                    translate: 'Usuarios',
                                    type     : 'item',
                                    icon     : 'account_circle',
                                    url      : '/usuarios'
                                },
                                {
                                    id       : 'postulante',
                                    title    : 'Postulante',
                                    translate: 'Postulante',
                                    type     : 'item',
                                    icon     : 'assignment_ind',
                                    url      : '/postulante'
                                },
                                {
                                    id       : 'empleado',
                                    title    : 'Empleado',
                                    translate: 'Empleado',
                                    type     : 'item',
                                    icon     : 'assignment_ind',
                                    url      : '/empleado'
                                },
                                {
                                    id       : 'contrato',
                                    title    : 'Contrato',
                                    translate: 'Contrato',
                                    type     : 'item',
                                    icon     : 'description',
                                    url      : '/contrato'
                                },
                                {
                                    id       : 'finiquito',
                                    title    : 'Finiquito',
                                    translate: 'Finiquito',
                                    type     : 'item',
                                    icon     : 'description',
                                    url      : '/finiquito'
                                },
                                {
                                    id       : 'registroContrato',
                                    title    : 'Registro de contrato',
                                    translate: 'Registro de contrato',
                                    type     : 'item',
                                    icon     : 'chrome_reader_mode',
                                    url      : '/registro-contrato' 
                                },
                                {
                                    id       : 'clientes',
                                    title    : 'Clientes',
                                    translate: 'Clientes',
                                    type     : 'item',
                                    icon     : 'supervised_user_circle',
                                    url      : '/clientes'
                                },
                                {
                                    id       : 'carga',
                                    title    : 'Carga masiva',
                                    translate: 'Carga masiva',
                                    type     : 'item',
                                    icon     : 'backup',
                                    url      : '/carga'
                                },
                                {
                                    id       : 'firmas',
                                    title    : 'Firmas generadas',
                                    translate: 'Firmas generadas',
                                    type     : 'item',
                                    icon     : 'gesture',
                                    url      : '/firmas'
                                }
                            ]
                        },
                        {
                            id       : 'salir',
                            title    : 'Salir',
                            translate: 'Salir',
                            type     : 'item',
                            icon     : 'power_settings_new',
                            url      : '/salir',
                            badge    : {}
                        }
                    ]

                }];

                break;
            }

            case '': {

                break;
            }

        }

      const navigation: FuseNavigation[] = perfil;
      return navigation;
  }
}

