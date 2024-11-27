import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importação do AngularFireDatabase para interagir com o Firebase Realtime Database
import { Observable } from 'rxjs'; // Para lidar com observáveis (dados reativos)
import { map } from 'rxjs/operators'; // Operador para transformar os dados retornados
import { Service } from '../api/service.model'; // Modelo/interface do serviço para tipagem

@Injectable({
  providedIn: 'root' // Torna o serviço acessível em toda a aplicação sem precisar declará-lo manualmente em um módulo
})
export class ServiceService {
  private basePath = '/services'; // Caminho base no Realtime Database onde os serviços serão armazenados

  constructor(private db: AngularFireDatabase) {} // Injeta o AngularFireDatabase para interagir com o Firebase

  // Método para criar um novo serviço no Firebase
  createService(service: Service) {
    return this.db.list<Service>(this.basePath).push(service); // Adiciona o serviço ao caminho definido em basePath
  }

  // Método para obter todos os serviços, incluindo suas chaves únicas
  getServices(): Observable<Service[]> {
    return this.db.list<Service>(this.basePath).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Service })) // Adiciona a chave ao objeto retornado
      )
    );
  }

  // Método alternativo para obter todos os serviços (funcionalidade similar ao método acima)
  getAllServices(): Observable<Service[]> {
    return this.db.list<Service>(this.basePath).snapshotChanges().pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Service))) // Combina chave e valor no formato Service
    );
  }

  // Método para atualizar um serviço específico
  updateService(key: string, service: Service) {
    return this.db.object<Service>(`${this.basePath}/${key}`).update(service); // Atualiza o serviço com base na chave fornecida
  }

  // Método para deletar um serviço específico
  deleteService(key: string) {
    return this.db.object<Service>(`${this.basePath}/${key}`).remove(); // Remove o serviço com base na chave fornecida
  }
}
