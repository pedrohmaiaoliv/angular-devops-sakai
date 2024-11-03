import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../../demo/api/pet.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PetService } from '../../../../demo/service/pet.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {
    petDialog: boolean = false;
    deletePetDialog: boolean = false;
    deletePetsDialog: boolean = false;

    pets: Pet[] = [];
    pet: Pet = {};
    selectedPets: Pet[] = [];
    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private petService: PetService, private messageService: MessageService) { }

    ngOnInit() {
        // Carregar todos os pets
        this.petService.getPets().subscribe(data => this.pets = data);
    }

    openNew() {
        this.pet = {};
        this.submitted = false;
        this.petDialog = true;
    }

    deleteSelectedPets() {
        this.deletePetsDialog = true;
    }

    editPet(pet: Pet) {
        this.pet = { ...pet };
        this.petDialog = true;
    }

    deletePet(pet: Pet) {
        this.deletePetDialog = true;
        this.pet = { ...pet };
    }

    confirmDeleteSelected() {
        this.deletePetsDialog = false;
        this.selectedPets.forEach(selectedPet => {
            if (selectedPet.key) {
                this.petService.deletePet(selectedPet.key);
            }
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pets Deleted', life: 3000 });
        this.selectedPets = [];
    }

    confirmDelete() {
        this.deletePetDialog = false;
        if (this.pet.key) {
            this.petService.deletePet(this.pet.key);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Deleted', life: 3000 });
        }
        this.pet = {};
    }

    hideDialog() {
        this.petDialog = false;
        this.submitted = false;
    }

    savePet() {
        this.submitted = true;
        if (this.pet.nome?.trim()) {
            if (this.pet.key) {
                // Atualiza pet existente
                this.petService.updatePet(this.pet.key, this.pet).then(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Updated', life: 3000 });
                });
            } else {
                // Cria novo pet
                this.petService.createPet(this.pet);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Created', life: 3000 });
            }
            this.petDialog = false;
            this.pet = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // Função para permitir apenas letras nos campos de texto específicos
    allowLettersOnly(event: KeyboardEvent) {
        const charCode = event.key.charCodeAt(0);
        if (!/[a-zA-ZÀ-ÿ\s]/.test(String.fromCharCode(charCode))) {
            event.preventDefault();
        }
    }
}
