import { NgModule } from '@angular/core'; // Importação do módulo principal do Angular para definir módulos
import { RouterModule } from '@angular/router'; // Importação para configuração de rotas no Angular
import { ServicesComponent } from './service.component'; // Importação do componente que será exibido para esta rota

@NgModule({
  // Configuração das importações necessárias para este módulo de rotas
  imports: [
    RouterModule.forChild([
      { path: '', component: ServicesComponent } // Define uma rota vazia ('') que renderiza o `ServicesComponent`
    ])
  ],
  exports: [RouterModule] // Exportação do RouterModule para que as rotas definidas aqui sejam visíveis para outros módulos
})
export class ServicesRoutingModule { } // Exporta o módulo de rotas específico para os serviços
