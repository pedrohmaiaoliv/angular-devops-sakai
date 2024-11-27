import { NgModule } from '@angular/core'; // Importa o decorador NgModule para criar módulos Angular
import { CommonModule } from '@angular/common'; // Módulo comum usado para funcionalidades básicas do Angular
import { FormsModule } from '@angular/forms'; // Importa o módulo para manipulação de formulários
import { ServicesRoutingModule } from './service-routing.module'; // Módulo de rotas específico para o componente de serviços
import { ServicesComponent } from './service.component'; // Componente principal para exibir e gerenciar os serviços

// Importações dos módulos PrimeNG necessários para a interface do usuário
import { TableModule } from 'primeng/table'; // Módulo para exibir tabelas interativas
import { ButtonModule } from 'primeng/button'; // Módulo para botões estilizados
import { RippleModule } from 'primeng/ripple'; // Efeito de clique (ripple) nos botões
import { ToastModule } from 'primeng/toast'; // Módulo para notificações
import { ToolbarModule } from 'primeng/toolbar'; // Barra de ferramentas estilizada
import { InputTextModule } from 'primeng/inputtext'; // Campo de texto
import { InputTextareaModule } from 'primeng/inputtextarea'; // Campo de texto em área
import { DialogModule } from 'primeng/dialog'; // Módulo para janelas de diálogo
import { InputNumberModule } from 'primeng/inputnumber'; // Campo para entrada de números

@NgModule({
  imports: [
    CommonModule, // Importa funcionalidades básicas do Angular
    ServicesRoutingModule, // Rotas relacionadas ao módulo de serviços
    TableModule, // Tabela para exibir dados
    FormsModule, // Manipulação de formulários
    ButtonModule, // Botões estilizados
    RippleModule, // Efeito visual para cliques
    ToastModule, // Sistema de notificações
    ToolbarModule, // Barra de ferramentas para organização visual
    InputTextModule, // Entrada de texto padrão
    InputTextareaModule, // Entrada de texto multilinhas
    DialogModule, // Janelas de diálogo para criar/editar/excluir serviços
    InputNumberModule // Entrada de números para campos como preço ou duração
  ],
  declarations: [ServicesComponent] // Declaração do componente que será usado neste módulo
})
export class ServicesModule {}
