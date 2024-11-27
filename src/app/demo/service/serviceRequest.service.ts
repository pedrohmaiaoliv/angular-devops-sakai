import { Injectable } from '@angular/core'; // Decorador para criar um serviço Angular
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Biblioteca para manipular o Firebase Realtime Database
import { Observable } from 'rxjs'; // Utilizado para trabalhar com dados assíncronos
import { map } from 'rxjs/operators'; // Operador para transformar os dados recebidos
import { ServiceRequest } from '../api/serviceRequest.model'; // Modelo para tipar as solicitações de serviço

@Injectable({
    providedIn: 'root' // Declara que este serviço estará disponível em toda a aplicação
})
export class ServiceRequestService {
    private basePath = 'serviceRequests'; // Caminho base no Firebase para as solicitações de serviço

    constructor(private db: AngularFireDatabase) { } // Injeta o AngularFireDatabase para manipular o banco de dados

    // Método para criar uma nova solicitação de serviço
    createServiceRequest(serviceRequest: ServiceRequest): void {
        const requestToSave = { ...serviceRequest }; // Clona o objeto para evitar alterações indesejadas
        // Converte a data para o formato yyyy-MM-dd, se for um objeto Date
        if (requestToSave.date instanceof Date) {
            requestToSave.date = requestToSave.date.toISOString().split('T')[0];
        }
        this.db.list<ServiceRequest>(this.basePath).push(requestToSave); // Salva a solicitação no Firebase
    }

    // Método para obter todas as solicitações de serviço
    getServiceRequests(): Observable<ServiceRequest[]> {
        return this.db.list<ServiceRequest>(this.basePath).snapshotChanges().pipe(
            map(changes =>
                // Mapeia as alterações retornadas pelo Firebase, incluindo a chave
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as ServiceRequest))
            )
        );
    }

    // Método para obter uma solicitação específica pelo ID
    getServiceRequestId(key: string): Observable<ServiceRequest> {
        return this.db.object<ServiceRequest>(`${this.basePath}/${key}`).valueChanges(); 
        // Retorna um observable que reflete atualizações em tempo real da solicitação
    }

    // Método para atualizar uma solicitação existente
    updateServiceRequest(key: string, serviceRequest: ServiceRequest): Promise<void> {
        const requestToUpdate = { ...serviceRequest }; // Clona o objeto para evitar alterações no original
        // Converte a data para o formato yyyy-MM-dd, se for um objeto Date
        if (requestToUpdate.date instanceof Date) {
            requestToUpdate.date = requestToUpdate.date.toISOString().split('T')[0];
        }
        return this.db.object<ServiceRequest>(`${this.basePath}/${key}`).update(requestToUpdate); 
        // Atualiza a solicitação no Firebase
    }

    // Método para excluir uma solicitação de serviço
    deleteServiceRequest(key: string): Promise<void> {
        return this.db.object<ServiceRequest>(`${this.basePath}/${key}`).remove()
            .then(() => {
                // Solicitação excluída com sucesso
            })
            .catch(error => {
                // Lança um erro em caso de falha
                throw error;
            });
    }
}
