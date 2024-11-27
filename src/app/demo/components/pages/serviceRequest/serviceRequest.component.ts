import { Component, OnInit } from '@angular/core'; // Importação para criar o componente Angular
import { MessageService } from 'primeng/api'; // Serviço para exibir mensagens de notificação no PrimeNG
import { Pet } from '../../../api/pet.model'; // Modelo para representar pets
import { Service } from '../../../api/service.model'; // Modelo para representar serviços
import { ServiceRequest } from '../../../api/serviceRequest.model'; // Modelo para representar solicitações de serviço
import { Tutor } from '../../../api/tutors.models'; // Modelo para representar tutores
import { PetService } from '../../../service/pet.service'; // Serviço para interagir com pets no banco de dados
import { ServiceService } from '../../../service/service.service'; // Serviço para interagir com serviços no banco de dados
import { ServiceRequestService } from '../../../service/serviceRequest.service'; // Serviço para manipular solicitações de serviço no banco de dados
import { TutorService } from '../../../service/tutors.service'; // Serviço para interagir com tutores no banco de dados

@Component({
    selector: 'app-service-request', // Seletor do componente
    templateUrl: './serviceRequest.component.html', // Arquivo HTML associado ao componente
    providers: [MessageService], // Fornece o serviço de mensagens apenas para este componente
})
export class ServiceRequestComponent implements OnInit {
    // Propriedades para manipular solicitações de serviço
    serviceRequest: ServiceRequest = {}; // Solicitação atual sendo criada/editada
    serviceRequests: ServiceRequest[] = []; // Lista de todas as solicitações
    pets: Pet[] = []; // Lista de todos os pets
    tutors: Tutor[] = []; // Lista de todos os tutores
    services: Service[] = []; // Lista de todos os serviços
    selectedRequests: ServiceRequest[] = []; // Lista de solicitações selecionadas para exclusão em massa
    requestDialog: boolean = false; // Controla o diálogo para criar/editar solicitação
    deleteRequestDialog: boolean = false; // Controla o diálogo para confirmar exclusão de uma solicitação
    deleteRequestsDialog: boolean = false; // Controla o diálogo para confirmar exclusão de várias solicitações
    submitted: boolean = false; // Indica se o formulário foi enviado
    petOptions: { label: string, value: string }[] = []; // Opções de pets para exibição no dropdown
    tutorOptions: { label: string, value: string }[] = []; // Opções de tutores para exibição no dropdown
    serviceOptions: { label: string, value: string }[] = []; // Opções de serviços para exibição no dropdown

    constructor(
        private serviceRequestService: ServiceRequestService, // Serviço para manipular solicitações de serviço
        private messageService: MessageService, // Serviço para exibir notificações
        private petService: PetService, // Serviço para manipular pets
        private tutorService: TutorService, // Serviço para manipular tutores
        private serviceService: ServiceService // Serviço para manipular serviços
    ) { }

    ngOnInit() {
        // Carrega dados necessários para o componente ao inicializar
        this.fetchPets();
        this.fetchTutors();
        this.fetchServices();
        this.serviceRequestService.getServiceRequests().subscribe(data => this.serviceRequests = data);
    }

    fetchPets() {
        // Busca a lista de pets e preenche as opções para dropdown
        this.petService.getAllPets().subscribe(pets => {
            this.pets = pets;
            this.petOptions = pets.map(pet => ({ label: pet.nome, value: pet.key }));
        });
    }

    fetchTutors() {
        // Busca a lista de tutores e preenche as opções para dropdown
        this.tutorService.getAllTutors().subscribe(tutors => {
            this.tutors = tutors;
            this.tutorOptions = tutors.map(tutor => ({ label: tutor.nome, value: tutor.key }));
        });
    }

    fetchServices() {
        // Busca a lista de serviços e preenche as opções para dropdown
        this.serviceService.getAllServices().subscribe(services => {
            this.services = services;
            this.serviceOptions = services.map(service => ({ label: service.nome, value: service.key }));
        });
    }

