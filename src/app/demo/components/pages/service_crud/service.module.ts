import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesRoutingModule } from './service-routing.module';
import { ServicesComponent } from './service.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast'; // Importa ToastModule
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber'; // Importa InputNumberModule se ainda não estiver

@NgModule({
  imports: [
    CommonModule,
    ServicesRoutingModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule, // Adicionado aqui
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    InputNumberModule
  ],
  declarations: [ServicesComponent]
})
export class ServicesModule {}
