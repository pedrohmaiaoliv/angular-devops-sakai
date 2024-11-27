import { NgModule } from '@angular/core'; // Importa o decorador NgModule para criar módulos Angular
import { CommonModule } from '@angular/common'; // Fornece diretivas e pipes comuns para o Angular
import { FormsModule } from '@angular/forms'; // Módulo para manipulação de formulários no Angular
import { CrudRoutingModule } from './crud-routing.module'; // Módulo de rotas para a funcionalidade CRUD
import { CrudComponent } from './crud.component'; // Componente principal associado ao CRUD

// Importações de módulos PrimeNG usados para a interface do usuário
import { TableModule } from 'primeng/table'; // Para exibir tabelas interativas
import { FileUploadModule } from 'primeng/fileupload'; // Para upload de arquivos
import { CalendarModule } from 'primeng/calendar'; // Para campos de seleção de data
import { ButtonModule } from 'primeng/button'; // Botões estilizados
import { RippleModule } from 'primeng/ripple'; // Efeito ripple (clicável)
import { ToastModule } from 'primeng/toast'; // Notificações na interface
import { ToolbarModule } from 'primeng/toolbar'; // Barra de ferramentas estilizada
import { RatingModule } from 'primeng/rating'; // Componente de avaliação (estrelas)
import { InputTextModule } from 'primeng/inputtext'; // Campo de entrada de texto padrão
import { InputTextareaModule } from 'primeng/inputtextarea'; // Campo de entrada de texto multilinhas
import { DropdownModule } from 'primeng/dropdown'; // Menu suspenso (dropdown)
import { RadioButtonModule } from 'primeng/radiobutton'; // Botões de rádio
import { InputNumberModule } from 'primeng/inputnumber'; // Campo para entrada de números
import { DialogModule } from 'primeng/dialog'; // Janelas de diálogo para interações modais
import { InputMaskModule } from 'primeng/inputmask'; // Máscaras para campos de entrada (ex.: CPF, telefone)

@NgModule({
    // Importa os módulos necessários para o funcionamento do componente
    imports: [
        CommonModule, // Fornece funcionalidades básicas do Angular
        CalendarModule, // Seleção de datas
        CrudRoutingModule, // Configuração de rotas do módulo
        TableModule, // Tabela interativa
        FileUploadModule, // Upload de arquivos
        FormsModule, // Manipulação de formulários
        ButtonModule, // Botões
        RippleModule, // Efeito visual de clique
        ToastModule, // Notificações de sucesso, erro, etc.
        ToolbarModule, // Barra de ferramentas
        RatingModule, // Avaliação (estrelas)
        InputTextModule, // Entrada de texto padrão
        InputTextareaModule, // Entrada de texto multilinhas
        DropdownModule, // Menu suspenso
        RadioButtonModule, // Botões de rádio
        InputNumberModule, // Entrada de números
        DialogModule, // Janelas de diálogo
        InputMaskModule // Máscaras de entrada para formatação de dados
    ],
    // Declara os componentes que fazem parte deste módulo
    declarations: [CrudComponent]
})
export class CrudModule { }
