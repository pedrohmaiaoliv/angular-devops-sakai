import { NgModule } from '@angular/core'; // Importa o decorador NgModule para criar módulos Angular
import { RouterModule } from '@angular/router'; // Importa o módulo de rotas do Angular para configurar as rotas
import { CrudComponent } from './crud.component'; // Importa o componente que será exibido para a rota definida

@NgModule({
    // Importa o RouterModule e define a rota específica deste módulo
    imports: [
        RouterModule.forChild([ // Utiliza `forChild` porque este é um módulo de funcionalidade (feature module)
            { path: '', component: CrudComponent } // Define a rota raiz ('') para renderizar o `CrudComponent`
        ])
    ],
    // Exporta o RouterModule para que as rotas definidas possam ser acessadas por outros módulos
    exports: [RouterModule]
})
export class CrudRoutingModule { } // Exporta o módulo de rotas específico para a funcionalidade de CRUD
