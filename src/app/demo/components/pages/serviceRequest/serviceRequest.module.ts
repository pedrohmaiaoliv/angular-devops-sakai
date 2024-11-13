import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PetService } from '../../../service/pet.service';
import { ServiceService } from '../../../service/service.service';
import { TutorService } from '../../../service/tutors.service';
import { ServiceRequestRoutingModule } from './serviceRequest-routing.module';
import { ServiceRequestComponent } from './serviceRequest.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ServiceRequestRoutingModule,
        DropdownModule,
        CalendarModule,
        ButtonModule,
        TableModule,
        ToolbarModule,
        DialogModule,
        ToastModule,
        FileUploadModule
    ],
    declarations: [ServiceRequestComponent],
    providers: [
        PetService,
        TutorService,
        ServiceService
    ]
})
export class ServiceRequestModule { }