import { NgModule } from '@angular/core'; // Importa o decorador NgModule para criar módulos no Angular
import { RouterModule } from '@angular/router'; // Importa o módulo de rotas do Angular para configurar as rotas
import { ServiceRequestComponent } from './serviceRequest.component'; // Importa o componente associado à funcionalidade de requisições de serviço

@NgModule({
    // Define as importações necessárias para o módulo
    imports: [
        RouterModule.forChild([ // Configura rotas específicas para este módulo (módulo filho)
            { path: '', component: ServiceRequestComponent } 
            // Define a rota raiz ('') para renderizar o componente ServiceRequestComponent
        ])
    ],
    // Exporta o RouterModule para que as rotas configuradas possam ser usadas em outros módulos
    exports: [RouterModule]
})
export class ServiceRequestRoutingModule { } // Exporta o módulo de rotas específico para requisições de serviço
