import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
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
                        url      : '/usuarios',
                        badge    : {}
                    }
                ]
            }
        ]

    }
];
