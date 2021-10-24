import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact } from '../../usuarios/usuarios.model';
import { ApiService } from '../../api.service';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector     : 'contacts-clientes-dialog',
    templateUrl  : './clientes.component.html',
    styleUrls    : ['./clientes.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsClientesDialogComponent  implements OnInit
{
    action: string;
    contact: Contact;
    Clientes: FormGroup;
    dialogTitle: string;

    perfil: Food[] = [
        {value: 'admin', viewValue: 'Admin'},
        {value: 'usuario', viewValue: 'Usuario'},
        {value: 'operavene', viewValue: 'Operador Venezuela'},
        {value: 'operaextra', viewValue: 'Operador Exranjero'}
    ];

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsClientesDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactsClientesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public api: ApiService,
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar usuario';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Nuevo usuario';
            this.contact = new Contact({});
        }

        this.Clientes = this.createClientes();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createClientes(): FormGroup
    {
        return this._formBuilder.group({
            id    : [this.contact.id],
            name    : [this.contact.name],
            lastName: [this.contact.lastName],
            password: [this.contact.password],
            c_password: [this.contact.c_password],
            avatar  : [this.contact.avatar],
            profile  : [this.contact.profile],
            email   : [this.contact.email],
            tipo_identificacion : [this.contact.tipo_identificacion],
            identificacion : [this.contact.identificacion], 
            telefono: [this.contact.telefono], 
            direccion: [this.contact.direccion],
            pais: [this.contact.pais],
        });
    }

    _setDialog(): void{

        const form = this.Clientes.value;
        console.log('FORM::', form);
        this.api.show();
        form.profile = 'cliente';
        form.password = form.identificacion;
        form.c_password = form.identificacion;
        form.direccion = form.direccion;
        this.api.put('usuarios/' + form.identificacion, form)
            .subscribe( data => {

                console.log('cliente::', data);
                this.matDialogRef.close(data);
                this.api.hide();

            });

    }

    ngOnInit(): any {
        this.api.dataPais();
    }
}

/*

'name', 'email', 'password','lastName','profile','tipo_identificacion','identificacion','telefono','direccion','pais',

*/
