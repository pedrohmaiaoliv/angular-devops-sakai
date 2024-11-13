import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../../api/tutors.models';
import { MessageService } from 'primeng/api';
import { TutorService } from '../../../service/tutors.service';
import { LocationService } from '../../../service/location.service';

@Component({
    templateUrl: './tutors.component.html',
    providers: [MessageService]
})
export class TutorsComponent implements OnInit {
    tutorDialog: boolean = false;
    deleteTutorDialog: boolean = false;
    deleteTutorsDialog: boolean = false;

    tutors: Tutor[] = [];
    tutor: Tutor = {};
    selectedTutors: Tutor[] = [];
    submitted: boolean = false;
    rowsPerPageOptions = [5, 10, 20];

    estados: any[] = [];
    municipios: any[] = [];
    selectedEstado: string = '';
    selectedMunicipio: string = '';
    cep: string = '';
    endereco: any = {
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: ''
    };

    constructor(
        private tutorService: TutorService,
        private messageService: MessageService,
        private locationService: LocationService
    ) {}

    ngOnInit() {
        this.tutorService.getTutors().subscribe(data => this.tutors = data);
        this.loadEstados();  // Carrega os estados ao iniciar o componente
    }

    loadEstados() {
        this.locationService.getEstados().subscribe((data) => {
            this.estados = data;
        });
    }

    onEstadoChange(estadoId: string) {
        this.locationService.getMunicipios(estadoId).subscribe((data) => {
            this.municipios = data;
            this.selectedMunicipio = ''; // Limpa o município selecionado quando o estado muda
        });
    }

    onCepBlur() {
        const cepSemMascara = this.tutor.cep.replace('-', '');
    
        if (cepSemMascara && cepSemMascara.length === 8) {
            this.locationService.getEnderecoByCep(cepSemMascara).subscribe(
                (data) => {
                    if (!data.erro) {
                        this.tutor.rua = data.logradouro;
                        this.tutor.bairro = data.bairro;
                        // Remova o preenchimento de cidade, pois o município é selecionado manualmente
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'CEP não encontrado', life: 3000 });
                    }
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao consultar o CEP', life: 3000 });
                }
            );
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'CEP inválido', life: 3000 });
        }
    }
    

    openNew() {
        this.tutor = {};
        this.submitted = false;
        this.tutorDialog = true;
    }

    deleteSelectedTutors() {
        this.deleteTutorsDialog = true;
    }

    editTutor(tutor: Tutor) {
        this.tutor = { ...tutor };
        this.tutorDialog = true;
    }

    deleteTutor(tutor: Tutor) {
        this.deleteTutorDialog = true;
        this.tutor = { ...tutor };
    }

    confirmDeleteSelected() {
        this.deleteTutorsDialog = false;
        this.selectedTutors.forEach(selectedTutor => {
            if (selectedTutor.key) {
                this.tutorService.deleteTutor(selectedTutor.key);
            }
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutors Deleted', life: 3000 });
        this.selectedTutors = [];
    }

    confirmDelete() {
        this.deleteTutorDialog = false;
        if (this.tutor.key) {
            this.tutorService.deleteTutor(this.tutor.key);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Deleted', life: 3000 });
        }
        this.tutor = {};
    }

    hideDialog() {
        this.tutorDialog = false;
        this.submitted = false;
    }

    saveTutor() {
        this.submitted = true;

        if (this.tutor.nome?.trim()) {
            if (this.tutor.key) {
                this.tutorService.updateTutor(this.tutor.key, this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Updated', life: 3000 });
            } else {
                this.tutorService.createTutor(this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Created', life: 3000 });
            }
            this.tutorDialog = false;
            this.tutor = {};
        }
    }
}
