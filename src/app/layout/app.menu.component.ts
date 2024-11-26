import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Iniciar',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Paginas',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Pets',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Tutores',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/tutors']
                    },
                    {
                        label: 'Serviços',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/service_crud']
                    },
                    {
                        label: 'Solicitação de Serviços',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/serviceRequest']
                    }
                ]
            }
        ];
    }
}
