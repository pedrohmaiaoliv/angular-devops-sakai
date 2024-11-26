import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../../api/tutors.models';
import { MessageService } from 'primeng/api';
import { TutorService } from '../../../service/tutors.service';
import { LocationService } from '../../../service/location.service';

@Component({
    templateUrl: './tutors.component.html',
    providers: [MessageService],
})
export class TutorsComponent implements OnInit {
    tutorDialog = false;
    deleteTutorDialog = false;
    deleteTutorsDialog = false;

    tutors: Tutor[] = [];
    tutor: Tutor = {};
    selectedTutors: Tutor[] = [];
    submitted = false;

    rowsPerPageOptions = [5, 10, 20];
    estados: any[] = [];
    municipios: any[] = [];
    selectedEstado = '';
    selectedMunicipio = '';
    cep = '';

    constructor(
        private tutorService: TutorService,
        private messageService: MessageService,
        private locationService: LocationService
    ) {}

    ngOnInit() {
        this.loadTutors();
        this.loadEstados();
    }

    private loadTutors() {
        this.tutorService.getTutors().subscribe((data) => {
            this.tutors = data;
        });
    }

    private loadEstados() {
        this.locationService.getEstados().subscribe((data) => {
            this.estados = data;
        });
    }

    private loadMunicipios(estadoId: string, cidadeNome?: string) {
        this.locationService.getMunicipios(estadoId).subscribe((data) => {
            this.municipios = data;
            if (cidadeNome) {
                const municipioEncontrado = this.municipios.find(
                    (municipio) => municipio.nome.toLowerCase() === cidadeNome.toLowerCase()
                );
                if (municipioEncontrado) {
                    this.selectedMunicipio = municipioEncontrado.id;
                    this.tutor.cidade = municipioEncontrado.nome;
                }
            }
        });
    }

    openNew() {
        this.tutor = {};
        this.submitted = false;
        this.tutorDialog = true;
    }

    editTutor(tutor: Tutor) {
        this.tutor = { ...tutor };
        if (this.tutor.cep) {
            this.onCepBlur();
        } else if (this.tutor.estado) {
            this.selectedEstado = this.estados.find((estado) => estado.sigla === this.tutor.estado)?.id || '';
            if (this.selectedEstado) {
                this.loadMunicipios(this.selectedEstado, this.tutor.cidade);
            }
        }
        this.tutorDialog = true;
    }

    deleteTutor(tutor: Tutor) {
        this.tutor = { ...tutor };
        this.deleteTutorDialog = true;
    }

    deleteSelectedTutors() {
        this.deleteTutorsDialog = true;
    }

    confirmDelete() {
        this.deleteTutorDialog = false;
        if (this.tutor.key) {
            this.tutorService.deleteTutor(this.tutor.key).then(() => {
                this.tutors = this.tutors.filter((t) => t.key !== this.tutor.key);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Tutor apagado com sucesso',
                    life: 3000,
                });
            }).catch((error) => {
                this.handleError('Erro ao apagar tutor.', error);
            });
        }
        this.tutor = {};
    }

    confirmDeleteSelected() {
        this.deleteTutorsDialog = false;

        const promises = this.selectedTutors.map((tutor) => this.tutorService.deleteTutor(tutor.key || ''));

        Promise.all(promises)
            .then(() => {
                this.tutors = this.tutors.filter((tutor) => !this.selectedTutors.includes(tutor));
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Tutores apagados com sucesso',
                    life: 3000,
                });
                this.selectedTutors = [];
            })
            .catch((error) => {
                this.handleError('Erro ao apagar tutores.', error);
            });
    }

    saveTutor() {
        this.submitted = true;

        if (!this.isFormValid()) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha todos os campos obrigatórios.',
                life: 3000,
            });
            return;
        }

        if (this.tutor.key) {
            this.updateTutor();
        } else {
            this.createTutor();
        }

        this.tutorDialog = false;
        this.tutor = {};
        this.submitted = false;
    }

    private updateTutor() {
        this.tutorService.updateTutor(this.tutor.key || '', this.tutor).then(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Tutor atualizado com sucesso.',
                life: 3000,
            });
        }).catch((error) => {
            this.handleError('Erro ao atualizar tutor.', error);
        });
    }

    private createTutor() {
        this.tutorService.createTutor(this.tutor).then(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Tutor criado com sucesso.',
                life: 3000,
            });
        }).catch((error) => {
            this.handleError('Erro ao criar tutor.', error);
        });
    }

    private isFormValid(): boolean {
        return !!(
            this.tutor.nome &&
            this.tutor.telefone &&
            this.tutor.cpf &&
            this.tutor.sexo &&
            this.tutor.cep &&
            this.selectedEstado &&
            this.selectedMunicipio
        );
    }

    private handleError(message: string, error: any) {
        console.error(message, error);
        this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: message,
            life: 3000,
        });
    }

    onCepBlur() {
        const cep = this.tutor.cep?.replace('-', '') || '';
        if (cep.length !== 8) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'CEP inválido.',
                life: 3000,
            });
            return;
        }

        this.locationService.getEnderecoByCep(cep).subscribe(
            (data) => {
                if (!data.erro) {
                    this.tutor.rua = data.logradouro;
                    this.tutor.bairro = data.bairro;
                    this.selectedEstado = this.estados.find((e) => e.sigla === data.uf)?.id || '';
                    this.tutor.estado = data.uf;

                    if (this.selectedEstado) {
                        this.loadMunicipios(this.selectedEstado, data.localidade);
                    }
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'CEP não encontrado.',
                        life: 3000,
                    });
                }
            },
            (error) => {
                this.handleError('Erro ao consultar CEP.', error);
            }
        );
    }

    hideDialog() {
        this.tutorDialog = false;
        this.submitted = false;
    }
}
