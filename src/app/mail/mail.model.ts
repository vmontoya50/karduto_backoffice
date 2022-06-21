export class Mail
{
    id: string;
    from: {
        name: string,
        avatar: string,
        email: string
    };
    to: {
        name: string,
        email: string
    }[];
    subject: string;
    message: string;
    tasa: string;
    estado: string;
    owner: string;
    ownerName: string;
    ownerLastName: string;
    monto: string;
    identificacionEmisor: string;
    tipoIdentificacionEmisor: string;
    receptorsNombre: string;
    emisorName: string;
    archivo_entrante: string;
    receptors_apellido: string;
    receptors_cuenta_banco: string;
    receptors_cuenta_numero: string;
    receptors_cuenta_tipo: string;
    time: string;
    read: boolean;
    starred: boolean;
    important: boolean;
    hasAttachments: boolean;
    attachments: {
        type: string,
        fileName: string,
        preview: string,
        url: string,
        size: string
    }[];
    labels: string[];
    folder: string;
    receptors_identificacion: string;
    tipo_identificacion_receptor: string;
    referencia_entrante: string;
    asignado_name: string;
    asignadorLastName: string;
    emisorLastName: string;
    archivo_saliente: string;
    created_at: string;
    id_asignador;
    id_asignado;
    dispositivo;
    moneda_ent_pais;
    moneda_sal_pais;
    emisor_email;
    emisor_telefono;
    referencia_saliente;
    zelle;
    pago_movil;
    correo_cuenta;
    numero_interbancario;

    /**
     * Constructor
     *
     * @param mail
     */
    constructor(mail)
    {
        this.id = mail.id;
        this.estado = mail.estado;
        this.owner = mail.owner;
        this.ownerName = mail.owner_name;
        this.ownerLastName = mail.owner_lastName;
        this.to = mail.id_asignado;
        this.subject = '';
        this.message = '';
        this.tasa = mail.tasa;
        this.identificacionEmisor = mail.identificacion_emisor;
        this.tipoIdentificacionEmisor = mail.tipo_identificacion_emisor;
        this.monto = mail.monto_entrante;
        this.archivo_entrante = mail.archivo_entrante;
        this.time = mail.created_at;
        this.read = mail.read;
        this.starred = mail.starred;
        this.important = mail.important;
        this.hasAttachments = mail.hasAttachments;
        this.attachments = mail.attachments;
        this.labels = mail.labels;
        this.folder = mail.estado;
        this.estado = mail.estado;
        this.receptorsNombre = mail.receptors_nombre;
        this.receptors_apellido = mail.receptors_apellido;
        this.receptors_cuenta_banco = mail.receptors_cuenta_banco;
        this.receptors_cuenta_numero = mail.receptors_cuenta_numero;
        this.receptors_cuenta_tipo = mail.receptors_cuenta_tipo;
        this.receptors_identificacion = mail.receptors_identificacion;
        this.tipo_identificacion_receptor = mail.tipo_identificacion_receptor;
        this.referencia_entrante = mail.referencia_entrante;
        this.asignado_name = mail.asignado_name;
        this.asignadorLastName = mail.asignador_lastName;
        this.emisorName = mail.emisor_name;
        this.emisorLastName = mail.emisor_lastName;
        this.archivo_saliente = mail.archivo_saliente;
        this.created_at = mail.created_at;
        this.id_asignador = mail.id_asignador;
        this.id_asignado = mail.id_asignado;
        this.dispositivo = mail.dispositivo;
        this.moneda_ent_pais = mail.moneda_ent_pais;
        this.moneda_sal_pais = mail.moneda_sal_pais;
        this.emisor_email = mail.emisor_email;
        this.emisor_telefono = mail.emisor_telefono;
        this.referencia_saliente = mail.referencia_saliente;
        this.zelle = mail.zelle;
        this.pago_movil = mail.pago_movil;
        this.correo_cuenta = mail.correo_cuenta;
        this.numero_interbancario = mail.numero_interbancario;
    }

    /**
     * Toggle star
     */
    toggleStar(): void
    {
        this.starred = !this.starred;
    }

    /**
     * Toggle important
     */
    toggleImportant(): void
    {
        this.important = !this.important;
    }
}
