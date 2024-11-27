import { NgModule } from '@angular/core'; // Importa o decorador NgModule para definir módulos no Angular
import { RouterModule } from '@angular/router'; // Importa o módulo de rotas para configurar as rotas no Angular
import { TutorsComponent } from './tutors.component'; // Importa o componente que será exibido para esta rota

@NgModule({
    // Configurações de importação
    imports: [
        RouterModule.forChild([ // Configura rotas específicas para este módulo (módulo filho)
            { 
                path: '', // Define a rota raiz ('') para este módulo
                component: TutorsComponent // Especifica que o componente `TutorsComponent` será carregado
            }
        ])
    ],
    // Exporta o RouterModule para que as rotas configuradas possam ser usadas em outros módulos
    exports: [RouterModule]
})
export class TutorsRoutingModule { } // Exporta o módulo de rotas específico para tutores
