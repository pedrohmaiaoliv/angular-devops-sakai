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

    value = 0;

    pets: Pet[] = [];
    pet: Pet = {};
    selectedPets: Pet[] = [];
    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    // Adicione a configuração de idioma aqui
    ptBr: any;

    constructor(private petService: PetService, private messageService: MessageService) {
        // Inicialize a configuração de idioma
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
            dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
            dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
            monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            today: 'Hoje',
            clear: 'Limpar'
        };
    }

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
        console.log('Data antes de editar:', pet.dataNascimento);
    
        this.pet = { ...pet };
    
        // Converte para Date e ajusta o fuso horário, se necessário
        if (typeof this.pet.dataNascimento === 'string') {
            const date = new Date(this.pet.dataNascimento);
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Ajusta o fuso horário
            this.pet.dataNascimento = date;
        }
    
        console.log('Data após conversão:', this.pet.dataNascimento);
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
    
        // Validações
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
    
        // Converte dataNascimento para string no formato ISO antes de salvar
        const petToSave = { ...this.pet };
        if (petToSave.dataNascimento instanceof Date) {
            petToSave.dataNascimento = petToSave.dataNascimento.toISOString().split('T')[0];
        }
    
        // Salvar o pet (criação ou atualização)
        if (petToSave.key) {
            // Atualiza pet existente
            this.petService.updatePet(petToSave.key, petToSave).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Updated', life: 3000 });
            });
        } else {
            // Cria novo pet
            this.petService.createPet(petToSave);
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