    openNew() {
        // Abre o diálogo para criar uma nova solicitação de serviço
        this.serviceRequest = {};
        this.submitted = false;
        this.requestDialog = true;
    }

    hideDialog() {
        // Fecha o diálogo de criação/edição
        this.requestDialog = false;
        this.submitted = false;
    }

    saveServiceRequest() {
        // Salva uma solicitação de serviço
        this.submitted = true;

        if (!this.serviceRequest.pet || !this.serviceRequest.tutor || !this.serviceRequest.service || !this.serviceRequest.date) {
            // Valida que todos os campos obrigatórios estão preenchidos
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios.', life: 3000 });
            return;
        }

        // Busca nomes de pet, tutor e serviço com base nas chaves selecionadas
        const pet = this.pets.find(p => p.key === this.serviceRequest.pet);
        const tutor = this.tutors.find(t => t.key === this.serviceRequest.tutor);
        const service = this.services.find(s => s.key === this.serviceRequest.service);

        // Inclui os nomes na solicitação antes de salvar
        const serviceRequestToSave = {
            ...this.serviceRequest,
            petName: pet ? pet.nome : '',
            tutorName: tutor ? tutor.nome : '',
            serviceName: service ? service.nome : ''
        };

        if (this.serviceRequest.key) {
            // Atualiza uma solicitação existente
            this.serviceRequestService.updateServiceRequest(this.serviceRequest.key, serviceRequestToSave).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Atualizada', life: 3000 });
            });
        } else {
            // Cria uma nova solicitação
            this.serviceRequestService.createServiceRequest(serviceRequestToSave);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Criada', life: 3000 });
        }

        // Reseta os estados
        this.serviceRequest = {};
        this.submitted = false;
        this.requestDialog = false;
    }

    deleteSelectedRequests() {
        // Abre o diálogo de confirmação para exclusão em massa
        this.deleteRequestsDialog = true;
    }

    confirmDeleteSelected() {
        // Confirma a exclusão de múltiplas solicitações
        this.deleteRequestsDialog = false;
        this.selectedRequests.forEach(request => {
            this.serviceRequestService.deleteServiceRequest(request.key).then(() => {
                this.serviceRequests = this.serviceRequests.filter(val => val.key !== request.key);
            });
        });
        this.selectedRequests = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitações de Serviço Excluídas', life: 3000 });
    }

    editRequest(request: ServiceRequest) {
        // Abre o diálogo para editar uma solicitação existente
        this.serviceRequest = { ...request };

        // Converte a data para o objeto Date, se necessário
        if (typeof this.serviceRequest.date === 'string') {
            this.serviceRequest.date = new Date(this.serviceRequest.date);
        }

        this.requestDialog = true;
    }

    deleteRequest(request: ServiceRequest) {
        // Abre o diálogo para confirmar a exclusão de uma solicitação
        this.deleteRequestDialog = true;
        this.serviceRequest = { ...request };
    }

    confirmDelete() {
        // Confirma a exclusão de uma solicitação
        this.deleteRequestDialog = false;
        this.serviceRequestService.deleteServiceRequest(this.serviceRequest.key).then(() => {
            this.serviceRequests = this.serviceRequests.filter(val => val.key !== this.serviceRequest.key);
            this.serviceRequest = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitação de Serviço Excluída', life: 3000 });
        });
    }

    getPetLabel(id: string): string {
        // Retorna o nome do pet com base no ID
        const pet = this.petOptions.find(option => option.value === id);
        return pet ? pet.label : '';
    }

    getTutorLabel(id: string): string {
        // Retorna o nome do tutor com base no ID
        const tutor = this.tutorOptions.find(option => option.value === id);
        return tutor ? tutor.label : '';
    }

    getServiceLabel(id: string): string {
        // Retorna o nome do serviço com base no ID
        const service = this.serviceOptions.find(option => option.value === id);
        return service ? service.label : '';
    }
}
