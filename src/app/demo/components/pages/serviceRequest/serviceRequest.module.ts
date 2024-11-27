import { CommonModule } from '@angular/common'; // Módulo Angular com diretivas e pipes básicos (ex.: *ngIf, *ngFor)
import { NgModule } from '@angular/core'; // Decorador para definir um módulo Angular
import { FormsModule } from '@angular/forms'; // Módulo para trabalhar com formulários
import { ButtonModule } from 'primeng/button'; // Módulo do PrimeNG para botões estilizados
import { CalendarModule } from 'primeng/calendar'; // Componente do PrimeNG para seleção de datas
import { DialogModule } from 'primeng/dialog'; // Componente do PrimeNG para diálogos modais
import { DropdownModule } from 'primeng/dropdown'; // Componente do PrimeNG para menus suspensos (dropdowns)
import { FileUploadModule } from 'primeng/fileupload'; // Componente do PrimeNG para upload de arquivos
import { TableModule } from 'primeng/table'; // Componente do PrimeNG para tabelas interativas
import { ToastModule } from 'primeng/toast'; // Componente do PrimeNG para exibição de notificações (toasts)
import { ToolbarModule } from 'primeng/toolbar'; // Componente do PrimeNG para criar barras de ferramentas
import { PetService } from '../../../service/pet.service'; // Serviço para gerenciar pets
import { ServiceService } from '../../../service/service.service'; // Serviço para gerenciar serviços
import { TutorService } from '../../../service/tutors.service'; // Serviço para gerenciar tutores
import { ServiceRequestRoutingModule } from './serviceRequest-routing.module'; // Módulo de rotas para requisições de serviço
import { ServiceRequestComponent } from './serviceRequest.component'; // Componente principal para gerenciar requisições de serviço

@NgModule({
    // Importa módulos necessários para a funcionalidade de requisições de serviço
    imports: [
        CommonModule, // Fornece funcionalidades básicas do Angular
        FormsModule, // Manipulação de formulários
        ServiceRequestRoutingModule, // Rotas específicas para requisições de serviço
        DropdownModule, // Menu suspenso para seleção de opções (ex.: pets, tutores, serviços)
        CalendarModule, // Seleção de datas para agendamento
        ButtonModule, // Botões estilizados
        TableModule, // Exibição de tabelas interativas
        ToolbarModule, // Barra de ferramentas
        DialogModule, // Diálogos modais para criação/edição/exclusão
        ToastModule, // Notificações de feedback para o usuário
        FileUploadModule // Upload de arquivos (se necessário)
    ],
    // Declara o componente associado a este módulo
    declarations: [ServiceRequestComponent],
    // Define os provedores de serviços usados no módulo
    providers: [
        PetService, // Serviço para gerenciar pets
        TutorService, // Serviço para gerenciar tutores
        ServiceService // Serviço para gerenciar serviços
    ]
})
export class ServiceRequestModule { } // Exporta o módulo
