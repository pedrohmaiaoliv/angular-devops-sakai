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
      this.services = data; // Atualizar a lista de serviços após a exclusão
    });
  }

  confirmDeleteService() {
    this.deleteServiceDialog = false;
    if (this.service.key) {
      this.serviceService.deleteService(this.service.key).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Deleted', life: 3000 });
        this.serviceService.getServices().subscribe(data => {
          this.services = data; // Atualizar a lista de serviços após a exclusão
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
    if (this.service.nome?.trim()) {
      if (this.service.key) {
        this.serviceService.updateService(this.service.key, this.service).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Updated', life: 3000 });
          this.serviceService.getServices().subscribe(data => {
            this.services = data; // Atualizar a lista de serviços após a atualização
          });
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update service', life: 3000 });
        });
      } else {
        this.serviceService.createService(this.service).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Created', life: 3000 });
          this.serviceService.getServices().subscribe(data => {
            this.services = data; // Atualizar a lista de serviços após a criação
          });
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create service', life: 3000 });
        });
      }
      this.serviceDialog = false;
      this.service = {};
    }
  }
}
