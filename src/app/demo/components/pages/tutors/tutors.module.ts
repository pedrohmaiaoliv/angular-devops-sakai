import { NgModule } from '@angular/core'; // Importa o decorador NgModule para criar módulos no Angular
import { CommonModule } from '@angular/common'; // Fornece diretivas e pipes básicos do Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para formulários baseados em template e reativos
import { TutorsRoutingModule } from './tutors-routing.module'; // Importa o módulo de rotas para tutores
import { TutorsComponent } from './tutors.component'; // Componente principal para gerenciar tutores

// Importações do PrimeNG
import { TableModule } from 'primeng/table'; // Para exibição de tabelas interativas
import { FileUploadModule } from 'primeng/fileupload'; // Para upload de arquivos
import { ButtonModule } from 'primeng/button'; // Botões estilizados
import { RippleModule } from 'primeng/ripple'; // Efeito de clique em botões
import { ToastModule } from 'primeng/toast'; // Exibição de mensagens de feedback
import { ToolbarModule } from 'primeng/toolbar'; // Barra de ferramentas estilizada
import { RatingModule } from 'primeng/rating'; // Componente de avaliação (estrelas)
import { InputTextModule } from 'primeng/inputtext'; // Campo de entrada de texto
import { InputTextareaModule } from 'primeng/inputtextarea'; // Campo de entrada de texto multilinhas
import { DropdownModule } from 'primeng/dropdown'; // Menu suspenso para seleção de opções
import { RadioButtonModule } from 'primeng/radiobutton'; // Botões de rádio para seleção única
import { InputNumberModule } from 'primeng/inputnumber'; // Campo para entrada de números
import { DialogModule } from 'primeng/dialog'; // Diálogo modal para interações
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; // Diretiva e provedor para máscaras de entrada
import { InputMaskModule } from 'primeng/inputmask'; // Máscaras para campos de entrada (ex.: CPF, telefone)

@NgModule({
    // Módulos importados que fornecem funcionalidades ao componente Tutors
    imports: [
        CommonModule, // Diretivas e pipes básicos do Angular
        TutorsRoutingModule, // Configuração de rotas para o módulo de tutores
        TableModule, // Tabelas interativas
        FileUploadModule, // Upload de arquivos
        FormsModule, // Suporte a formulários baseados em template
        ReactiveFormsModule, // Suporte a formulários reativos
        ButtonModule, // Botões estilizados
        NgxMaskDirective, // Diretiva para aplicar máscaras
        RippleModule, // Efeito visual em cliques
        InputMaskModule, // Máscaras de entrada (ex.: CPF, telefone)
        ToastModule, // Feedback visual (notificações)
        ToolbarModule, // Barra de ferramentas
        RatingModule, // Avaliação (estrelas)
        InputTextModule, // Entrada de texto padrão
        InputTextareaModule, // Entrada de texto multilinhas
        DropdownModule, // Menu suspenso para seleção
        RadioButtonModule, // Botões de seleção única
        InputNumberModule, // Entrada numérica
        DialogModule // Janelas de diálogo para interações
    ],
    // Declarações de componentes pertencentes a este módulo
    declarations: [TutorsComponent], // Componente principal para tutores
    // Provedores de serviços utilizados no módulo
    providers: [provideNgxMask()], // Provedor para máscaras de entrada (ngx-mask)
})
export class TutorsModule { }
