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
    petOptions: { label: string, value: string }[] = [];
    tutorOptions: { label: string, value: string }[] = [];
    serviceOptions: { label: string, value: string }[] = [];

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
        this.petService.getAllPets().subscribe(pets => {
            this.pets = pets;
            this.petOptions = pets.map(pet => ({ label: pet.nome, value: pet.key }));
        });
    }

    fetchTutors() {
        this.tutorService.getAllTutors().subscribe(tutors => {
            this.tutors = tutors;
            this.tutorOptions = tutors.map(tutor => ({ label: tutor.nome, value: tutor.key }));
        });
    }

    fetchServices() {
        this.serviceService.getAllServices().subscribe(services => {
            this.services = services;
            this.serviceOptions = services.map(service => ({ label: service.nome, value: service.key }));
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

        // Fetch the names based on the selected keys
        const pet = this.pets.find(p => p.key === this.serviceRequest.pet);
        const tutor = this.tutors.find(t => t.key === this.serviceRequest.tutor);
        const service = this.services.find(s => s.key === this.serviceRequest.service);

        // Include the names in the service request
        const serviceRequestToSave = {
            ...this.serviceRequest,
            petName: pet ? pet.nome : '',
            tutorName: tutor ? tutor.nome : '',
            serviceName: service ? service.nome : ''
        };

        if (this.serviceRequest.key) {
            this.serviceRequestService.updateServiceRequest(this.serviceRequest.key, serviceRequestToSave).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Atualizada', life: 3000 });
            });
        } else {
            this.serviceRequestService.createServiceRequest(serviceRequestToSave);
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
        this.selectedRequests.forEach(request => {
            this.serviceRequestService.deleteServiceRequest(request.key).then(() => {
                this.serviceRequests = this.serviceRequests.filter(val => val.key !== request.key);
            }).catch(error => {
                console.error('Error deleting selected service request:', error); // Log any errors
            });
        });
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
        this.serviceRequestService.deleteServiceRequest(this.serviceRequest.key).then(() => {
            this.serviceRequests = this.serviceRequests.filter(val => val.key !== this.serviceRequest.key);
            this.serviceRequest = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Excluída', life: 3000 });
        }).catch(error => {
            console.error('Error deleting service request:', error); // Log any errors
        });
    }

    getPetLabel(id: string): string {
        const pet = this.petOptions.find(option => option.value === id);
        return pet ? pet.label : '';
    }

    getTutorLabel(id: string): string {
        const tutor = this.tutorOptions.find(option => option.value === id);
        return tutor ? tutor.label : '';
    }

    getServiceLabel(id: string): string {
        const service = this.serviceOptions.find(option => option.value === id);
        return service ? service.label : '';
    }
}