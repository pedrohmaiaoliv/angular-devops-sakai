import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Pet } from '../../../api/pet.model';
import { Service } from '../../../api/service.model';
import { ServiceRequest } from '../../../api/serviceRequest.model';
import { Tutor } from '../../../api/tutors.models';
import { PetService } from '../../../service/pet.service';
import { ServiceService } from '../../../service/service.service';
import { ServiceRequestService } from '../../../service/serviceRequest.service';
import { TutorService } from '../../../service/tutors.service';

@Component({
    selector: 'app-service-request',
    templateUrl: './serviceRequest.component.html',
    providers: [MessageService],
})
export class ServiceRequestComponent implements OnInit {
    serviceRequest: ServiceRequest = {};
    serviceRequests: ServiceRequest[] = [];
    pets: Pet[] = [];
    tutors: Tutor[] = [];
    services: Service[] = [];
    selectedRequests: ServiceRequest[] = [];
    requestDialog: boolean = false;
    deleteRequestDialog: boolean = false;
    deleteRequestsDialog: boolean = false;
    submitted: boolean = false;

    constructor(
        private serviceRequestService: ServiceRequestService,
        private messageService: MessageService,
        private petService: PetService,
        private tutorService: TutorService,
        private serviceService: ServiceService
    ) { }

    ngOnInit() {
        this.fetchPets();
        this.fetchTutors();
        this.fetchServices();
        this.serviceRequestService.getServiceRequests().subscribe(data => this.serviceRequests = data);
    }

    fetchPets() {
        this.petService.getPets().subscribe(pets => {
            this.pets = pets;
        });
    }

    fetchTutors() {
        this.tutorService.getTutors().subscribe(tutors => {
            this.tutors = tutors;
        });
    }

    fetchServices() {
        this.serviceService.getServices().subscribe(services => {
            this.services = services;
        });
    }

    openNew() {
        this.serviceRequest = {};
        this.submitted = false;
        this.requestDialog = true;
    }

    hideDialog() {
        this.requestDialog = false;
        this.submitted = false;
    }

    saveServiceRequest() {
        this.submitted = true;

        if (!this.serviceRequest.pet || !this.serviceRequest.tutor || !this.serviceRequest.service || !this.serviceRequest.date) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios.', life: 3000 });
            return;
        }

        if (this.serviceRequest.id) {
            this.serviceRequestService.updateServiceRequest(this.serviceRequest.id, this.serviceRequest).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Atualizada', life: 3000 });
            });
        } else {
            this.serviceRequestService.createServiceRequest(this.serviceRequest);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Criada', life: 3000 });
        }

        this.serviceRequest = {};
        this.submitted = false;
        this.requestDialog = false;
    }

    deleteSelectedRequests() {
        this.deleteRequestsDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteRequestsDialog = false;
        this.serviceRequests = this.serviceRequests.filter(val => !this.selectedRequests.includes(val));
        this.selectedRequests = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitações de Serviço Excluídas', life: 3000 });
    }

    editRequest(request: ServiceRequest) {
        this.serviceRequest = { ...request };
    
        // Converte a data para o objeto Date, se estiver como string
        if (typeof this.serviceRequest.date === 'string') {
            this.serviceRequest.date = new Date(this.serviceRequest.date);
        }
    
        this.requestDialog = true;
    }

    deleteRequest(request: ServiceRequest) {
        this.deleteRequestDialog = true;
        this.serviceRequest = { ...request };
    }

    confirmDelete() {
        this.deleteRequestDialog = false;
        this.serviceRequests = this.serviceRequests.filter(val => val.id !== this.serviceRequest.id);
        this.serviceRequest = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Excluída', life: 3000 });
    }
}