import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule, FuseWidgetModule} from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { SalirComponent } from './salir/salir.component';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
    MatChipsModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule, MatAutocompleteModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
    },
    {
        path: 'postulante',
        loadChildren: () => import('./postulante/postulante.module').then(m => m.PostulanteModule)
    },
    {
        path: 'empleado',
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule)
    },
    {
        path: 'contrato',
        loadChildren: () => import('./contrato/contrato.module').then(m => m.ContratoModule)
    },
    {
        path: 'finiquito',
        loadChildren: () => import('./finiquito/finiquito.module').then(m => m.FiniquitoModule)
    },
    {
        path: 'registro-contrato',
        loadChildren: () => import('./resgistro-contrato/registro-contrato.module').then(m => m.RegistroContratoModule)
    },
    {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
    },
    {
        path: 'carga',
        loadChildren: () => import('./carga/carga.module').then(m => m.CargaModule)
    },
    {
        path: 'firmas',
        loadChildren: () => import('./firmas/firmas.module').then(m => m.FirmasModule)
    },
    {
        path: 'firmas-externa',
        loadChildren: () => import('./firma-externa/firma-externa.module').then(m => m.FirmaExternaModule)
    },
    /*{
        path: 'registro-contrato-dispo',
        loadChildren: () => import('./resgistro-contrato-dispo/registro-contrato-dispo.module').then(m => m.RegistroContratoDispoModule)
    },*/
    {
        path      : 'home',
        component: HomeComponent
    },
    {
        path      : 'salir',
        component: SalirComponent
    },
    {
        path      : 'sample',
        redirectTo: 'sample'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SalirComponent
    ],
    imports     : [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTabsModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatDividerModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatCardModule,
        MatSlideToggleModule,

        // Charts
        NgxChartsModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FlexLayoutModule,
        FuseWidgetModule,

        // App modules
        LayoutModule,
        SampleModule,

        // SnackBar
        MatSnackBarModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
