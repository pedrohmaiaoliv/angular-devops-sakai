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
    
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!this.pet.nome?.trim()) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Nome não preenchido.', life: 3000 });
            return;
        }
        if (!this.pet.especie) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Espécie não preenchido.', life: 3000 });
            return;
        }
        if (!this.pet.idade || this.pet.idade <= 0) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Idade não preenchido ou inválido.', life: 3000 });
            return;
        }
        if (!this.pet.dataNascimento) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Data de Nascimento não preenchido.', life: 3000 });
            return;
        }
        if (!this.pet.peso || this.pet.peso <= 0) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Peso não preenchido ou inválido.', life: 3000 });
            return;
        }
        if (!this.pet.sexo) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Sexo não preenchido.', life: 3000 });
            return;
        }
        if (!this.pet.cor?.trim()) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Cor não preenchido.', life: 3000 });
            return;
        }
    
        // Se todas as validações passarem, continua com a criação ou atualização do pet
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
    
        // Fecha o diálogo e redefine o objeto pet e submitted
        this.petDialog = false;
        this.pet = {};
        this.submitted = false;
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
