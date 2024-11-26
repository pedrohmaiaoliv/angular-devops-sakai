import { Component, OnInit } from '@angular/core';
import { Service } from '../../../api/service.model';
import { MessageService } from 'primeng/api';
import { ServiceService } from '../../../service/service.service';

@Component({
  templateUrl: './service.component.html',
  providers: [MessageService]
})
export class ServicesComponent implements OnInit {
  serviceDialog: boolean = false;
  deleteServiceDialog: boolean = false;
  deleteServicesDialog: boolean = false;

  services: Service[] = [];
  service: Service = {};
  selectedServices: Service[] = [];
  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];

  constructor(private serviceService: ServiceService, private messageService: MessageService) {}

  ngOnInit() {
    this.serviceService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  openNew() {
    this.service = {};
    this.submitted = false;
    this.serviceDialog = true;
  }

  deleteSelectedServices() {
    this.deleteServicesDialog = true;
  }

  editService(service: Service) {
    this.service = { ...service };
    this.serviceDialog = true;
  }

  deleteService(service: Service) {
    this.service = { ...service };
    this.deleteServiceDialog = true;
  }

  confirmDeleteSelectedServices() {
    this.deleteServicesDialog = false;
    this.selectedServices.forEach(selectedService => {
      if (selectedService.key) {
        this.serviceService.deleteService(selectedService.key);
      }
    });
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Services Deleted', life: 3000 });
    this.selectedServices = [];
    this.serviceService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  confirmDeleteService() {
    this.deleteServiceDialog = false;
    if (this.service.key) {
      this.serviceService.deleteService(this.service.key).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Deleted', life: 3000 });
        this.serviceService.getServices().subscribe(data => {
          this.services = data;
        });
      }).catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete service', life: 3000 });
      });
    }
    this.service = {};
  }

  hideDialog() {
    this.serviceDialog = false;
    this.submitted = false;
  }

  saveService() {
    this.submitted = true;

    // Validação dos campos obrigatórios
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

    if (this.service.key) {
      this.serviceService.updateService(this.service.key, this.service).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Updated', life: 3000 });
        this.serviceService.getServices().subscribe(data => {
          this.services = data;
        });
      }).catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update service', life: 3000 });
      });
    } else {
      this.serviceService.createService(this.service).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Created', life: 3000 });
        this.serviceService.getServices().subscribe(data => {
          this.services = data;
        });
      }).catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create service', life: 3000 });
      });
    }

    this.serviceDialog = false;
    this.service = {};
  }
}
