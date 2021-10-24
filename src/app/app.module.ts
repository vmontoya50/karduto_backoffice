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
import {UsuariosModule} from './usuarios/usuarios.module';
import {PasoComponent} from './paso/paso.component';


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
        path: 'pendientes',
        loadChildren: () => import('./pendientes/pendientes.module').then(m => m.PendientesModule)
    },
    {
        path: 'cuentas',
        loadChildren: () => import('./cuentas/cuentas.module').then(m => m.CuentasModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'transacciones',
        loadChildren: () => import('./transacciones/transacciones.module').then(m => m.TransaccionesModule)
    },
    {
        path: 'agregar_moneda',
        loadChildren: () => import('./agregar_moneda/index.module').then(m => m.AgregarMonedaModule)
    },
    {
        path: 'agregar_banco',
        loadChildren: () => import('./agregar_banco/index.module').then(m => m.AgregarBancoModule)
    },
    {
        path: 'mail',
        loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
    },
    {
        path: 'nueva',
        loadChildren: () => import('./nueva/nueva.module').then(m => m.NuevaModule)
    },
    {
        path: 'tasa',
        loadChildren: () => import('./tasa/index.module').then(m => m.TasaModule)
    },
    {
        path: 'agregar_pais',
        loadChildren: () => import('./agregar_pais/index.module').then(m => m.AgregarPaisModule)
    },
    {
        path: 'movimientos',
        loadChildren: () => import('./movimientos/index.module').then(m => m.MovimientosModule)
    },
    {
        path      : 'home',
        component: HomeComponent
    },
    {
        path      : 'paso',
        component: PasoComponent
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
        PasoComponent,
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
    exports: [RouterModule],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
