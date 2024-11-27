import { Component, OnInit } from '@angular/core'; // Importa os módulos necessários do Angular
import { Service } from '../../../api/service.model'; // Modelo para tipagem dos serviços
import { MessageService } from 'primeng/api'; // Serviço do PrimeNG para exibir mensagens de notificação
import { ServiceService } from '../../../service/service.service'; // Serviço personalizado para interagir com o Firebase

@Component({
  templateUrl: './service.component.html', // HTML associado ao componente
  providers: [MessageService] // Declaração do MessageService como provedor para uso local no componente
})
export class ServicesComponent implements OnInit {
  // Variáveis para controle do estado do componente
  serviceDialog: boolean = false; // Controla a visibilidade do diálogo de criação/edição de serviços
  deleteServiceDialog: boolean = false; // Controla a visibilidade do diálogo de confirmação de exclusão individual
  deleteServicesDialog: boolean = false; // Controla a visibilidade do diálogo de exclusão em massa

  services: Service[] = []; // Lista de todos os serviços carregados
  service: Service = {}; // Serviço atualmente sendo criado ou editado
  selectedServices: Service[] = []; // Lista de serviços selecionados para exclusão em massa
  submitted: boolean = false; // Indica se o formulário foi submetido
  rowsPerPageOptions = [5, 10, 20]; // Opções de paginação para tabelas

  // Injeta os serviços necessários no construtor
  constructor(private serviceService: ServiceService, private messageService: MessageService) {}

  // Método chamado ao inicializar o componente
  ngOnInit() {
    // Carrega todos os serviços do Firebase
    this.serviceService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  // Abre o diálogo para criar um novo serviço
  openNew() {
    this.service = {}; // Reseta o objeto de serviço
    this.submitted = false;
    this.serviceDialog = true;
  }

  // Exibe o diálogo para exclusão em massa de serviços
  deleteSelectedServices() {
    this.deleteServicesDialog = true;
  }

  // Abre o diálogo para editar um serviço específico
  editService(service: Service) {
    this.service = { ...service }; // Clona o objeto do serviço para edição
    this.serviceDialog = true;
  }

  // Exibe o diálogo para exclusão de um único serviço
  deleteService(service: Service) {
    this.service = { ...service }; // Clona o serviço a ser excluído
    this.deleteServiceDialog = true;
  }

  // Confirma a exclusão de vários serviços
  confirmDeleteSelectedServices() {
    this.deleteServicesDialog = false;
    this.selectedServices.forEach(selectedService => {
      if (selectedService.key) {
        this.serviceService.deleteService(selectedService.key); // Remove o serviço usando o serviço Firebase
      }
    });
    // Mostra uma mensagem de sucesso
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Services Deleted', life: 3000 });
    this.selectedServices = []; // Limpa os serviços selecionados
    // Recarrega a lista de serviços
    this.serviceService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  // Confirma a exclusão de um único serviço
  confirmDeleteService() {
    this.deleteServiceDialog = false;
    if (this.service.key) {
      this.serviceService.deleteService(this.service.key).then(() => {
        // Mostra mensagem de sucesso
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Deleted', life: 3000 });
        // Recarrega a lista de serviços
        this.serviceService.getServices().subscribe(data => {
          this.services = data;
        });
      }).catch(error => {
        // Mostra mensagem de erro em caso de falha
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete service', life: 3000 });
      });
    }
    this.service = {}; // Reseta o serviço atual
  }

  // Esconde o diálogo de criação/edição
  hideDialog() {
    this.serviceDialog = false;
    this.submitted = false;
  }

  // Salva um novo serviço ou atualiza um existente
  saveService() {
    this.submitted = true;

    // Valida os campos obrigatórios
    if (!this.service.nome?.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo Nome é obrigatório.', life: 3000 });
      return;
    }
    if (!this.service.descricao?.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo Descrição é obrigatório.', life: 3000 });
      return;
    }
    if (!this.service.preco || this.service.preco <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo Preço é obrigatório e deve ser maior que zero.', life: 3000 });
      return;
    }
    if (!this.service.duracao || this.service.duracao <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo Duração é obrigatório e deve ser maior que zero.', life: 3000 });
      return;
    }

    // Atualiza ou cria o serviço
    if (this.service.key) {
      this.serviceService.updateService(this.service.key, this.service).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Updated', life: 3000 });
        this.serviceService.getServices().subscribe(data => {
          this.services = data; // Atualiza a lista de serviços
        });
      }).catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update service', life: 3000 });
      });
    } else {
      this.serviceService.createService(this.service).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Created', life: 3000 });
        this.serviceService.getServices().subscribe(data => {
          this.services = data; // Atualiza a lista de serviços
        });
      }).catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create service', life: 3000 });
      });
    }

    this.serviceDialog = false; // Fecha o diálogo
    this.service = {}; // Reseta o serviço atual
  }
}
