import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../api.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import {Router} from '@angular/router';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    // VARIABLES
    loginForm: FormGroup;
    public dataUser;
    users: any = [];

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private api: ApiService,
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    getUsers(): void {

        // Toast de cargando.
        this.api.toast('open','Ingresando.', 5000);
        console.log(' FORM ', this.loginForm.value);
        this.api.post('v1/login',  this.loginForm.value)
        .pipe( catchError(_ => of(this.api.toast('open','Usuario o clave erroneos!'))))
        .subscribe( data => {

            this.dataUser = data;
            console.log('CONSULTA::', this.dataUser);
            // si es correcto el login
            if ( this.dataUser.success ){
                this.api.toast('close');
                // Imprimo los valores
                console.log('LOGIN::', this.dataUser.success );
                // Actualizo los valores
                this.api.onTokenChanged.next( this.dataUser.success.token );
                this.api.onUserChanged.next( this.dataUser.success.data );
                this.api.onUserChanged.complete();
                localStorage.setItem('user', JSON.stringify(this.dataUser.success.data) );
                localStorage.setItem('token', this.dataUser.success.token );

                console.log('DATOLOCALGUARDADO::', localStorage.getItem('user' ));
                // Redirecciono a home
                location.reload();
            }
            // Si no es correcto el login
            if ( this.dataUser.error ){
                this.api.toast('close');
                this.api.toast('open', 'Usuario o clave incorrecto!', 5000, 'warning');
            }
        });

    }

    

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.api.onTokenChanged.subscribe(token  => {
            console.log('Token', token);
            if (token.length > 0){
                this.router.navigate(['home']);
            }
        });


        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
