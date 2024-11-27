import { Component, OnInit } from '@angular/core'; // Necessário para criar um componente Angular
import { Tutor } from '../../../api/tutors.models'; // Modelo que define a estrutura de um tutor
import { MessageService } from 'primeng/api'; // Serviço para exibir mensagens de notificação
import { TutorService } from '../../../service/tutors.service'; // Serviço para gerenciar tutores no banco de dados
import { LocationService } from '../../../service/location.service'; // Serviço para consultar estados, municípios e CEP

@Component({
    templateUrl: './tutors.component.html', // Template HTML associado ao componente
    providers: [MessageService] // Fornece o MessageService localmente para este componente
})
export class TutorsComponent implements OnInit {
    tutorDialog: boolean = false; // Controla a exibição do diálogo de criação/edição de tutor
    deleteTutorDialog: boolean = false; // Controla a exibição do diálogo de exclusão de um tutor
    deleteTutorsDialog: boolean = false; // Controla a exibição do diálogo de exclusão em massa

    tutors: Tutor[] = []; // Lista de tutores carregados
    tutor: Tutor = {}; // Objeto do tutor atualmente em edição/criação
    selectedTutors: Tutor[] = []; // Lista de tutores selecionados para exclusão em massa
    submitted: boolean = false; // Indica se o formulário foi submetido
    rowsPerPageOptions = [5, 10, 20]; // Opções para quantidade de linhas por página em tabelas

    estados: any[] = []; // Lista de estados carregados
    municipios: any[] = []; // Lista de municípios carregados
    selectedEstado: string = ''; // Estado selecionado
    selectedMunicipio: string = ''; // Município selecionado
    cep: string = ''; // CEP para consulta de endereço
    endereco: any = { // Objeto para armazenar o endereço retornado pelo CEP
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: ''
    };

    constructor(
        private tutorService: TutorService, // Serviço para gerenciar tutores
        private messageService: MessageService, // Serviço para exibir mensagens de notificação
        private locationService: LocationService // Serviço para manipular dados de localização (estados, municípios, CEP)
    ) {}

    ngOnInit() {
        // Inicializa o componente carregando tutores e estados
        this.tutorService.getTutors().subscribe(data => this.tutors = data);
        this.loadEstados();
    }

    loadEstados() {
        // Carrega a lista de estados através do LocationService
        this.locationService.getEstados().subscribe((data) => {
            this.estados = data;
        });
    }

    onEstadoChange(estadoId: string) {
        // Carrega os municípios com base no estado selecionado
        this.locationService.getMunicipios(estadoId).subscribe((data) => {
            this.municipios = data;
            this.selectedMunicipio = ''; // Reseta o município ao mudar o estado
        });
    }

    onCepBlur() {
        // Consulta o endereço pelo CEP ao perder o foco no campo
        const cepSemMascara = this.tutor.cep.replace('-', '');
    
        if (cepSemMascara && cepSemMascara.length === 8) {
            this.locationService.getEnderecoByCep(cepSemMascara).subscribe(
                (data) => {
                    if (!data.erro) {
                        // Preenche os campos do tutor com os dados retornados
                        this.tutor.rua = data.logradouro;
                        this.tutor.bairro = data.bairro;
                        this.tutor.estado = data.uf;
                        this.selectedEstado = this.estados.find(estado => estado.sigla === data.uf)?.id || '';
                        if (this.selectedEstado) {
                            this.loadMunicipios(this.selectedEstado, data.localidade);
                        }
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'CEP não encontrado', life: 3000 });
                    }
                },
                () => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao consultar o CEP', life: 3000 });
                }
            );
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'CEP inválido', life: 3000 });
        }
    }

    loadMunicipios(estadoId: string, cidadeNome: string) {
        // Carrega municípios e tenta selecionar o município retornado pelo CEP
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
        // Abre o diálogo para criar um novo tutor
        this.tutor = {};
        this.submitted = false;
        this.tutorDialog = true;
    }

    deleteSelectedTutors() {
        // Abre o diálogo para confirmar exclusão em massa
        this.deleteTutorsDialog = true;
    }

    editTutor(tutor: Tutor) {
        // Abre o diálogo para editar um tutor existente
        this.tutor = { ...tutor };
        if (this.tutor.cep) {
            this.onCepBlur();
        } else if (this.tutor.estado) {
            this.selectedEstado = this.estados.find(estado => estado.sigla === this.tutor.estado)?.id || '';
            if (this.selectedEstado) {
                this.loadMunicipios(this.selectedEstado, this.tutor.cidade);
            }
        }
        this.tutorDialog = true;
    }

    deleteTutor(tutor: Tutor) {
        // Abre o diálogo para confirmar exclusão de um tutor
        this.deleteTutorDialog = true;
        this.tutor = { ...tutor };
    
        // Verifica e exibe a chave do tutor
        if (tutor.key) {
            console.log(`Chave do tutor para exclusão: ${tutor.key}`);
        } else {
            console.log("Erro: A chave do tutor não está definida.");
        }
    }

    confirmDeleteSelected() {
        // Confirma exclusão em massa de tutores
        this.deleteTutorsDialog = false;
        this.selectedTutors.forEach(selectedTutor => {
            if (selectedTutor.key) {
                this.tutorService.deleteTutor(selectedTutor.key);
            }
        });
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutores excluídos.', life: 3000 });
        this.selectedTutors = [];
    }

    confirmDelete() {
        // Confirma exclusão de um tutor
        this.deleteTutorDialog = false;
        if (this.tutor.key) {
            this.tutorService.deleteTutor(this.tutor.key);
            console.log(`Tutor com chave ${this.tutor.key} foi excluído.`); // Adicionado para verificar a exclusão
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor excluído.', life: 3000 });
        } else {
            console.log('Nenhuma chave de tutor encontrada para exclusão.'); // Adicionado para verificar casos sem chave
        }
        this.tutor = {};
    }
    

    hideDialog() {
        // Fecha o diálogo de criação/edição
        this.tutorDialog = false;
        this.submitted = false;
    }

    saveTutor() {
        // Salva ou atualiza um tutor
        this.submitted = true;

        if (!this.tutor.nome || !this.tutor.telefone || !this.tutor.cpf || !this.tutor.sexo || !this.tutor.cep || !this.selectedEstado || !this.selectedMunicipio) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios.', life: 3000 });
            return;
        }

        if (this.tutor.key) {
            this.tutorService.updateTutor(this.tutor.key, this.tutor);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor atualizado.', life: 3000 });
        } else {
            this.tutorService.createTutor(this.tutor);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor criado.', life: 3000 });
        }

        this.tutorDialog = false;
        this.tutor = {};
        this.submitted = false;
    }
}
