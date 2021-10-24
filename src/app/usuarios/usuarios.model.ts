import { FuseUtils } from '@fuse/utils';

export class Contact
{
    id: string;
    name: string;
    lastName: string;
    password: string;
    c_password: string;
    avatar: string;
    profile: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;
    tipo_identificacion: string;
    identificacion: string;
    telefono: string;
    direccion: string;
    pais: string;

    /**
     * Constructor 
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            this.lastName = contact.lastName || '';
            this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.profile = contact.profile || '';
            this.email = contact.email || '';
            this.phone = contact.phone || '';
            this.address = contact.address || '';
            this.birthday = contact.birthday || '';
            this.notes = contact.notes || '';
            this.tipo_identificacion = contact.tipo_identificacion || '';
            this.identificacion = contact.identificacion || '';
            this.telefono = contact.telefono || '';
            this.direccion = contact.direccion || '';
            this.pais = contact.pais || '';
        }
    }
}
