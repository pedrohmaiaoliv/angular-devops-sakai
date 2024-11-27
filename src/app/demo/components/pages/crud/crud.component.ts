import { Component, OnInit } from '@angular/core'; // Importação para criar o componente Angular
import { Pet } from '../../../../demo/api/pet.model'; // Modelo do pet usado para tipagem
import { MessageService } from 'primeng/api'; // Serviço do PrimeNG para exibir mensagens de notificação
import { Table } from 'primeng/table'; // Componente de tabela do PrimeNG
import { PetService } from '../../../../demo/service/pet.service'; // Serviço responsável pelas operações com pets

@Component({
    templateUrl: './crud.component.html', // HTML associado ao componente
    providers: [MessageService] // Provedor local para o serviço de mensagens
})
export class CrudComponent implements OnInit {
    // Controle de diálogos
    petDialog: boolean = false; // Controla visibilidade do diálogo para criação/edição de pets
    deletePetDialog: boolean = false; // Controla o diálogo para excluir um pet
    deletePetsDialog: boolean = false; // Controla o diálogo para exclusão em massa de pets

    value = 0; // Exemplo de valor numérico (pode ser usado para algum indicador)

    pets: Pet[] = []; // Lista de pets carregados
    pet: Pet = {}; // Pet atualmente em criação/edição
    selectedPets: Pet[] = []; // Lista de pets selecionados para exclusão em massa
    submitted: boolean = false; // Indica se o formulário foi enviado

    rowsPerPageOptions = [5, 10, 20]; // Opções de quantidade de linhas por página na tabela

    // Configuração para idioma em componentes, como calendário
    ptBr: any;

    constructor(private petService: PetService, private messageService: MessageService) {
        // Inicializa as configurações de idioma para elementos como calendário
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

    // Inicializa o componente e carrega os pets do banco
    ngOnInit() {
        this.petService.getPets().subscribe(data => this.pets = data);
    }

    // Abre o diálogo para criar um novo pet
    openNew() {
        this.pet = {}; // Reseta o objeto do pet
        this.submitted = false;
        this.petDialog = true;
    }

    // Exibe o diálogo para exclusão em massa
    deleteSelectedPets() {
        this.deletePetsDialog = true;
    }

    // Abre o diálogo para editar um pet específico
    editPet(pet: Pet) {
        console.log('Data antes de editar:', pet.dataNascimento);
        this.pet = { ...pet }; // Clona o objeto pet para edição

        // Converte `dataNascimento` para Date e ajusta fuso horário, se necessário
        if (typeof this.pet.dataNascimento === 'string') {
            const date = new Date(this.pet.dataNascimento);
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            this.pet.dataNascimento = date;
        }

        console.log('Data após conversão:', this.pet.dataNascimento);
        this.petDialog = true;
    }

    // Exibe o diálogo para confirmar a exclusão de um pet
    deletePet(pet: Pet) {
        this.deletePetDialog = true;
        this.pet = { ...pet }; // Clona o pet selecionado
    }

    // Confirma a exclusão de múltiplos pets
    confirmDeleteSelected() {
        this.deletePetsDialog = false;
        this.selectedPets.forEach(selectedPet => {
            if (selectedPet.key) {
                this.petService.deletePet(selectedPet.key); // Remove cada pet selecionado
            }
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pets Deleted', life: 3000 });
        this.selectedPets = []; // Limpa a lista de seleção
    }

    // Confirma a exclusão de um único pet
    confirmDelete() {
        this.deletePetDialog = false;
        if (this.pet.key) {
            this.petService.deletePet(this.pet.key); // Remove o pet do banco
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Deleted', life: 3000 });
        }
        this.pet = {}; // Reseta o objeto do pet
    }

    // Fecha o diálogo de criação/edição sem salvar
    hideDialog() {
        this.petDialog = false;
        this.submitted = false;
    }

    // Salva o pet (criação ou atualização)
    savePet() {
        this.submitted = true;

        // Validações de campos obrigatórios
        if (!this.pet.nome?.trim()) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Nome não preenchido.', life: 3000 });
            return;
        }
        if (!this.pet.especie) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Campo Espécie não preenchido.', life: 3000 });
            return;
        }
        // Continua para validar idade, dataNascimento, peso, sexo, cor...

        // Converte data para string antes de salvar
        const petToSave = { ...this.pet };
        if (petToSave.dataNascimento instanceof Date) {
            petToSave.dataNascimento = petToSave.dataNascimento.toISOString().split('T')[0];
        }

        // Verifica se é atualização ou criação
        if (petToSave.key) {
            this.petService.updatePet(petToSave.key, petToSave).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Updated', life: 3000 });
            });
        } else {
            this.petService.createPet(petToSave); // Cria um novo pet
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Created', life: 3000 });
        }

        this.petDialog = false; // Fecha o diálogo
        this.pet = {}; // Reseta o pet
    }

    // Filtra globalmente os dados na tabela
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // Permite apenas letras nos campos de texto
    allowLettersOnly(event: KeyboardEvent) {
        const charCode = event.key.charCodeAt(0);
        if (!/[a-zA-ZÀ-ÿ\s]/.test(String.fromCharCode(charCode))) {
            event.preventDefault();
        }
    }
}
