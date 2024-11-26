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
    
                        const uf = data.uf;
                        this.tutor.estado = uf;
                        this.selectedEstado = this.estados.find(estado => estado.sigla === uf)?.id || '';
    
                        if (this.selectedEstado) {
                            this.loadMunicipios(this.selectedEstado, data.localidade);
                        }
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

    loadMunicipios(estadoId: string, cidadeNome: string) {
        this.locationService.getMunicipios(estadoId).subscribe((data) => {
            this.municipios = data;
    
            const municipioEncontrado = this.municipios.find(municipio => municipio.nome.toLowerCase() === cidadeNome.toLowerCase());
            if (municipioEncontrado) {
                this.selectedMunicipio = municipioEncontrado.id;
                this.tutor.cidade = municipioEncontrado.nome;
            }
        });
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
        
        if (this.tutor.cep) {
            this.onCepBlur();
        } else {
            if (this.tutor.estado) {
                this.selectedEstado = this.estados.find(estado => estado.sigla === this.tutor.estado)?.id || '';
                if (this.selectedEstado) {
                    this.loadMunicipios(this.selectedEstado, this.tutor.cidade);
                }
            }
        }
    
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

        // Validação dos campos obrigatórios
        if (!this.tutor.nome || !this.tutor.telefone || !this.tutor.cpf || !this.tutor.sexo || !this.tutor.cep || !this.selectedEstado || !this.selectedMunicipio) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios.', life: 3000 });
            return;
        }

        if (this.tutor.key) {
            // Atualiza tutor existente
            this.tutorService.updateTutor(this.tutor.key, this.tutor);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Updated', life: 3000 });
        } else {
            // Cria novo tutor
            this.tutorService.createTutor(this.tutor);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Created', life: 3000 });
        }
        
        this.tutorDialog = false;
        this.tutor = {};
        this.submitted = false;
    }
}