import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Adiciona ReactiveFormsModule
import { TutorsRoutingModule } from './tutors-routing.module'; // Corrigido para TutorsRoutingModule
import { TutorsComponent } from './tutors.component'; // Corrigido para TutorsComponent
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule,
        TutorsRoutingModule, // Corrigido para TutorsRoutingModule
        TableModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule, // Adicionado para suporte a formulários reativos
        ButtonModule,
        NgxMaskDirective,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule
    ],
    declarations: [TutorsComponent], // Corrigido para TutorsComponent
    providers: [provideNgxMask()],
})
export class TutorsModule { }
